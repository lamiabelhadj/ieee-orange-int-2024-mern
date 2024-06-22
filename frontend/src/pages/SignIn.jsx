import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5555/api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      window.location.href = '/task-list'; // Navigate to task list after successful login
    } catch (error) {
      setError('Invalid email or password');
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Sign In</h1>
      <form onSubmit={handleSignIn} className="flex flex-col border-2 border-sky-400 rounded-xl p-4 w-fit mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
            required
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4">
          Sign In
        </button>
      </form>
      <p className="mt-4">
        Don't have an account? <Link to="/register" className="text-blue-600">Register here</Link>
      </p>
    </div>
  );
};

export default SignIn;
