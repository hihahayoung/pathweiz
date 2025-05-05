import PropTypes from 'prop-types';

/**
 * LikertQuestion component to render a single Likert scale question.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the Likert scale question.
 * @param {Array} props.options - The list of options for the Likert scale question.
 * @param {string} props.formData - The current selected value for the Likert scale question.
 * @param {Function} props.onChange - The function to call when an option is selected.
 * @param {string} props.likertStart - The label for the start of the Likert scale.
 * @param {string} props.likertEnd - The label for the end of the Likert scale.
 * @returns {React.ReactNode} The rendered Likert question component.
 */
const LikertQuestion = ({ label, options, formData, onChange, likertStart, likertEnd }) => (
  <div className="question-container">
    <label className="question-label">{label}</label>
    <div className="likert-scale">
      <div className="likert-label start">{likertStart}</div>
      {options.map((option) => (
        <label key={option.value} className="likert-option">
          <input
            type="radio"
            name="likert-scale"
            value={option.value}
            checked={formData === option.value}
            onChange={() => onChange(option.value)}
          />
          <span>{option.label}</span>
        </label>
      ))}
      <div className="likert-label end">{likertEnd}</div>
    </div>
  </div>
);

LikertQuestion.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  formData: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  likertStart: PropTypes.string.isRequired,
  likertEnd: PropTypes.string.isRequired
};

export default LikertQuestion;