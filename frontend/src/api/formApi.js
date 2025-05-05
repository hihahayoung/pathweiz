import { supabase } from '../services/supabaseClient';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:5000';

export const submitForm = async (formData) => {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      throw new Error('Unable to fetch session. Please log in again.');
    }

    const token = session.access_token;

    const response = await fetch(`${BACKEND_URL}/submit_form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
      mode: 'cors',
      credentials: 'include'
    });
    

    return await response.json();
  } catch (err) {
    console.error('Error submitting form:', err);
    throw err;
  }
};
