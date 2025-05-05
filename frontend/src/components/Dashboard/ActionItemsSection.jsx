import { useState, useEffect } from 'react';
import ActionItemCard from './ActionItemCard';
import { fetchActionItems } from '../../api/supabaseApi';
import '../../styles/CareerDashboard.css';

/**
 * ActionItemsSection component to display a list of action items for career recommendations.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.careerRecs - The list of career recommendations.
 * @param {Object} props.careerAvatars - The mapping of career recommendation IDs to avatar URLs.
 * @returns {React.ReactNode} The rendered action items section component.
 */
const ActionItemsSection = ({ careerRecs, careerAvatars }) => {
  const [actionItems, setActionItems] = useState([]);
  const [error, setError] = useState(null);

  // Fetch action items when career recommendations change
  useEffect(() => {
    const fetchAndSetActionItems = async () => {
      try {
        const allActionItems = []
  
        for (let i = 0; i < careerRecs.length; i++) {
          const items = await fetchActionItems(careerRecs[i].id);
          const itemsWithAvatars = items.map(item => ({
            ...item,
            avatar: careerAvatars[careerRecs[i].id] || null,
          }));
          allActionItems.push(...itemsWithAvatars);
          console.log(careerAvatars);
        }
  
        setActionItems(allActionItems);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching action items:', err);
      }
    }

    if (careerRecs?.length > 0) {
      fetchAndSetActionItems();
    }
    
  }, [careerRecs])

  return (
    <div className="action-items-section">
      <div className="action-items-list">
        {actionItems.map((item, index) => (
          <ActionItemCard
            key={index}
            icon={item.avatar}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ActionItemsSection;
