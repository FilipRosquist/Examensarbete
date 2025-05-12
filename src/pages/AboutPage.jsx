import React from 'react';
import { assets } from '../assets/assets';
import Navbar from '../components/Navbar2'; // Your Navbar component
import Footer from '../components/Footer'; // Your Footer component
import { WorkTeam } from '../assets/assets';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* About Section */}
      <div className="flex flex-col items-center justify-center container mx-auto p-14 md:px-20 lg:px-32 w-full flex-grow" id="About">
        <h1 className="text-2xl sm:text-4xl font-bold mb-2 flex items-center gap-2">
          About <img src={assets.logoPanEl} alt="Pan-El Logo" className="h-[1em] w-auto" />
        </h1>
        <p className="text-gray-500 max-w-80 text-center mb-8">
          Passionate About Solar Powered Energy, Dedicated For A Green Future
        </p>

        <div className="flex flex-col md:flex-row md:items-center gap-10 w-full">
          <div className="w-full md:w-1/2">
            <img
              src={assets.AboutImage}
              className="w-full max-w-2xl rounded-lg shadow-md mx-auto md:mx-0"
              alt="About Pan-El"
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-gray-600">
            <div className="grid grid-cols-2 gap-6 md:gap-10 w-full">
              <div>
                <p className="text-4xl font-semibold text-gray-800">10+</p>
                <p>Years of Experience</p>
              </div>
              <div>
                <p className="text-4xl font-semibold text-gray-800">150+</p>
                <p>Completed Installations</p>
              </div>
              <div>
                <p className="text-4xl font-semibold text-gray-800">5+</p>
                <p>Solar Packages</p>
              </div>
              <div>
                <p className="text-4xl font-semibold text-gray-800">25+</p>
                <p>Ongoing Projects</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-gray-700 space-y-6 mt-10 w-full">
          <p>
            <strong>Pan-El</strong> was founded with a clear vision: to revolutionize how people consume and produce energy.
            We believe in a world where renewable power is accessible, reliable, and affordable for everyone. Our mission is
            to harness the power of the sun to create a cleaner, more sustainable planet for future generations.
          </p>
          <p>
            Over the past decade, Pan-El has grown into a trusted name in the solar energy industry, delivering customized
            solutions for homeowners, businesses, and communities. We offer a wide range of solar panel packages that are
            designed to meet diverse energy needs — whether you're looking to power your home, reduce business operating costs,
            or transition to off-grid living.
          </p>
          <p>
            Our team consists of highly trained engineers, electricians, and project managers who are passionate about renewable energy.
            From consultation and design to installation and maintenance, we work closely with our clients every step of the way to ensure
            seamless integration and maximum efficiency.
          </p>
          <p>
            What sets us apart is our commitment to quality, innovation, and integrity. We use only the highest-grade components,
            backed by industry-leading warranties, and we stay ahead of trends through continuous research and development.
            Every panel we install is a step toward a greener, more independent future.
          </p>
          <p>
            At Pan-El, we don’t just install solar systems — we empower communities to take control of their energy future.
            By reducing reliance on fossil fuels and lowering energy costs, our projects create both environmental and economic
            impact.
          </p>
          <p>
            Join us on our journey to light the world with clean, renewable energy. Together, we can make a difference — one rooftop at a time.
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
