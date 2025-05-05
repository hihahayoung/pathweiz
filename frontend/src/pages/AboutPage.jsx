import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import "../assets/styles/components/hero.css";

function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-[#4A90E2] to-[#00BFFF] animate-gradient">
        <div className="absolute inset-0 bg-grid-white/[0.05]" />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-8 leading-tight">
              Discover a Career You'll Love
            </h1>
            <h2 className="text-xl text-white/80 mb-6">
              Personalized career recommendations powered by AI
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed mb-10">
              Tired of generic career advice? Our platform is built by students, for students. 
              We understand that you are more than just your resume. Our AI considers your unique 
              interests, hobbies, and passions to suggest careers you'll genuinely enjoy.
            </p>
            <Link to="/signup" className="inline-flex items-center px-8 py-4 rounded-full bg-[#4A90E2] text-white font-semibold shadow-lg transition-transform transform hover:scale-110 hover:bg-[#357ABD]">
              Get Started
              <Star className="ml-3 w-5 h-5 transition-transform transform hover:translate-y-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why We Built This Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why We Built This</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            As college students, we were frustrated with traditional career guidance that 
            reduced us to our majors and GPAs. We believe that your midnight hobby could 
            be your future career, and your passion for indie games might lead to an 
            innovative tech startup. 
            <br />
            <span className="text-xl font-bold text-blue-600">
              That's why we created a platform that looks at the whole you – not just your resume.
            </span>
          </p>
        </div>
      </section>

      {/* Made For Real People Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Made For Real People
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Because you're more than just your major or GPA. Our platform celebrates your 
            unique combination of interests and helps you find careers that match who you 
            really are.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* College Students Card */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <div className="text-purple-600">🎓</div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">College Students</h3>
              <p className="text-gray-600 leading-relaxed">
                Tired of generic career advice? We understand that you're more than your major. 
                Our platform considers your unique interests, hobbies, and passions to suggest 
                careers you might actually love – not just tolerate.
              </p>
            </div>

            {/* Hobby Enthusiasts Card */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <div className="text-purple-600">🎮</div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Hobby Enthusiasts</h3>
              <p className="text-gray-600 leading-relaxed">
                Whether you're a gamer, artist, sports fan, or DIY maker, we believe your 
                interests matter. Discover careers that could let you turn your passions into 
                professions or find roles in companies that value your unique perspectives.
              </p>
            </div>

            {/* Multi-Passionate Individuals Card */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <div className="text-purple-600">👥</div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Multi-Passionate Individuals
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Can't choose between your love for technology and your passion for creative arts? 
                Don't! We help you find career paths that combine multiple interests, creating 
                unique opportunities you won't find in traditional career guides.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We're Different Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            How We're Different
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Forget cookie-cutter career advice. Our AI-powered platform creates personalized 
            recommendations based on what makes you uniquely you.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Beyond-the-Resume Card */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <div className="text-purple-600">❤️</div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Beyond-the-Resume Matching
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI looks at the whole you – not just your academic achievements. By 
                analyzing your hobbies, interests, and what you actually enjoy doing, we 
                suggest careers that align with both your skills AND your passions.
              </p>
            </div>

            {/* Interest-Based Discovery Card */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <div className="text-purple-600">🎯</div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Interest-Based Discovery
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Love photography but never considered how it could lead to a tech career? Or 
                maybe you're a gamer interested in finance? Our platform reveals unexpected 
                career paths that connect your interests with promising opportunities.
              </p>
            </div>

            {/* Creative Career Combinations Card */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <div className="text-purple-600">🎨</div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Creative Career Combinations
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Forget one-size-fits-all recommendations. We help you discover unique career 
                paths that combine multiple interests. Find out how your love for data analysis 
                and environmental advocacy could lead to an exciting career in sustainability tech.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;