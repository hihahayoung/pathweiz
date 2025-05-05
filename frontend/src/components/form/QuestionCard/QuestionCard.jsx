import PropTypes from 'prop-types';
import { getQuestions } from './questions';

/**
 * QuestionCard component to render a card with a question from the survey.
 * Displays the current question, progress, and navigation buttons.
 *
 * @param {Object} props - The component props.
 * @param {number} props.currentQuestion - The index of the current question.
 * @param {Object} props.formData - The current form data.
 * @param {Function} props.handleInputChange - The function to call when an input changes.
 * @param {Function} props.handlePrevious - The function to call when the previous button is clicked.
 * @param {Function} props.handleNext - The function to call when the next button is clicked.
 * @param {boolean} props.isFirstQuestion - Whether the current question is the first question.
 * @param {boolean} props.isLastQuestion - Whether the current question is the last question.
 * @returns {React.ReactNode} The rendered question card component.
 */
const QuestionCard = ({
  currentQuestion,
  formData,
  handleInputChange,
  handlePrevious,
  handleNext,
  isFirstQuestion,
  isLastQuestion,
}) => {
  const questions = getQuestions(formData, handleInputChange);

  // Filter out category cards
  const filteredQuestions = questions.filter((q) => q.type !== 'category');
  const totalQuestions = filteredQuestions.length;

  // Find the index of the current question in the filtered list
  const currentFilteredIndex = filteredQuestions.findIndex(
    (q) => q.id === questions[currentQuestion]?.id
  );

  // Use the indices to get the curr question number and content
  const currentQuestionNumber = currentFilteredIndex + 1;
  const currentQuestionContent = questions[currentQuestion];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2 className="quiz-title">Career Development Survey</h2>
        {currentQuestionContent?.type !== 'category' && (
          <p className="quiz-progress">
            Question {currentQuestionNumber} of {totalQuestions}
          </p>
        )}
        {currentQuestionContent?.type !== 'category' && (
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${(currentQuestionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        )}
      </div>
      {currentQuestionContent?.type === 'category' ? (
        <div className="category-card">
          <h3>{currentQuestionContent.label}</h3>
        </div>
      ) : (
        currentQuestionContent?.render()
      )}
      <div className="button-container">
        <button
          onClick={handlePrevious}
          disabled={isFirstQuestion}
          className="quiz-button secondary"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="quiz-button primary"
        >
          {isLastQuestion ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};

QuestionCard.propTypes = {
  currentQuestion: PropTypes.number.isRequired,
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  isFirstQuestion: PropTypes.bool.isRequired,
  isLastQuestion: PropTypes.bool.isRequired,
};

export default QuestionCard;