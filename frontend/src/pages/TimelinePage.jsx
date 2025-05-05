import { useState, useEffect } from 'react';
import CareerTimeline from '../components/Dashboard/CareerTimeline';
import { fetchCareerRecs } from '../api/supabaseApi';

/**
 * TimelinePage component to display a timeline of career milestones for a selected career.
 *
 * @returns {React.ReactNode} The rendered timeline page component.
 */
const TimelinePage = () => {
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [careers, setCareers] = useState([]);
  const [error, setError] = useState(null);

  // Fetch career recommendations on component mount
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await fetchCareerRecs();
        const recs = response.recommendations;
        setCareers(recs); 
        if (recs.length > 0) {
          setSelectedCareer(recs[0].id);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching career recommendations:', err);
      }
    };

    fetchCareers();
  }, []);

  /**
   * Handle change in selected career from the dropdown.
   *
   * @param {Object} event - The change event from the dropdown.
   */
  const handleCareerChange = (event) => {
    setSelectedCareer(parseInt(event.target.value));
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
      {/* Centered Career Selector */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px', marginBottom: '60px' }}>
        <select
          value={selectedCareer}
          onChange={handleCareerChange}
          style={{
            padding: '15px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '2px solid #4A90E2',
            backgroundColor: '#fff',
            cursor: 'pointer',
            minWidth: '200px',
            textAlign: 'center',
          }}
        >
          {careers.map((career) => (
            <option key={career.id} value={career.id}>
              {career.job_title}
            </option>
          ))}
        </select>
      </div>

      {/* Career Timeline */}
      <CareerTimeline careerId={selectedCareer} />
    </div>
  );
};

export default TimelinePage;
