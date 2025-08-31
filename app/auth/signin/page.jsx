// /app/auth/login/page.jsx
"use client";

import { signIn, signOut } from "next-auth/react";

// You can add a loading state and icons for a better UX
export default function LoginPage() {
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  const handleGoogleSignOut = () => {
    signOut("google", { callbackUrl: "/" });
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden w-full max-w-sm sm:max-w-md lg:max-w-lg p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Sign in to your account to continue.
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="you@example.com"
              className="block w-full px-4 py-2.5 text-base text-gray-900 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="••••••••"
              className="block w-full px-4 py-2.5 text-base text-gray-900 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div className="flex items-center justify-between">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:text-blue-500 transition"
            >
              Forgot password?
            </a>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 rounded-xl shadow-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="relative py-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={handleGoogleSignIn}
            className="cursor-pointer hover:shadow-sm w-full py-2.5 px-4 rounded-xl border border-gray-300 flex items-center justify-center space-x-2 hover:bg-gray-50 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12.24 10.285V14.4H17.476C17.214 15.939 16.34 17.159 15.214 17.915L18.497 20.378C19.982 19.006 20.84 17.069 21.328 14.898H12.24V10.285Z"
                fill="#4285F4"
              />
              <path
                d="M12.24 21.614C9.537 21.614 7.23 20.73 5.41 19.349L8.72 16.892C9.547 17.456 10.638 17.8 12.24 17.8C14.717 17.8 16.438 16.38 17.24 14.898L20.523 17.36C19.337 19.362 16.83 21.614 12.24 21.614Z"
                fill="#34A853"
              />
              <path
                d="M5.41 19.349L2.127 16.892C1.192 15.632 0.5 14.07 0.5 12.24C0.5 10.41 1.192 8.848 2.127 7.588L5.41 5.13C4.547 6.138 4.0 7.575 4.0 9.24C4.0 10.905 4.547 12.342 5.41 13.35L8.72 15.807C7.23 16.994 5.926 18.067 5.41 19.349Z"
                fill="#FBBC05"
              />
              <path
                d="M21.328 14.898H24.5V10.285H21.328C20.84 8.114 19.982 6.177 18.497 4.805L15.214 7.268C16.34 8.024 17.214 9.244 17.476 10.776H12.24V14.898H21.328Z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-sm font-medium text-gray-700">Google</span>
          </button>
          <button className="cursor-pointer hover:shadow-sm w-full py-2.5 px-4 rounded-xl border border-gray-300 flex items-center justify-center space-x-2 hover:bg-gray-50 transition">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.505 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22.09c4.781-.75 8.438-4.887 8.438-9.878Z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Facebook</span>
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-500 transition"
            >
              Create an account
            </a>
          </p>
        </div>
      </div>
      {/* <button
        onClick={handleGoogleSignIn}
        className="mb-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
      >
        <span>Sign in with Google</span>
      </button>
      <button
        onClick={handleGoogleSignOut}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
      >
        <span>Sign out with Google</span>
      </button> */}
    </div>
  );
}
