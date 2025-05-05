import { supabase } from "../services/supabaseClient";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:5000';

/**
 * Fetches career recommendations from the backend.
 * @returns {Promise<{status: number, recommendations: Array}>} An object containing the status and recommendations.
 */
const fetchCareerRecs = async () => {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      throw new Error('Unable to fetch session. Please log in again.');
    }

    const token = session.access_token;

    const response = await fetch(`${BACKEND_URL}/get_recommendations`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return { status: response.status, recommendations: [] };
    }

    const { recommendations } = await response.json();
    return { recommendations, status: response.status };
  } catch (err) {
    console.error('Error fetching recommendations:', err);
    return { status: 500, recommendations: [] };
  }
};

/**
 * Fetches career milestones for a given recommendation ID.
 * @param {string} recommendationId - The ID of the recommendation.
 * @returns {Promise<Array>} An array of milestones.
 */
const fetchCareerMilestones = async (recommendationId) => {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      throw new Error('Unable to fetch session. Please log in again.');
    }

    const token = session.access_token;

    const response = await fetch(`${BACKEND_URL}/get_career_milestones?recommendation_id=${recommendationId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to fetch milestones.');
    }

    const { milestones } = await response.json();
    return milestones;
  } catch (err) {
    console.error('Error fetching milestones:', err);
    return [];
  }
};

/**
 * Fetches action items for a given recommendation ID.
 * @param {string} recommendationId - The ID of the recommendation.
 * @returns {Promise<Array>} An array of action items.
 */
const fetchActionItems = async (recommendationId) => {
  try {
    const response = await fetch(`${BACKEND_URL}/get_action_items?recommendation_id=${recommendationId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to fetch action items.');
    }

    const { action_items } = await response.json();
    return action_items;
  } catch (err) {
    console.error('Error fetching action items:', err);
    return [];
  }
};

/**
 * Fetches explore recommendations with pagination.
 * @param {string|null} cursor - The cursor for pagination.
 * @param {number} limit - The number of recommendations to fetch.
 * @returns {Promise<Object>} The data containing recommendations and pagination info.
 */
async function fetchExploreRecommendations(cursor = null, limit = 10) {
  const queryParams = new URLSearchParams({ limit });
  if (cursor) queryParams.append('cursor', cursor);

  const response = await fetch(`${BACKEND_URL}/explore_recommendations?${queryParams}`);
  if (!response.ok) {
    throw new Error(`Error fetching recommendations: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

// Update or insert an update for a specific milestone
const upsertMilestoneUpdate = async (milestoneId, newUpdate) => {
  try {
    const { data, error } = await supabase
      .from('milestones') // Updated table name
      .update({ updates: newUpdate })
      .eq('id', milestoneId);

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error updating milestone:', err);
    return null;
  }
};

// Delete an update
const deleteMilestoneUpdate = async (milestoneId) => {
  try {
    const { data, error } = await supabase
      .from('milestones') // Updated table name
      .update({ updates: null })
      .eq('id', milestoneId);

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error deleting update:', err);
    return null;
  }
};


export { fetchCareerRecs, fetchCareerMilestones, fetchActionItems, fetchExploreRecommendations, upsertMilestoneUpdate, deleteMilestoneUpdate};

