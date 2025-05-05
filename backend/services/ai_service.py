import google.generativeai as genai
import re
from config import PROMPTS

class AIService:
    """
    AIService class to interact with the generative AI model for generating career recommendations,
    milestones, and learning sources based on provided data.
    """
    def __init__(self, model_name="gemini-1.5-flash"):
        """
        Initialize the AIService with a specified model name.
        
        :param model_name: The name of the generative AI model to use.
        """
        self.model = genai.GenerativeModel(model_name)

    def generate_recommendations(self, quiz_data):
        """
        Generate career recommendations based on quiz data.
        
        :param quiz_data: A dictionary containing quiz data.
        :return: A list of parsed career recommendations.
        """
        prompt = PROMPTS["recommendations"].format(
            quiz_data="\n".join([f"{key}: {value}" for key, value in quiz_data.items() if key != "user_id"])
        )
        response = self.model.generate_content(prompt)
        return self._parse_recommendations(response.text)

    def generate_milestones(self, job_title, college_year):
        """
        Generate milestones for a specific career path.
        
        :param job_title: The job title for which to generate milestones.
        :return: A list of parsed milestones.
        """
        prompt = PROMPTS["milestones"].format(
            job_title=job_title,
            college_year=college_year
        )
        response = self.model.generate_content(prompt)
        return self._parse_milestones(response.text)

    def generate_sources(self, job_title):
        """
        Generate learning sources for a specific career path.
        
        :param job_title: The job title for which to generate learning sources.
        :return: A list of parsed learning sources.
        """
        prompt = PROMPTS["sources"].format(job_title=job_title)
        response = self.model.generate_content(prompt)
        return self._parse_sources(response.text)

    def _parse_recommendations(self, text):
        """
        Parse the AI response for recommendations.
        
        :param text: The raw text response from the AI model.
        :return: A list of parsed recommendations.
        """
        recommendations = []
        current_recommendation = {}
        
        # Split the text into lines and process each line
        lines = text.strip().split('\n')
        
        for line in lines:
            line = line.strip()
            if not line:
                continue

            if "Recommendation" in line:
                if current_recommendation:
                    recommendations.append(current_recommendation)
                current_recommendation = {}
                continue

            # Extract information using regex patterns
            job_title_match = re.search(r"Job Title:\*\*(.*?)\*\*", line) or \
                            re.search(r"1\.\s*\*\*Job Title:\*\*(.*)", line) or \
                            re.search(r"Job Title:(.*)", line)
            
            short_desc_match = re.search(r"Short Description:\*\*(.*?)\*\*", line) or \
                              re.search(r"2\.\s*\*\*Short Description:\*\*(.*)", line) or \
                              re.search(r"Short Description:(.*)", line)
            
            job_desc_match = re.search(r"Full Job Description:\*\*(.*?)\*\*", line) or \
                            re.search(r"3\.\s*\*\*Full Job Description:\*\*(.*)", line) or \
                            re.search(r"Full Job Description:(.*)", line)
            
            rec_reason_match = re.search(r"Why it's recommended:\*\*(.*?)\*\*", line) or \
                              re.search(r"4\.\s*\*\*Why it's recommended:\*\*(.*)", line) or \
                              re.search(r"Why it's recommended:(.*)", line)
            
            fit_match = re.search(r"Fit Percentage:\*\*(.*?)\*\*", line) or \
                       re.search(r"5\.\s*\*\*Fit Percentage:\*\*(.*)", line) or \
                       re.search(r"Fit Percentage:(.*)", line)
            
            tags_match = re.search(r"Tags:\*\*(.*?)\*\*", line) or \
                        re.search(r"6\.\s*\*\*Tags:\*\*(.*)", line) or \
                        re.search(r"Tags:(.*)", line)
            
            labels_match = re.search(r"Labels:\*\*(.*?)\*\*", line) or \
                          re.search(r"7\.\s*\*\*Labels:\*\*(.*)", line) or \
                          re.search(r"Labels:(.*)", line)

            # Update current recommendation with matched content
            if job_title_match:
                current_recommendation["job_title"] = job_title_match.group(1).strip()
            elif short_desc_match:
                current_recommendation["short_description"] = short_desc_match.group(1).strip()
            elif job_desc_match:
                current_recommendation["job_description"] = job_desc_match.group(1).strip()
            elif rec_reason_match:
                current_recommendation["recommendation_reason"] = rec_reason_match.group(1).strip()
            elif fit_match:
                current_recommendation["fit_percentage"] = fit_match.group(1).strip()
            elif tags_match:
                current_recommendation["tags"] = tags_match.group(1).strip()
            elif labels_match:
                current_recommendation["labels"] = [label.strip() for label in labels_match.group(1).split(",")]

        # Add the last recommendation if it exists
        if current_recommendation:
            recommendations.append(current_recommendation)

        return recommendations

    def _parse_milestones(self, text):
        """
        Parse the AI response for milestones.
        
        :param text: The raw text response from the AI model.
        :return: A list of parsed milestones.
        """
        milestones = []
        lines = text.strip().split('\n')
        current_milestone = {}

        for line in lines:
            line = line.strip()
            if not line:
                continue

            title_match = re.search(r"Title:\s*(.*)", line)
            description_match = re.search(r"Description:\s*(.*)", line)

            if title_match:
                if current_milestone:
                    milestones.append(current_milestone)
                current_milestone = {"title": title_match.group(1).strip()}
            elif description_match:
                current_milestone["description"] = description_match.group(1).strip()

        if current_milestone:
            milestones.append(current_milestone)

        return milestones

    def _parse_sources(self, text):
        """
        Parse the AI response for learning sources.
        
        :param text: The raw text response from the AI model.
        :return: A list of parsed learning sources.
        """
        sources = []
        lines = text.strip().split('\n')
        current_source = {}

        for line in lines:
            line = line.strip()
            if not line:
                continue

            title_match = re.search(r"Title:\s*(.*)", line)
            description_match = re.search(r"Description:\s*(.*)", line)
            status_match = re.search(r"Status:\s*(.*)", line)
            icon_match = re.search(r"Icon:\s*(.)", line)

            if icon_match:
                if "title" in current_source:
                    sources.append(current_source)
                    current_source = {}
                current_source["icon"] = icon_match.group(1).strip()
            elif title_match:
                if current_source:
                    sources.append(current_source)
                current_source['title'] = title_match.group(1).strip()
            elif description_match:
                current_source["description"] = description_match.group(1).strip()
            elif status_match:
                current_source["status"] = status_match.group(1).strip()

        if "title" in current_source:
            sources.append(current_source)

        return sources
    