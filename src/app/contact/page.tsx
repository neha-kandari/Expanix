import ContactForm from '../../components/ContactForm';
import ContactSpline from '../../components/ContactSpline';

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      {/* Header Text Section */}
      <div className="text-center pb-12 px-4">
        <h1 className="text-4xl font-bold uppercase mb-4">CONTACT US</h1>
        <p className="text-lg mb-2">Skip the Middlemen – Talk Directly to the Developer!</p>
        <p className="text-sm text-gray-400 max-w-3xl mx-auto leading-relaxed">
          We believe in clear, fast, and honest communication. That&apos;s why when you reach out to us, you won&apos;t be
          passed through layers of sales person and  managers.
        </p>
      </div>

      {/* GET IN TOUCH Section */}
      <div className="px-4 mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">GET IN TOUCH</h2>
        
        {/* Info Cards Container */}
        <div className="flex flex-col md:flex-row justify-center gap-6 max-w-4xl mx-auto mb-16">
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg flex items-start gap-4 flex-1 border border-white/10">
            <div className="w-10 h-10 flex items-center justify-center opacity-60">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium mb-1">Office Location</h3>
              <p className="text-sm text-gray-400">Remote Worldwide</p>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg flex items-start gap-4 flex-1 border border-white/10">
            <div className="w-10 h-10 flex items-center justify-center opacity-60">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium mb-1">Working Hours</h3>
              <p className="text-sm text-gray-400">24/7</p>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg flex items-start gap-4 flex-1 border border-white/10">
            <div className="w-10 h-10 flex items-center justify-center opacity-60">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium mb-1">Communication</h3>
              <p className="text-sm text-gray-400">Support 24/7</p>
            </div>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="flex flex-col-reverse lg:flex-row max-w-6xl mx-auto gap-8">
          {/* Contact Form */}
          <div className="lg:w-1/2">
            <ContactForm />
          </div>

          {/* Spline Animation */}
          <div className="lg:w-1/2 h-[400px] lg:h-[500px] relative">
            <ContactSpline />
          </div>
        </div>
      </div>
    </div>
  );
}