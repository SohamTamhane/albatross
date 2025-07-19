import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    toast.success("Form Submitted Successfully!!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-opacity-80 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-black rounded-lg p-6 w-[400px] relative">
        <button className="absolute top-2 right-3 text-white text-xl" onClick={onClose}>×</button>
        <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            className="w-full border p-2 rounded"
            rows="3"
            onChange={handleChange}
            required
          />
          <button type="submit" className="bg-[#0047E2] text-white w-full py-2 rounded cursor-pointer">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
