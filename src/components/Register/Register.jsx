import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUserAction } from "../../store/Action/actionUser";
import { useDispatch } from "react-redux";

const Register = ({ openLoginModal }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
  
    try {
      // Dispatch the registerUser action
      await dispatch(registerUserAction(formData));
      //console.log(formData);
      
      // Redirect to the dashboard route after successful registration
      // navigate('/login');
      openLoginModal()
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration failure (show error message, etc.)
    }
  };
  
  return (
    <main className="w-70vw h-70vh flex flex-col items-center justify-center px-4 mx-auto">
      <div className="max-w-sm w-full text-gray-600 space-y-5">
        <div className="text-center pb-8">
          <h3 className="text-blue-700 text-2xl font-bold sm:text-3xl">Sign up for an account</h3>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label htmlFor="name" className="font-medium">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
                onChange={handleChange}
                autoComplete="name"
              id="name"
              name="name"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
          <label htmlFor="confirm-password" className="font-medium">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                
              />
          </div>

          {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
          <button
          type="submit"
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            Sign up
          </button>
        </form>
        <p className="text-center">Already have an account? <Link to="" onClick={openLoginModal} className="font-medium text-indigo-600 hover:text-indigo-500">Log in</Link></p>
      </div>
    </main>
  );
};

export default Register;
