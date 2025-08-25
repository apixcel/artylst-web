"use client";
import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  subject: string;
  requester: string;
  language: string;
  description: string;
}

const SubmitTicketPage = () => {
  const [formData, setFormData] = useState<FormData>({
    subject: "",
    requester: "",
    language: "",
    description: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4">
      <div className="rounded-lg shadow-md w-full max-w-4xl p-8 bg-white/5 border border-white/10">
        {/* Title */}
        <h1 className="text-4xl text-center font-bold mb-8">Submit a ticket</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-1">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              id="subject"
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-white/10 rounded-md px-4 py-2 focus:ring focus:ring-purple-200 focus:border-purple-500 bg-transparent"
              required
            />
          </div>

          {/* Requester */}
          <div>
            <label
              htmlFor="requester"
              className="block text-sm font-medium mb-1"
            >
              Requester <span className="text-red-500">*</span>
            </label>
            <input
              id="requester"
              type="text"
              name="requester"
              value={formData.requester}
              placeholder="Type requester"
              onChange={handleChange}
              className="w-full border border-white/10 rounded-md px-4 py-2 focus:ring focus:ring-purple-200 focus:border-purple-500 bg-transparent"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              placeholder="Type something"
              className="w-full border border-white/10 rounded-md px-4 py-2 focus:ring focus:ring-purple-200 focus:border-purple-500 bg-transparent"
              required
            />
          </div>

          {/* Attachment */}
          <div>
            <label
              htmlFor="attachment"
              className="text-purple-500 text-sm cursor-pointer flex items-center gap-1"
            >
              📎 Attachment
            </label>
            <input
              id="attachment"
              type="file"
              className="hidden"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const files = e.target.files;
                if (files && files[0]) {
                  console.log("Selected file:", files[0]);
                }
              }}
            />
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
              className="px-4 py-2 border border-white/10 rounded-md text-gray-300 hover:bg-gray-600"
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
