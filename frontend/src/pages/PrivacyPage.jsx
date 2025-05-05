import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Database } from 'lucide-react';

function PrivacyPolicyPage() {
  const policies = [
    {
      icon: Database,
      title: "Data Collection",
      description: "We collect information about your interests, hobbies, and career preferences to provide personalized recommendations. This includes data you explicitly provide and usage data that helps us improve our service."
    },
    {
      icon: Lock,
      title: "Data Security",
      description: "Your data is encrypted and stored securely. We use industry-standard security measures to protect your personal information and never share it with third parties without your explicit consent."
    },
    {
      icon: Eye,
      title: "Data Usage",
      description: "We use your data solely to provide and improve our career recommendation service. This includes training our AI models to better understand career paths and user preferences."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-32 bg-gradient-to-br from-[#4A90E2] to-[#00BFFF]">
        <div className="max-w-6xl mx-auto text-center text-white">
          <h1 className="text-5xl font-extrabold mb-4">Privacy Policy</h1>
          <p className="text-lg max-w-2xl mx-auto">
            We take your privacy seriously. Learn how we collect, use, and protect your data to provide personalized career recommendations.
          </p>
        </div>
      </section>

      {/* Policy Overview Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How We Handle Your Data</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {policies.map((policy, index) => {
              const Icon = policy.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{policy.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{policy.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Policy Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Detailed Privacy Policy</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2">1. Information We Collect</h3>
              <p>
                We collect information that you provide directly to us, including:
                <ul className="list-disc list-inside">
                  <li>Personal information (name, email, etc.)</li>
                  <li>Career preferences and interests</li>
                  <li>Educational background</li>
                  <li>Hobbies and activities</li>
                  <li>Survey responses and feedback</li>
                </ul>
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2">2. How We Use Your Information</h3>
              <p>
                We use the information we collect to:
                <ul className="list-disc list-inside">
                  <li>Provide personalized career recommendations</li>
                  <li>Improve our AI algorithms and services</li>
                  <li>Communicate with you about our services</li>
                  <li>Ensure platform security and prevent fraud</li>
                </ul>
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2">3. Information Sharing</h3>
              <p>
                We do not sell your personal information. We may share your information only:
                <ul className="list-disc list-inside">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and prevent abuse</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-semibold mb-4">Have Questions?</h3>
          <p className="mb-4">If you have any questions about this privacy policy or our data practices, we invite you to reach out.</p>
          <Link to="/contact" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}

export default PrivacyPolicyPage;