
"use client";
import { useState } from "react";
const SubmitTicketPage = () => {
  const [formData, setFormData] = useState({
    subject: "",
    requester: "",
    language: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  return (
    <div className="min-h-screen  flex flex-col items-center py-12 px-4">
      <div className=" rounded-lg shadow-md w-full max-w-4xl p-8 bg-white/5 border border-white/10">
        {/* Title */}
        <h1 className="text-4xl text-center font-bold mb-8">Submit a ticket</h1>

        <form onSubmit={handleSubmit} className="space-y-6 ">
          {/* Subject */}
          <div>
            <label className="block text-sm font-medium  mb-1">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-white/10 rounded-md px-4 py-2 focus:ring focus:ring-purple-200 focus:border-purple-500"
              required
            />
          </div>

          {/* Requester */}
          <div>
            <label className="block text-sm font-medium   mb-1">
              Requester <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="requester"
              value={formData.requester}
               placeholder="Type requester"
              onChange={handleChange}
              className="w-full border border-white/10 rounded-md px-4 py-2 focus:ring focus:ring-purple-200 focus:border-purple-500"
              required
            />
          </div>

    

          {/* Description */}
          <div>
            <label className="block text-sm font-medium   mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              placeholder="Type something"
              className="w-full border border-white/10 rounded-md px-4 py-2 focus:ring focus:ring-purple-200 focus:border-purple-500"
              required
            />
          </div>

          {/* Attachment */}
          <div>
            <a href="#" className="text-purple-500 text-sm hover:underline">
              📎 Attachment
            </a>
          </div>

          {/* reCAPTCHA Placeholder */}
          <div className="flex items-center gap-2">
            <input type="checkbox" id="captcha" className="w-4 h-4" />
            <label htmlFor="captcha" className="text-sm">
              I&apos;m not a robot
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 border border-white/10 rounded-md text-white-600 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitTicketPage;
