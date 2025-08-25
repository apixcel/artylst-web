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
        <h1 className="text-2xl text-center">Forgot Password</h1>
        <p className="text-sm text-white/70 text-center mt-1">
          Enter your registered email to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <label className="block">
            <span className="text-sm text-white/70">Email</span>
            <div className="relative mt-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#5B3FFF]/40 rounded-xl px-4 py-2.5 placeholder-white/40"
                placeholder="admin@artylst.com"
                required
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2.5 rounded-xl bg-[#5B3FFF] hover:bg-[#4A33D0] shadow-[0_10px_40px_rgba(91,63,255,.35)] text-sm font-medium disabled:opacity-50"
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
