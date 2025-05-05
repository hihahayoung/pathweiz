# Welcome to the Pathweiz!

### Link to Deployed Website: https://pathweiz.onrender.com/

## 📚 Table of Contents

- [Overview](#overview)
- [Demo video](#demo-video)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Acknowledgments](#acknowledgments)

## 🎉 Overview

Welcome to Pathweiz! This web application is designed to help college students discover their future careers through a **fun** and **interactive** questionnaire!

## Demo Video
Watch our demo video here: https://www.youtube.com/watch?v=qWhkFiFQIDI

## Features

- ✅ **User Authentication**: Easy login, signup, and logout
- 📝 **Interactive Questionnaire**: Gather your preferences and career aspirations
- 🎯 **Dynamic Recommendations**: Tailored career suggestions based on your input
- 📱 **Responsive Design**: Perfect for both mobile and desktop users

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Flask, Supabase, Google Gemini API
- **Database**: Supabase (PostgreSQL)

## 🚀 Getting Started

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- Python (v3.8 or later)
- PostgreSQL (for local development)
- Supabase account for database and authentication

### 💻 Installation

#### Frontend

1. **Navigate to the frontend directory**:

   ```bash
   cd frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the `frontend` directory and add your Supabase URL and Key:

   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_KEY=your_supabase_key
   VITE_BACKEND_URL="http://localhost:5173"
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

#### Backend

1. **Navigate to the backend directory**:

   ```bash
   cd backend
   ```

2. **Create a virtual environment**:

   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**:

   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

5. **Create a `.env` file** in the `backend` directory and add your Supabase and Google Gemini API keys:

   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_KEY=your_supabase_key
   GEMINI_API_KEY=your_gemini_api_key
   SUPABASE_JWT_SECRET=your_supabase_jwt_secret
   ```

6. **Start the Flask server**:
   ```bash
   python app.py
   ```

## 🏆 Usage

1. **Navigate to the application** in your browser (default: `http://localhost:5173`).
2. **Sign up or log in** to access the questionnaire. 🔑
3. **Complete the questionnaire** to receive personalized career recommendations. 🎁

# Project Structure

- frontend/
  - public/
    - images/: Static images used in the application.
    - vite.svg: Default Vite logo file.
  - src/
    - api/
      - formApi.js: Functions to handle form-related API requests.
      - supabaseApi.js: Functions for interacting with the Supabase backend.
    - assets/styles/: Directory for shared and global stylesheets.
    - components/
      - auth/
        - RequireAuth.jsx: Component to handle route protection requiring authentication.
      - common/: Common reusable UI components.
      - Dashboard/: Components specific to the user dashboard.
      - form/: Components for handling forms and inputs.
    - context/
      - auth/: Manages authentication-related state.
      - recommendations/: Context for managing recommendation data and logic.
    - data/
      - mockSurveyData.json: Mock data for survey inputs and testing.
    - lib/
      - utils.js: Utility functions and reusable helpers.
    - pages/
      - auth/: Pages related to authentication.
        - CareerDashboard.jsx: Page for user career dashboard.
        - ExplorePage.jsx: Page to explore career-related content.
        - FormPage.jsx: Page for inputting form data.
        - FormPage.test.jsx: Test file for the FormPage component.
        - HomePage.jsx: Main landing page of the app.
        - TimelinePage.jsx: Displays user career timeline and milestones.
    - services/: Modules for handling business logic or external data fetching.
    - styles/
      - CareerDashboard.css: Styles for the CareerDashboard page.
      - CareerTimeline.css: Styles for the TimelinePage.
      - CategoryTab.css: Styles for category tabs on pages.
      - ExplorePage.css: Styles for the ExplorePage component.
    - utils/: Directory for utility functions shared across the app.
    - App.css: Global CSS file for the main App component.
    - App.jsx: Root React component for the application.
    - main.jsx: Entry point that renders the App component.
    - setupTests.js: Configuration file for setting up unit tests.

  - package.json: Defines frontend dependencies and scripts.
  - tailwind.config.js: Tailwind CSS configuration.
  - vite.config.js: Vite configuration for development and build.

- backend/
  - services/
    - __init__.py: Initializes the services module.
    - ai_service.py: Manages AI-related services and logic.
    - database.py: Handles database connections and operations.
  - app.py: Main entry point for the backend application.
  - config.py: Configuration settings for the backend services.
  - requirements.txt: Python dependencies for backend development.
  - utils.py: Utility functions used across the backend.


---

Thank you for checking out Pathweiz! We hope you enjoy your journey towards discovering your future career! 🌟💼
