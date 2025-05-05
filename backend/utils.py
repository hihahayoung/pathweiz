import re

def clean_text(text):
    """Remove markdown-like formatting from text."""
    return re.sub(r"[\*\#]", "", text).strip()

def map_form_data(data, user_id):
    """Map form data from camelCase to snake_case."""
    return {
        "user_id": user_id,
        "college_year": data.get("collegeYear"),
        "field_of_study": data.get("fieldOfStudy"),
        "favorite_course": data.get("favoriteCourse"),
        "surprising_course": data.get("surprisingCourse"),
        "top_hobbies": data.get("topHobbies"),
        "jobs_internships": data.get("jobsInternships"),
        "liked_aspects": data.get("likedAspects"),
        "disliked_aspects": data.get("dislikedAspects"),
        "career_priorities": data.get("careerPriorities"),
        "work_environment": data.get("idealWorkEnvironment"),
        "industries_of_interest": data.get("industriesOfInterest"),
        "unconventional_aspect": data.get("unconventionalAspect"),
        "admired_person": data.get("admiredPerson"),
        "admired_friends": data.get("admiredFriends"),
        "preferred_locations": data.get("preferredLocations"),
        "final_thoughts": data.get("finalThoughts"),
    }