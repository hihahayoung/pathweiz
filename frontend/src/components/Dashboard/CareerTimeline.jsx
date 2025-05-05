import { useEffect, useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { fetchCareerMilestones, upsertMilestoneUpdate, deleteMilestoneUpdate } from '../../api/supabaseApi';
import 'react-vertical-timeline-component/style.min.css';
import { motion } from 'framer-motion';
// Sleek Icons
import { FiEdit, FiTrash2, FiCheck } from 'react-icons/fi';
import '../../styles/CareerTimeline.css';

/**
 * CareerTimeline component to display a vertical timeline of career milestones.
 *
 * @param {Object} props - The component props.
 * @param {string} props.careerId - The ID of the career for which to fetch milestones.
 * @returns {React.ReactNode} The rendered career timeline component.
 */
const CareerTimeline = ({ careerId }) => {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editStates, setEditStates] = useState({});
  const [editingId, setEditingId] = useState(null); // ID of the milestone being edited
  const [notifications, setNotifications] = useState({}); // Notifications per milestone

  // Fetch career milestones when the careerId changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let data = await fetchCareerMilestones(careerId);
        data.sort((a, b) => a.id - b.id); // Sort milestones by ID in ascending order
        setMilestones(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (careerId) fetchData();
  }, [careerId]);


  const handleEditChange = (id, value) => {
    setEditStates((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async (id) => {
    const newUpdate = editStates[id];
    try {
      await upsertMilestoneUpdate(id, newUpdate);
      setMilestones((prev) =>
        prev.map((m) => (m.id === id ? { ...m, updates: newUpdate } : m))
      );
      setNotifications((prev) => ({ ...prev, [id]: 'Saved successfully!' }));
    } catch {
      setNotifications((prev) => ({ ...prev, [id]: 'Error saving update.' }));
    } finally {
      clearNotification(id);
      setEditingId(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMilestoneUpdate(id);
      setMilestones((prev) =>
        prev.map((m) => (m.id === id ? { ...m, updates: null } : m))
      );
      setEditStates((prev) => ({ ...prev, [id]: '' }));
      setNotifications((prev) => ({ ...prev, [id]: 'Deleted successfully!' }));
    } catch {
      setNotifications((prev) => ({ ...prev, [id]: 'Error deleting update.' }));
    } finally {
      clearNotification(id);
    }
  };

  const clearNotification = (id) => {
    setTimeout(() => {
      setNotifications((prev) => ({ ...prev, [id]: null }));
    }, 3000);
  };

  // Define background colors for timeline elements
  const backgroundColors = [
    '#90caf9', // Blue
    '#ffcc80', // Orange
    '#aed581', // Green
    '#f48fb1', // Pink
    '#ffab40', // Yellow
  ];

  return (
    <div className="career-timeline">
      <h2 className="timeline-header">Your Career Path</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : (
        <VerticalTimeline>
          {milestones.map((milestone, index) => {
            const isLeft = index % 2 === 0;
            return (
              <VerticalTimelineElement
                key={milestone.id}
                className="vertical-timeline-element"
                contentStyle={{ background: '#fff', color: '#000' }}
                contentArrowStyle={{ borderRight: '7px solid #ddd' }}
                iconStyle={{ background: backgroundColors[index % backgroundColors.length], color: '#fff' }}
                icon={<span>📍</span>}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="vertical-timeline-element-title">{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </motion.div>

                {/* Updates Section */}
                <div style={{ marginTop: '20px', position: 'relative' }}>
                  {editingId === milestone.id ? (
                    <>
                      <textarea
                        value={editStates[milestone.id] ?? milestone.updates ?? ''}
                        onChange={(e) => handleEditChange(milestone.id, e.target.value)}
                        rows="3"
                        placeholder="Update your progress here..."
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '5px',
                          border: '1px solid #ccc',
                          resize: 'none',
                        }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '10px' }}>
                        <FiCheck
                          style={{ cursor: 'pointer', fontSize: '1.2rem', color: '#28a745' }}
                          onClick={() => handleSave(milestone.id)}
                        />
                        <FiTrash2
                          style={{ cursor: 'pointer', fontSize: '1.2rem', color: '#dc3545' }}
                          onClick={() => handleDelete(milestone.id)}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <p style={{ fontStyle: 'italic', color: '#555' }}>
                        {milestone.updates || 'No updates yet.'}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                        <FiEdit
                          style={{ cursor: 'pointer', fontSize: '1.2rem', color: '#6c757d' }}
                          onClick={() => setEditingId(milestone.id)}
                        />
                        {milestone.updates && (
                          <FiTrash2
                            style={{ cursor: 'pointer', fontSize: '1.2rem', color: '#dc3545' }}
                            onClick={() => handleDelete(milestone.id)}
                          />
                        )}
                      </div>
                    </>
                  )}
                  {/* Notification */}
                  {notifications[milestone.id] && (
                    <p style={{ marginTop: '10px', color: '#28a745', fontStyle: 'italic', fontSize: '0.9rem' }}>
                      {notifications[milestone.id]}
                    </p>
                  )}
                </div>
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      )}
    </div>
  );
};

export default CareerTimeline;
