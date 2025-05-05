import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import CareerCard from '../components/Dashboard/CareerCard';
import ActionItemsSection from '../components/Dashboard/ActionItemsSection';
import FeatureExplainer from '../components/Dashboard/FeatureExplainer';
import { fetchCareerRecs } from '../api/supabaseApi';
import getTagColors from '../utils/utils';

/**
 * CareerDashboard component to display the user's career recommendations and action items.
 *
 * @returns {React.ReactNode} The rendered career dashboard component.
 */
const CareerDashboard = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);
  const [tagColors, setTagColors] = useState({});
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
  const { session } = useContext(AuthContext);

  // Fetch user data from session
  useEffect(() => {
    if (session && session.user) {
      try {
        const user = session.user;
        const username = user?.user_metadata?.username || 'N/A';
        const email = user?.email || 'N/A';

        setUser({
          name: username,
          email: email,
          avatar: `https://api.dicebear.com/5.x/thumbs/svg?seed=${username}`,
        });
      } catch (error) {
        console.error(`Failed to get user data from session: ${error}`);
      }
    }
  }, [session]);

  // Fetch career recommendations and generate tag colors
  useEffect(() => {
    const fetchAndLogRecommendations = async () => {
      try {
        const { recommendations } = await fetchCareerRecs();
        setRecommendations(recommendations); 

        // Generate custom colors for each tag in each job 
        const colors = getTagColors(recommendations);
        setTagColors(colors);

      } catch (err) {
        setError(err.message);
        console.error('Error fetching career recommendations:', err);
      }
    };

    fetchAndLogRecommendations();
  }, []);

  return (
    <div className="career-dashboard-container">
      {/* Profile Icon */}
      {user && (
        <div className="profile-icon-container" onClick={() => setShowProfile(!showProfile)}>
          <img src={user.avatar} alt="Profile" className="profile-icon" />
          <span className="profile-name">{user.name}</span>
        </div>
      )}

      {/* Profile Dropdown */}
      {showProfile && user && (
        <div className="profile-dropdown">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      )}

      {/* Feature Explainer */}
      <FeatureExplainer />

      {/* Career Cards and Action Items */}
      <div className="career-cards-container">
        {recommendations.map((rec, index) => (
          <CareerCard 
            key={rec.id}
            avatar={`https://api.dicebear.com/9.x/personas/svg?seed=${rec.job_title}`}
            title={rec.job_title} 
            shortDescription={rec.short_description}
            fullDescription={rec.job_description}
            recommendationReason={rec.recommendation_reason}
            tags={(rec.tags || '').split(',').map(tag => tag.trim())}
            tagColors={tagColors}
          />
        ))}
        <ActionItemsSection 
          careerRecs={recommendations}
          careerAvatars={recommendations.reduce((acc, rec) => {
            acc[rec.id] = `https://api.dicebear.com/9.x/personas/svg?seed=${rec.job_title}`;
            return acc;
          }, {})}
        />
      </div>
    </div>
  );
};

export default CareerDashboard;
