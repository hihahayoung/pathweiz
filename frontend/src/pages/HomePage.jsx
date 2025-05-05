import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';
import "../assets/styles/components/navbar.css";
import "../assets/styles/components/hero.css";
import "../assets/styles/common/_utilities.css";
import "../assets/styles/pages/HomePage.css";
import featureCardCareer from "/images/feature-card-career-rec.png";
import featureCardTimeline from "/images/feature-card-timeline.png";
import featureCardActionItems from "/images/feature-card-action-items.png";
import { Brain, Target, Rocket } from 'lucide-react';

const FeatureCard = ({ Icon, title, description }) => (
  <>
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-[#4A90E2]/10">
      <div className="bg-[#4A90E2] bg-opacity-10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-[#4A90E2]" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-[#4A90E2]">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </>
);

const ImageCard = ({ src, alt }) => (
  <>
    <div className="feature-card transform hover:scale-105 transition-all duration-300">
      <img 
        src={src} 
        alt={alt} 
        className="shadow-lg rounded-xl hover:shadow-xl transition-shadow"
        loading="lazy"
      />
    </div>
  </>
);

function HomePage() {
  const { session } = useContext(AuthContext);
  const user = session ? session.user : null;

  const features = [
    {
      Icon: Brain,
      title: "Holistic Assessment",
      description: "We consider your whole profile - from academic interests to hobbies, extracurriculars, and personal values to suggest careers that truly align with who you are."
    },
    {
      Icon: Target,
      title: "AI-Powered Matching",
      description: "Our advanced AI algorithm processes multiple data points to identify career paths that match your unique combination of skills and interests."
    },
    {
      Icon: Rocket,
      title: "Actionable Roadmap",
      description: "Get a clear, step-by-step pathway to your recommended careers, including relevant courses, certifications, and practical experiences."
    }
  ];

  const imageFeatures = [
    { src: featureCardCareer, alt: "Career Recommendations" },
    { src: featureCardTimeline, alt: "Timelines" },
    { src: featureCardActionItems, alt: "Action Items" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Shorter height */}
      <section className="relative min-h-[75vh] flex items-center justify-center hero-section">
        <div className="absolute inset-0 bg-grid-white/[0.05]" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Your Career Journey <br />
            <span className="text-white opacity-90">Starts Here</span>
          </h1>
          <p className="text-lg sm:text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Be among the first to experience our innovative approach to career guidance. 
            Let's discover your perfect career path together.
          </p>
          <div className="space-x-4">
            <Link
              to={session ? "/quiz" : "/signup"}
              aria-label="Take Career Quiz"
              className="inline-flex items-center px-6 sm:px-8 py-3 rounded-lg bg-white text-[#4A90E2] font-semibold hover:bg-opacity-90 transition-all hover:scale-105"
            >
              Take Career Quiz
              <Rocket className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/explore"
              aria-label="Explore Careers"
              className="inline-flex items-center px-6 sm:px-8 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white hover:text-[#4A90E2] transition-all hover:scale-105"
            >
              Explore Careers
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Adjusted padding */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#4A90E2] relative">
            <span className="relative">
              What Makes Us Different
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[#4A90E2]/30 rounded-full"></div>
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Image Features Section */}
      <section className="bg-[#4A90E2]/5 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#4A90E2] mb-16 relative">
            <span className="relative">
              Why Choose Us?
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[#4A90E2]/30 rounded-full"></div>
            </span>
          </h2>
          <div className="feature-cards">
            {imageFeatures.map((feature, index) => (
              <ImageCard key={index} {...feature} />
            ))}
          </div>
          <Link
            to="/signup"
            className="inline-flex items-center px-8 py-3 mt-12 rounded-lg bg-[#4A90E2] text-white font-semibold hover:bg-[#357ABD] transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;