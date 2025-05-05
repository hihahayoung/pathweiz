import '../../styles/CategoryTab.css';

/**
 * CategoryTab component to display a tag with a specific background color.
 *
 * @param {Object} props - The component props.
 * @param {string} props.tag - The text of the tag to display.
 * @param {string} props.color - The background color of the tag.
 * @returns {React.ReactNode} The rendered category tab component.
 */
const CategoryTab = ({ tag, color }) => {
  return (
    <div className="category-tab" style={{ backgroundColor: color }}>
      <span className="category-text">{tag}</span>
    </div>
  );
};

export default CategoryTab;
