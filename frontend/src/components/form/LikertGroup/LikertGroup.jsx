import PropTypes from 'prop-types';

/**
 * LikertGroup component to render a group of Likert scale questions.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the group of Likert scale questions.
 * @param {Array} props.options - The list of options for the Likert scale questions.
 * @param {Object} props.formData - The current form data.
 * @param {Function} props.onChange - The function to call when an option is selected.
 * @param {string} props.likertStart - The label for the start of the Likert scale.
 * @param {string} props.likertEnd - The label for the end of the Likert scale.
 * @returns {React.ReactNode} The rendered Likert group component.
 */
const LikertGroup = ({ label, options, formData = {}, onChange, likertStart, likertEnd }) => (
  <div className="question-container">
    <label className="question-label">{label}</label>
    <div className="likert-group">
      {options.map((option) => (
        <div key={option.id} className="likert-item">
          <label className="likert-item-label">{option.label}</label>
          <div className="likert-scale">
            <div className="likert-label start">{likertStart}</div>
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value} className="likert-option">
                <input
                  type="radio"
                  name={option.id}
                  value={value}
                  checked={formData?.[option.id] === `${value}`}
                  onChange={() => onChange(option.id, `${value}`)}
                />
                <span>{value}</span>
              </label>
            ))}
            <div className="likert-label end">{likertEnd}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

LikertGroup.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  formData: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  likertStart: PropTypes.string.isRequired,
  likertEnd: PropTypes.string.isRequired,
};

export default LikertGroup;