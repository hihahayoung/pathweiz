import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const RecommendationsContext = createContext();

/**
 * RecommendationsProvider component to provide recommendations context to its children.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render within the provider.
 * @returns {React.ReactNode} The rendered provider component.
 */
export function RecommendationsProvider({ children }) {
  const [hasRecommendations, setHasRecommendations] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Update the status of whether recommendations are available.
   *
   * @param {boolean} status - The new status of recommendations availability.
   */
  const updateRecommendationsStatus = (status) => {
    setHasRecommendations(status);
  };

  /**
   * Set the loading state to true.
   */
  const startLoading = () => setIsLoading(true);

  /**
   * Set the loading state to false.
   */
  const stopLoading = () => setIsLoading(false);

  return (
    <RecommendationsContext.Provider 
      value={{ 
        hasRecommendations, 
        updateRecommendationsStatus,
        isLoading,
        startLoading,
        stopLoading
      }}
    >
      {children}
    </RecommendationsContext.Provider>
  );
}

RecommendationsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Custom hook to use the recommendations context.
 *
 * @returns {Object} The recommendations context value.
 * @throws Will throw an error if used outside of a RecommendationsProvider.
 */
export const useRecommendations = () => {
  const context = useContext(RecommendationsContext);
  if (!context) {
    throw new Error('useRecommendations must be used within a RecommendationsProvider');
  }
  return context;
};