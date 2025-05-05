import { FaLightbulb } from 'react-icons/fa';
import '../../assets/styles/components/FeatureExplainer.css';

/**
 * FeatureExplainer component to display an explanation of the feature with an icon and text.
 *
 * @returns {React.ReactNode} The rendered feature explainer component.
 */
const FeatureExplainer = () => {
  return (
    <div className="feature-explainer">
      <FaLightbulb className="feature-explainer-icon" />
      <div className="feature-explainer-text">
        <p>
          <span className='first-sentence'>Explore personalized career recommendations based on your responses. </span>
          Each suggestion comes with actionable steps to trial the career path and build your skills.
        </p>
      </div>
    </div>
  );
};

export default FeatureExplainer;
