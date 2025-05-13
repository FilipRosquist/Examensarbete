import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import Navbar from '../components/Navbar2'; // Adjust path as necessary
import Footer from '../components/Footer'; // Adjust path as necessary

const ContactPage = () => {
  const [result, setResult] = useState("");
  const [workTeam, setWorkTeam] = useState([]);
  const [error, setError] = useState("");

  // Fetch work team data from the backend
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/team'); // Your API endpoint to fetch team data
        if (!response.ok) {
          throw new Error('Failed to fetch team data');
        }
        const data = await response.json();
        setWorkTeam(data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch team data');
      }
    };

    fetchTeamData();
  }, []);

  // Handle form submission
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "517cc7d2-4f95-4750-8e26-ba5465885b3f");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("");
        toast.success("Form Submitted Successfully");
        event.target.reset();
      } else {
        console.log("Error", data);
        toast.error(data.message);
        setResult("");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while submitting the form.");
      setResult("");
    }
  };

  return (
    <div>
      <Navbar />

      <div className='text-center p-6 py-20 lg:px-32 w-full overflow-hidden' id='Contact'>
        <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>
          Contact <span className='underline underline-offset-4 decoration-1 font-light'>Us!</span>
        </h1>
        <p className='text-center text-gray-500 mb-12 max-w-80 mx-auto'>
          Ready for a greener future? <br /> Send us an email!
        </p>

        <form onSubmit={onSubmit} className='max-w-2xl mx-auto text-gray-600 pt-8'>
          <div className='flex flex-wrap'>
            <div className='w-full md:w-1/2 text-left'>
              Your Name
              <input
                className='w-full border border-gray-300 rounded py-3 px-4 mt-2'
                type="text"
                name='Name'
                placeholder='Your Name'
                required
              />
            </div>

            <div className='w-full md:w-1/2 text-left md:pl-4'>
              Your Email
              <input
                className='w-full border border-gray-300 rounded py-3 px-4 mt-2'
                type="email"
                name='Email'
                placeholder='Your Email'
                required
              />
            </div>
          </div>

          <div className='my-6 text-left'>
            Message
            <textarea
              className='w-full border border-gray-300 rounded py-3 px-4 mt-2 h-48 resize-none'
              name="Message"
              placeholder='Your Message'
              required
            ></textarea>
          </div>

          <button className='bg-blue-800 text-white py-2 px-12 mb-10 rounded'>
            {result ? result : "Send Message"}
          </button>
        </form>

    <div className="w-full mt-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-4xl font-bold mb-6 text-center">
        Our <span className="underline underline-offset-4 decoration-1 font-light">Team</span>
      </h2>
      <div className="flex justify-center gap-6">
        {workTeam.length > 0 ? (
          workTeam.map((member) => (
            <div
              key={member.id}
              className="w-72 h-96 bg-white text-center rounded-lg shadow-lg p-6 flex flex-col items-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-40 h-40 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>
              <p className="text-sm text-gray-500">{member.email}</p>
              <p className="text-sm text-gray-500">{member.phone}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No team members available.</p>
        )}
      </div>
    </div>






      </div>

      <Footer />

      {/* Toast Container to display toasts */}
      <ToastContainer />
    </div>
  );
};

export default ContactPage;
