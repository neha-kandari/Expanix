import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GridBackground from '../components/GridBackground';

export default function DigitalMarketing() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/contact');
  };

  const handleBackToServices = () => {
    navigate('/services');
  };

  return (
    <GridBackground className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 "></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-block bg-gradient-to-r from-gray-600 to-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              Digital Marketing
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Digital Growth
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Strategies</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              We create data-driven digital marketing campaigns that increase brand visibility, drive traffic, and generate qualified leads for your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleGetStarted}
                className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Started Now
              </button>
              <button
                onClick={handleBackToServices}
                className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors"
              >
                Back to Services
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* SEO */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl transition-all duration-300 group pointer-events-auto cursor-pointer transform hover:rotate-x-12 hover:rotate-y-12 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-900 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Search Engine Optimization</h3>
            <p className="text-gray-300 mb-6">
              Improve your website's visibility in search engines and drive organic traffic with our comprehensive SEO strategies.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• Technical SEO Audit</li>
              <li>• Keyword Research & Optimization</li>
              <li>• On-Page SEO</li>
              <li>• Link Building</li>
            </ul>
          </div>

          {/* PPC */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl transition-all duration-300 group pointer-events-auto cursor-pointer transform hover:rotate-x-12 hover:rotate-y-12 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-900 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Pay-Per-Click Advertising</h3>
            <p className="text-gray-300 mb-6">
              Targeted PPC campaigns on Google Ads, Facebook, and other platforms to drive immediate traffic and conversions.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• Google Ads Management</li>
              <li>• Facebook & Instagram Ads</li>
              <li>• Remarketing Campaigns</li>
              <li>• Conversion Optimization</li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl transition-all duration-300 group pointer-events-auto cursor-pointer transform hover:rotate-x-12 hover:rotate-y-12 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-900 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Social Media Marketing</h3>
            <p className="text-gray-300 mb-6">
              Build brand awareness and engage with your audience through strategic social media campaigns and content.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• Content Strategy</li>
              <li>• Community Management</li>
              <li>• Influencer Partnerships</li>
              <li>• Social Media Ads</li>
            </ul>
          </div>

          {/* Content Marketing */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl transition-all duration-300 group pointer-events-auto cursor-pointer transform hover:rotate-x-12 hover:rotate-y-12 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-900 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Content Marketing</h3>
            <p className="text-gray-300 mb-6">
              Create valuable, engaging content that attracts your target audience and drives organic growth.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• Blog Content Creation</li>
              <li>• Video Marketing</li>
              <li>• Email Marketing</li>
              <li>• Content Strategy</li>
            </ul>
          </div>

          {/* Analytics */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl transition-all duration-300 group pointer-events-auto cursor-pointer transform hover:rotate-x-12 hover:rotate-y-12 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-900 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Analytics & Reporting</h3>
            <p className="text-gray-300 mb-6">
              Data-driven insights and comprehensive reporting to track performance and optimize your marketing campaigns.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• Google Analytics Setup</li>
              <li>• Performance Tracking</li>
              <li>• ROI Analysis</li>
              <li>• Monthly Reports</li>
            </ul>
          </div>

          {/* Marketing Strategy */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl transition-all duration-300 group pointer-events-auto cursor-pointer transform hover:rotate-x-12 hover:rotate-y-12 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-900 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Marketing Strategy</h3>
            <p className="text-gray-300 mb-6">
              Comprehensive marketing strategies and campaign planning to achieve your business objectives.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• Campaign Planning</li>
              <li>• Target Audience Analysis</li>
              <li>• ROI Optimization</li>
              <li>• Performance Reports</li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Process Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Marketing
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Process</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We follow a strategic approach to digital marketing that delivers measurable results and drives business growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { number: '01', title: 'Research', desc: 'Analyzing your market, competitors, and target audience' },
            { number: '02', title: 'Strategy', desc: 'Developing comprehensive marketing strategies and campaigns' },
            { number: '03', title: 'Execution', desc: 'Implementing campaigns across multiple channels' },
            { number: '04', title: 'Optimization', desc: 'Monitoring performance and final campaign delivery' }
          ].map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-black">{step.number}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-300">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      {/* <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 border border-gray-700"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Grow Your
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent"> Business?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your marketing goals and create a digital strategy that drives real results for your business.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all"
          >
            Start Your Marketing Campaign
          </button>
        </motion.div>
      </div> */}
    </GridBackground>
  );
} 