import { useState, useEffect, useContext } from 'react';
import CareerCard from '../components/Dashboard/CareerCard';
import { fetchExploreRecommendations } from '../api/supabaseApi';
import { AuthContext } from '../context/auth/AuthContext';
import getTagColors from '../utils/utils'; // Import tag coloring utility
import '../styles/ExplorePage.css'; // Import the new CSS file

/**
 * ExplorePage component to display a list of job recommendations that users can explore.
 *
 * @returns {React.ReactNode} The rendered explore page component.
 */
function ExplorePage() {
  const { session } = useContext(AuthContext);
  const [jobRecommendations, setJobRecommendations] = useState([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [tagColors, setTagColors] = useState({});

  /**
   * Load job recommendations from the API.
   */
  const loadJobRecommendations = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetchExploreRecommendations(cursor);
      const { data, cursor: nextCursor } = response;

      setJobRecommendations((prev) => [...prev, ...data]);
      setFilteredRecommendations((prev) => [...prev, ...data]);
      setCursor(nextCursor);
      setHasMore(Boolean(nextCursor));

      // Generate custom colors for tags dynamically
      const colors = getTagColors(data);
      setTagColors((prevColors) => ({ ...prevColors, ...colors }));
    } catch (error) {
      console.error('Error loading job recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load job recommendations on component mount
  useEffect(() => {
    loadJobRecommendations();
  }, []);

  useEffect(() => {
    const filtered = jobRecommendations.filter(
      (rec) =>
        rec.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (rec.tags || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecommendations(filtered);
  }, [searchTerm, jobRecommendations]);

  return (
    <div className="explore-page">
      <h1 className="page-title">Explore Jobs</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by job title or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="grid-container">
        {filteredRecommendations.map((rec, index) => (
          <CareerCard
            key={`${rec.id}-${index}`}
            avatar={`https://api.dicebear.com/9.x/personas/svg?seed=${rec.job_title}-${index}`}
            title={rec.job_title}
            shortDescription={rec.short_description}
            fullDescription={rec.job_description}
            recommendationReason={rec.recommendation_reason}
            tags={(rec.tags || '').split(',').map((tag) => tag.trim())}
            tagColors={tagColors}
          />
        ))}
      </div>
      {hasMore && (
        <div className="load-more-container mt-6 mb-8">
          <button
            className="load-more-btn w-full max-w-xs py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={loadJobRecommendations}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}

export default ExplorePage;
