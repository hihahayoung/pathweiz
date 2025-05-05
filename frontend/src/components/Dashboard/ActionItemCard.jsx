import '../../styles/CareerDashboard.css';

/**
 * ActionItemCard component to display an action item with an icon, title, and description.
 *
 * @param {Object} props - The component props.
 * @param {string} props.icon - The URL of the icon to display.
 * @param {string} props.title - The title of the action item.
 * @param {string} props.description - The description of the action item.
 * @returns {React.ReactNode} The rendered action item card component.
 */
const ActionItemCard = ({ icon, title, description }) => {
  return (
    <div className="action-item-card">
      <div className="action-item-header">
        <img src={icon} alt="Career Avatar" className="action-item-avatar" />
        <p className="title">{title}</p>
      </div>
      <p className="description">{description}</p>
    </div>
  );
};

export default ActionItemCard;
