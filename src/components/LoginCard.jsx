import React from 'react';
import Lottie from 'lottie-react'; // Correct Lottie import
import animationData from './Image.json'; // Ensure the path to your JSON file is correct

function LoginCard({ title }) {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-8">
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            {/* Lottie Animation */}
            <Lottie animationData={animationData} className="w-full h-auto" />
          </div>
          <div className="w-full lg:w-1/3">
            <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
            <form>
              <div className="flex items-center justify-center mb-4"></div>

              {/* Email input */}
              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  className="form-input w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Enter a valid email address"
                />
                <label className="block text-gray-700 mt-2" htmlFor="email">
                  Email address
                </label>
              </div>

              {/* Password input */}
              <div className="mb-4">
                <input
                  type="password"
                  id="password"
                  className="form-input w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Enter password"
                />
                <label className="block text-gray-700 mt-2" htmlFor="password">
                  Password
                </label>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <label htmlFor="remember" className="ml-2 text-gray-700">
                    Remember me
                  </label>
                </div>
                <a href="#!" className="text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              <div className="text-center lg:text-left mt-4 pt-2">
                <button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
                >
                  Login
                </button>
                <p className="text-sm font-medium mt-3">
                  Don't have an account?{' '}
                  <a href="#!" className="text-red-600 hover:underline">
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer icons */}
      <div className="space-x-4 mt-4">
        <a href="#!" className="hover:text-gray-300">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#!" className="hover:text-gray-300">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#!" className="hover:text-gray-300">
          <i className="fab fa-google"></i>
        </a>
        <a href="#!" className="hover:text-gray-300">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
    </section>
  );
}

export default LoginCard;
