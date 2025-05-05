from flask_supabase import Supabase

class DatabaseService:
    """
    DatabaseService class to interact with the Supabase client for performing CRUD operations
    related to quiz responses, job recommendations, milestones, and learning sources.
    """
    def __init__(self, supabase_client):
        """
        Initialize the DatabaseService with a Supabase client.
        
        :param supabase_client: An instance of the Supabase client.
        """
        self.client = supabase_client

    def save_quiz_responses(self, mapped_data):
        """
        Save or update quiz responses for a user.
        
        :param mapped_data: A dictionary containing the quiz responses to be saved.
        :return: The saved or updated quiz responses.
        :raises Exception: If the upsert operation fails.
        """
        response = self.client.from_("quiz_responses") \
            .upsert(mapped_data, on_conflict=["user_id"]) \
            .execute()
        if not response.data:
            raise Exception(f"Failed to upsert quiz responses: {response}")
        return response.data

    def get_user_quiz_responses(self, user_id):
        """
        Fetch quiz responses for a specific user.
        
        :param user_id: The ID of the user whose quiz responses are to be fetched.
        :return: The quiz responses of the user.
        :raises Exception: If the fetch operation fails.
        """
        response = self.client.from_("quiz_responses") \
            .select("*") \
            .eq("user_id", user_id) \
            .single() \
            .execute()
        if not response.data:
            raise Exception(f"Failed to fetch quiz responses: {response}")
        return response.data

    def save_recommendation(self, rec_data):
        """
        Save a job recommendation and return its ID.
        
        :param rec_data: A dictionary containing the recommendation data to be saved.
        :return: The ID of the saved recommendation.
        :raises Exception: If the insert operation fails.
        """
        response = self.client.from_("job_recommendations").insert(rec_data).execute()
        if not response.data:
            raise Exception(f"Failed to insert recommendation: {response}")
        return response.data[0]["id"]

    def save_milestone(self, milestone_data):
        """
        Save a milestone for a recommendation.
        
        :param milestone_data: A dictionary containing the milestone data to be saved.
        :return: The saved milestone data.
        :raises Exception: If the insert operation fails.
        """
        response = self.client.from_("milestones").insert(milestone_data).execute()
        if not response.data:
            raise Exception(f"Failed to insert milestone: {response}")
        return response.data

    def save_source(self, source_data):
        """
        Save a learning source for a recommendation.
        
        :param source_data: A dictionary containing the source data to be saved.
        :return: The saved source data.
        :raises Exception: If the insert operation fails.
        """
        response = self.client.from_("sources").insert(source_data).execute()
        if not response.data:
            raise Exception(f"Failed to insert source")
        return response.data

    def get_recommendations(self, user_id, limit=3):
        """
        Fetch the most recent recommendations for a user.
        
        :param user_id: The ID of the user whose recommendations are to be fetched.
        :param limit: The maximum number of recommendations to fetch.
        :return: A list of the most recent recommendations for the user.
        """
        response = self.client.from_("job_recommendations") \
            .select("*") \
            .eq("user_id", user_id) \
            .order("created_at", desc=True) \
            .limit(limit) \
            .execute()
        return response.data