PROMPTS = {
    "recommendations": """Generate three personalized career recommendations based on the following quiz data:
{quiz_data}

CRITICAL: Avoid making superficial connections like merely combining the two industries they suggested. 
Additionally, avoid overly-obvious suggestions like "Biologist" for a Biology student.

For each recommendation, include:
1. Job Title (<5)
2. Short Description
3. Full Job Description
4. Why it's recommended
5. Fit Percentage
6. Tags (2-3 categories that the career falls into. E.g., 'Data Science, Music')
7. Labels (comma-separated).""",

    "milestones": """Generate exactly 5 milestones for the career path of a {job_title}, starting with their {college_year} of college
Each milestone must be structured as follows:

Title: [Milestone Title]
Description: [Detailed Description of the Milestone]

Example:
Title: Join a Tech Club
Description: Participate in a local tech club to build skills, network, and explore your field of interest.

Ensure there are exactly 5 milestones, and no other content outside of this structure.""",

    "sources": """Generate exactly 3 actionable learning resources for becoming a {job_title}. 
Each resource must be structured as follows:

Icon: Emoji [A single, relevant emoji]
Title: [Resource Title]
Description: [One-sentence Description of the Resource]
Status: [Default Status: Not Started]

Example:
Icon: 🐍
Title: Learn Python Basics
Description: Enroll in the 'Python for Beginners' course on Coursera to build foundational programming skills.
Status: Not Started

Ensure there are exactly 3 resources, and no other content outside of this structure."""
}