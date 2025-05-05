# app.py
from flask import Flask, request, jsonify, send_from_directory
import google.generativeai as genai
from flask_supabase import Supabase
from flask_cors import CORS
import jwt
import os
from dotenv import load_dotenv
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from datetime import datetime

from services.database import DatabaseService
from services.ai_service import AIService
from utils import clean_text, map_form_data

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__, static_folder='frontend/dist', static_url_path='')

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

# Configure Limiter
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["200 per day", "50 per hour"],
    storage_uri="memory://",
)

# Enable CORS for specified origins
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "https://pathweiz.onrender.com"]}}, supports_credentials=True)

# Configure Supabase
app.config['SUPABASE_URL'] = os.getenv("VITE_SUPABASE_URL")
app.config['SUPABASE_KEY'] = os.getenv("VITE_SUPABASE_KEY")
SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")
supabase_extension = Supabase(app)

# Configure Google Gemini API
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

@app.after_request
def add_cors_headers(response):
    """Add necessary CORS headers to all responses."""
    allowed_origins = ["http://localhost:5173", "https://pathweiz.onrender.com"]
    origin = request.headers.get("Origin")
    if origin in allowed_origins:
        response.headers["Access-Control-Allow-Origin"] = origin
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response

def get_user_id_from_token(auth_header):
    """Decode the JWT from the Authorization header and extract the user ID."""
    if not auth_header or not auth_header.startswith("Bearer "):
        raise ValueError("Invalid Authorization header format. Expected 'Bearer <token>'.")

    try:
        token = auth_header.split(" ")[1]
        decoded_token = jwt.decode(
            token,
            SUPABASE_JWT_SECRET,
            algorithms=["HS256"],
            audience="authenticated"
        )
        return decoded_token.get("sub")
    except jwt.ExpiredSignatureError:
        raise ValueError("Token has expired.")
    except jwt.InvalidAudienceError:
        raise ValueError("Invalid audience.")
    except jwt.InvalidTokenError as e:
        raise ValueError(f"Invalid token: {e}")
    except Exception as e:
        raise ValueError(f"Error decoding token: {e}")

@app.route('/submit_form', methods=['POST'])
@limiter.limit("3 per hour")
def submit_form():
    """Handle form submission and generate career recommendations."""
    try:
        # Authenticate user
        auth_header = request.headers.get("Authorization")
        user_id = get_user_id_from_token(auth_header)

        # Initialize services
        db_service = DatabaseService(supabase_extension.client)
        ai_service = AIService()

        # Process form data
        data = request.get_json()
        if not data:
            return jsonify({"error": "No form data provided."}), 400

        mapped_data = map_form_data(data, user_id)

        # Save quiz responses and get updated data
        db_service.save_quiz_responses(mapped_data)
        quiz_data = db_service.get_user_quiz_responses(user_id)

        # Generate and save recommendations
        recommendations = ai_service.generate_recommendations(quiz_data)

        for rec in recommendations[:3]:
            # Save recommendation
            rec_data = {
                "user_id": user_id,
                "job_title": rec["job_title"],
                "short_description": rec.get("short_description", ""),
                "job_description": rec["job_description"],
                "fit_percentage": rec["fit_percentage"],
                "tags": rec["tags"],
                "recommendation_reason": rec["recommendation_reason"],
                "labels": rec["labels"],
            }
            recommendation_id = db_service.save_recommendation(rec_data)

            # Generate and save milestones
            milestones = ai_service.generate_milestones(rec["job_title"], mapped_data["college_year"])
            for milestone in milestones:
                milestone_data = {
                    "recommendation_id": recommendation_id,
                    "title": clean_text(milestone["title"]),
                    "description": clean_text(milestone["description"]),
                }
                db_service.save_milestone(milestone_data)

            # Generate and save sources
            sources = ai_service.generate_sources(rec["job_title"])
            for source in sources:
                source_data = {
                    "recommendation_id": recommendation_id,
                    "icon": source["icon"],
                    "title": clean_text(source["title"]),
                    "description": clean_text(source["description"]),
                    "status": clean_text(source["status"]),
                }
                db_service.save_source(source_data)

        return jsonify({
            "message": "Recommendations, milestones, and sources saved successfully.",
            "recommendations": recommendations[:3]
        }), 200

    except Exception as e:
        return jsonify({"error": f"Error processing request: {str(e)}"}), 500

@app.route('/submit_form', methods=['OPTIONS'])
def handle_options():
    """Handle preflight OPTIONS requests for /submit_form."""
    response = jsonify({"message": "Preflight OK"})
    response.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin", "")
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    return response, 200

@app.route('/get_recommendations', methods=['GET'])
@limiter.limit("5000 per hour") 
def get_recommendations():
    """Fetch career recommendations for a user."""
    try:
        auth_header = request.headers.get("Authorization")
        user_id = get_user_id_from_token(auth_header)
        
        db_service = DatabaseService(supabase_extension.client)
        recommendations = db_service.get_recommendations(user_id)
        
        if not recommendations:
            return jsonify({"message": "No recommendations found for this user."}), 404
            
        return jsonify({"recommendations": recommendations}), 200
        
    except Exception as e:
        return jsonify({"error": f"Error fetching recommendations: {str(e)}"}), 500

@app.errorhandler(429)
def ratelimit_handler(e):
    """Handle rate limit errors."""
    minutes_remaining = 60
    if hasattr(e, 'reset_time'):
        reset_time = datetime.fromtimestamp(e.reset_time)
        minutes_remaining = int((reset_time - datetime.now()).total_seconds() / 60)

    endpoint = request.path
    if endpoint == '/submit_form':
        limit_info = "3 submissions per hour"
    return jsonify({
        "error": "Rate limit exceeded",
        "message": f"You've reached the limit of {limit_info}. Please try again in {minutes_remaining} minutes."
    }), 429
    
@app.route('/explore_recommendations', methods=['GET'])
@limiter.limit("5000 per hour") 
def explore_recommendations():
    """Explore and fetch the latest job recommendations."""
    try:
        limit = int(request.args.get('limit', 10))
        cursor = request.args.get('cursor', None)

        # Query sorted by ID in descending order for the latest recommendations
        query = supabase_extension.client.from_("job_recommendations").select(
            "id, job_title, short_description, job_description, fit_percentage, recommendation_reason, labels, tags, created_at"
        ).order("id", desc=True).limit(limit)

        # Use cursor for pagination
        if cursor:
            query = query.lt("id", cursor)  # Fetch results with IDs less than the cursor

        response = query.execute()

        # Ensure tags are always a string
        for rec in response.data:
            rec['tags'] = rec.get('tags', '')

        # Get new cursor (smallest ID in the current batch)
        new_cursor = response.data[-1]["id"] if response.data else None

        return jsonify({"data": response.data, "cursor": new_cursor}), 200
    except Exception as e:
        return jsonify({"error": f"Error fetching recommendations: {str(e)}"}), 500

@app.route('/get_career_milestones', methods=['GET'])
@limiter.limit("5000 per hour") 
def get_career_milestones():
    """
    Fetch the milestones for a particular career.
    """
    recommendation_id = request.args.get("recommendation_id")
    if not recommendation_id:
        return jsonify({"error": "recommendation_id is required"}), 400
    
    try:
        response = supabase_extension.client.from_("milestones") \
            .select("*") \
            .eq("recommendation_id", recommendation_id) \
            .execute()

        if not response.data:
            return jsonify({f"message": "No milestones were found for career {recommendation_id}"}), 404

        return jsonify({"milestones": response.data}), 200
    except Exception as e:
        return jsonify({"error": f"Error fetching milestones: {str(e)}"}), 500

@app.route('/get_action_items', methods=['GET'])
@limiter.limit("5000 per hour") 
def get_action_items():
    """
    Fetch action items for a specific job recommendation.
    """
    recommendation_id = request.args.get("recommendation_id")
    if not recommendation_id:
        return jsonify({"error": "recommendation_id is required"}), 400

    try:
        response = supabase_extension.client.from_("sources") \
            .select("*") \
            .eq("recommendation_id", recommendation_id) \
            .execute()

        if not response.data:
            return jsonify({"message": "No action items found"}), 404

        return jsonify({"action_items": response.data}), 200
    except Exception as e:
        return jsonify({"error": f"Error fetching action items: {str(e)}"}), 500

@app.route('/<path:path>')
def catch_all(path):
    """Catch-all route to handle frontend SPA routing."""
    try:
        # Attempt to serve the requested file if it exists
        return send_from_directory(app.static_folder, path)
    except:
        # If the file does not exist, serve the frontend's index.html
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)