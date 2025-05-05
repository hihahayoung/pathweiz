import { createContext, useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';

const AuthContext = createContext();

/**
 * AuthProvider component to provide authentication context to its children.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render within the provider.
 * @returns {React.ReactNode} The rendered provider component.
 */
function AuthProvider({ children }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    let mounted = true;

    // Fetch the initial session.
    async function getInitialSession() {
      const { data } = await supabase.auth.getSession();
      if (mounted) {
        setSession(data.session);
      }
    }

    getInitialSession();

    // Listen for changes to the auth state.
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      mounted = false;

      if (authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  /**
   * Login function to authenticate a user with email and password.
   *
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @throws Will throw an error if the login fails.
   */
  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  /**
   * Signup function to register a new user with email, password, and username.
   *
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @param {string} username - The username of the user.
   * @throws Will throw an error if the signup fails.
   */
  const signup = async (email, password, username) => {
    const { error } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          data: { username },
        },
      }
    );
    if (error) throw error;
  };

  /**
   * Logout function to sign out the current user.
   *
   * @throws Will throw an error if the logout fails.
   */
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const value = {
    session,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
