import PropTypes from 'prop-types';

/**
 * RadioQuestion component to render a single radio button question.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the radio button question.
 * @param {string} props.name - The name attribute for the radio button group.
 * @param {Array} props.options - The list of options for the radio button question.
 * @param {string} props.selectedValue - The currently selected value.
 * @param {Function} props.onChange - The function to call when an option is selected.
 * @returns {React.ReactNode} The rendered radio button question component.
 */
const RadioQuestion = ({ label, name, options, selectedValue, onChange }) => (
  <div className="question-container">
    <label className="question-label">{label}</label>
    <div className="radio-group">
      {options.map((option) => (
        <label key={option.value} className="radio-label">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={onChange}
          />
          {option.label}
        </label>
      ))}
    </div>
  </div>
);

RadioQuestion.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RadioQuestion;