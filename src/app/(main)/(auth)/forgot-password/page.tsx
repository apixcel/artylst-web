"use client";

import { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setMessage("Password reset link sent to your email.");
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center text-white">
      <div className="rounded-2xl bg-white/5 border border-white/10 p-6 shadow-lg max-w-md w-full">
        <h1 className="text-2xl text-center font-bricolage-grotesque">Forgot Password</h1>
        <p className="text-sm text-muted text-center mt-1">
          Enter your registered email to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Email */}
          <label className="block">
            <span className="text-sm text-muted">Email</span>
            <div className="relative mt-1">
              <input
                className="w-full bg-white/10 border border-white/10 focus:outline-none focus:ring-1 focus:ring-light rounded-xl pl-10 pr-4 py-2.5 placeholder-white/40"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="admin@artylst.com"
                required
              />
              {/* mail icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-2.5 h-5 w-5 text-white/50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5v10.5a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V6.75Zm0 0L12 12l8.25-5.25"
                />
              </svg>
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2.5 rounded-xl bg-brand-4/80 hover:bg-brand-4/70 text-sm font-medium"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          {message && <p className="text-sm text-center mt-3 text-white/70">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
