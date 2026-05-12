import React from "react";
import { Link } from "react-router-dom";

const AuthLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen flex w-full bg-gray-950 text-white font-sans overflow-hidden">
      {/* Graphic / Branding Side (Hidden on Mobile) */}
      <div
        data-testid="auth-graphic"
        className="hidden lg:flex lg:w-1/2 relative bg-gray-900 items-center justify-center p-12 overflow-hidden"
      >
        <div className="absolute inset-0 z-0 opacity-20">
          {/* Simple CSS grid pattern for aesthetic */}
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(34, 211, 238, 0.4) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-lg text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
          <Link
            to="/"
            className="inline-block text-5xl font-extrabold text-neon-teal mb-6 hover:text-teal-400 transition-colors drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"
          >
            GameGor
          </Link>
          <p className="text-xl text-gray-400 font-light leading-relaxed">
            Your ultimate portal to track, review, and discover your next
            favorite game. Join the community today.
          </p>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="absolute top-8 left-8 lg:hidden">
          <Link
            to="/"
            className="text-2xl font-extrabold text-neon-teal hover:text-teal-400 transition-colors drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]"
          >
            GameGor
          </Link>
        </div>

        <div className="w-full max-w-md bg-gray-900/50 sm:bg-transparent p-6 sm:p-0 rounded-2xl border border-gray-800 sm:border-none shadow-2xl sm:shadow-none animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="mb-8 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
              {title}
            </h1>
            <div className="h-1 w-16 bg-neon-violet rounded-full mx-auto sm:mx-0 shadow-[0_0_10px_rgba(167,139,250,0.5)]"></div>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
