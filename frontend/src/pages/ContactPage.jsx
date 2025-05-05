import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pt-32 pb-24">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Get in Touch
          </h1>
          <div className="space-y-2">
            <p className="text-xl text-gray-600">
              Have questions about how we can help you find your perfect career path?
            </p>
            <p className="text-xl text-gray-600">
              We'd love to hear from you!
            </p>
          </div>
        </div>

        {/* Contact Card */}
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">
              Contact Us
            </h2>

            <p className="text-gray-600 text-center mb-8">
              For any inquiries, please reach out to us via email:
            </p>

            <a 
              href="mailto:shamwana@uni.minerva.edu"
              className="block bg-blue-50 hover:bg-blue-100 rounded-xl p-6 mb-8 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-blue-600 font-medium">shamwana@uni.minerva.edu</span>
                <ArrowRight className="w-5 h-5 text-blue-600 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            <p className="text-gray-500 text-center">
              We look forward to hearing from you!
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2" />
      </div>
    </div>
  );
};

export default ContactPage;