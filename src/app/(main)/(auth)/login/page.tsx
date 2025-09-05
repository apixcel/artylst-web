"use client";
import Link from "next/link";
import { useState } from "react";

const Login = () => {
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="rounded-2xl bg-gradient-to-b from-brand-2/10 to-brand-1/10 border border-white/10 p-6 max-w-md w-full">
      <h1 className="text-2xl text-center">Log in</h1>
      <p className="text-sm text-muted text-center">
        Use your account email and password
      </p>

      <form className="mt-5 space-y-4">
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

        {/* Password */}
        <label className="block">
          <span className="text-sm text-white/70">Password</span>
          <div className="relative mt-1">
            <input
              className="w-full bg-white/10 border border-white/10 focus:outline-none focus:ring-1 focus:ring-light rounded-xl pl-10 pr-12 py-2.5 placeholder-white/40"
              type={showPw ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              required
            />
            {/* lock icon */}
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
                d="M7 10V8a5 5 0 1 1 10 0v2m-9 0h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z"
              />
            </svg>
            {/* show/hide toggle */}
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/70 hover:text-white"
            >
              {showPw ? "Hide" : "Show"}
            </button>
          </div>
        </label>

        {/* Extras row */}
        <div className="flex items-center justify-between">
          <label className="text-xs text-white/70 inline-flex items-center gap-2 select-none">
            <input
              type="checkbox"
              className="accent-brand-4 bg-white/10 border-white/20 rounded"
            />
            Remember me
          </label>
          <Link
            href="/forgot-password"
            className="text-sm text-white/70 hover:text-white underline underline-offset-4"
          >
            Forgot password?
          </Link>
        </div>

        {/* CTA */}
        <button
          type="submit"
          className="w-full px-4 py-2.5 rounded-xl bg-brand-4/80 hover:bg-brand-4/70 text-sm font-medium"
        >
          Continue
        </button>

        {/* tiny policy line */}
        <p className="text-[11px] text-muted text-center">
          ARTYLST protects your privacy. We never share personal contact info.
        </p>
      </form>
    </div>
  );
};

export default Login;
