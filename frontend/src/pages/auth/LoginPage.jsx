import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';
import "../../assets/styles/components/forms.css";

/**
 * LoginPage component to render the login page.
 *
 * @returns {React.ReactNode} The rendered login page component.
 */
function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Handle form submission for login.
   *
   * @param {Object} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="auth-container max-w-md w-full p-8 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Login</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm hover:shadow-md"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm hover:shadow-md"
            />
          </div>
          <button type="submit" className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300">
            Login
          </button>
        </form>
        <p className="auth-link text-center mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-600 font-semibold hover:underline">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;