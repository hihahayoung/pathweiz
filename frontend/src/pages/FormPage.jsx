import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin, message } from 'antd';
import QuestionCard from '../components/form/QuestionCard/QuestionCard';
import { getQuestions } from '../components/form/QuestionCard/questions';
import { submitForm } from '../api/formApi'; 
import { useRecommendations } from '../context/recommendations/RecommendationsContext';

/**
 * FormPage component
 * This component renders a dynamic questionnaire form and manages form data, navigation,
 * and submission to the backend server.
 */
const FormPage = () => {
  const navigate = useNavigate(); // For redirecting after form submission
  const { 
    updateRecommendationsStatus, 
    startLoading: startContextLoading, 
    stopLoading: stopContextLoading 
  } = useRecommendations(); // Context functions to manage app-level state for recommendations

  // State to track the current question index in the form
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // State to hold the user's form data
  const [formData, setFormData] = useState({
    collegeYear: '',
    fieldOfStudy: '',
    favoriteCourse: '', 
    surprisingCourse: '', 
    topHobbies: '', 
    jobsInternships: '',
    dislikedAspects: '', 
    careerClarity: '',
    explorationOpenness: '',
    stabilitySecurity: '',
    learningGrowth: '',
    workLifeBalance: '',
    socialImpact: '',
    creativityInnovation: '',
    highIncomeAdvancement: '',
    careerPriorities: {},
    idealWorkEnvironment: [],
    industriesOfInterest: '',
    unconventionalAspect: '',
    admiredPerson: '',
    admiredFriends: '',
    preferredLocations: '', 
    finalThoughts: '',
  });

  // Loading state for managing the spinner during submission
  const [loading, setLoading] = useState(false);

  // State for capturing error messages during submission
  const [error, setError] = useState(null);

  // Message displayed during the loading spinner
  const [loadingMessage, setLoadingMessage] = useState('Loading Smart Recommendations');

  /**
   * handleInputChange
   * Updates the form data state when a user interacts with form fields.
   * @param {string} field - The name of the form field being updated.
   * @param {string|array} value - The new value entered by the user.
   */
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Get the list of questions dynamically based on the current form data
  const questions = getQuestions(formData, handleInputChange);

  /**
   * handleSubmitForm
   * Submits the form data to the backend API, handles response and error management.
   */
  const handleSubmitForm = async () => {
    setLoading(true); // Show loading spinner
    setError(null); // Reset error state
    startContextLoading(); // Start global context loading

    try {
      // Call the API to submit the form data
      console.log("formData:", formData)
      await submitForm(formData);

      // Update recommendations status to reflect successful submission
      updateRecommendationsStatus(true);

      // Show success message and navigate to the dashboard
      message.success('Recommendations Saved!');
      navigate('/dashboard');
    } catch (err) {
      // Handle errors during form submission
      setError(err.message);
      message.error('Error processing your responses');
      updateRecommendationsStatus(false);
    } finally {
      // Reset loading states
      setLoading(false);
      stopContextLoading();
    }
  };

  /**
   * handlePrevious
   * Navigates to the previous question in the form.
   */
  const handlePrevious = () => {
    setCurrentQuestion((prev) => Math.max(0, prev - 1)); // Prevent negative indices
  };

  /**
   * handleNext
   * Navigates to the next question or submits the form if on the last question.
   */
  const handleNext = async () => {
    if (currentQuestion === questions.length - 1) {
      // If it's the last question, submit the form
      await handleSubmitForm();
    } else {
      // Otherwise, go to the next question
      setCurrentQuestion((prev) => Math.min(questions.length - 1, prev + 1));
    }
  };

  // Render the form UI
  return (
    <div className="flex-grow flex items-center justify-center py-20">
      {loading ? (
        // Render the loading spinner during submission
        <div className="bg-white/95 backdrop-blur-md p-8 rounded-xl shadow-lg flex flex-col items-center gap-4">
          <Spin tip={loadingMessage} size="large" className="custom-spinner" />
          <p className="text-gray-600 mt-4">
            We're analyzing your responses to provide personalized recommendations! It usually takes about 20-30 seconds.
          </p>
        </div>
      ) : (
        // Render the questionnaire
        <div className="w-full max-w-2xl">
          <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
            <QuestionCard
              currentQuestion={currentQuestion}
              formData={formData}
              handleInputChange={handleInputChange}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              isFirstQuestion={currentQuestion === 0}
              isLastQuestion={currentQuestion === questions.length - 1}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FormPage;
