import PropTypes from 'prop-types';

/**
 * CheckboxQuestion component to render a question with multiple checkbox options.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the question.
 * @param {Array} props.options - The list of options for the checkboxes.
 * @param {Array} props.selectedValues - The list of currently selected values.
 * @param {Function} props.onChange - The function to call when the selection changes.
 * @param {number} [props.maxSelection=2] - The maximum number of selections allowed.
 * @returns {React.ReactNode} The rendered checkbox question component.
 */
const CheckboxQuestion = ({ 
  label, 
  options, 
  selectedValues, 
  onChange, 
  maxSelection = 2 // Using default parameter instead of defaultProps
}) => {
  /**
   * Handle the change in selection.
   *
   * @param {string} value - The value of the checkbox that was changed.
   */
  const handleSelectionChange = (value) => {
    if (selectedValues.includes(value)) {
      // Remove value if already selected
      onChange(selectedValues.filter((item) => item !== value));
    } else if (selectedValues.length < maxSelection) {
      // Add value if not selected and within limit
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div className="question-container">
      <label className="question-label">{label}</label>
      <div className="checkbox-group">
        {options.map((option) => (
          <label
            key={option.value}
            className={`checkbox-label ${selectedValues.includes(option.value) ? 'selected' : ''}`}
          >
            <input
              type="checkbox"
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={() => handleSelectionChange(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

CheckboxQuestion.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  maxSelection: PropTypes.number,
};

export default CheckboxQuestion;