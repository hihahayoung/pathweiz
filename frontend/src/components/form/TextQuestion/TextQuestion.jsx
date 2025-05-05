import PropTypes from 'prop-types';

/**
 * TextQuestion component to render a single text input question.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the text input question.
 * @param {string} props.value - The current value of the text input.
 * @param {string} props.placeholder - The placeholder text for the text input.
 * @param {Function} props.onChange - The function to call when the text input value changes.
 * @returns {React.ReactNode} The rendered text input question component.
 */
const TextQuestion = ({ label, value, placeholder, onChange }) => (
  <div className="question-container">
    <label className="question-label">{label}</label>
    <input
      type="text"
      className="question-input"
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

TextQuestion.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default TextQuestion;