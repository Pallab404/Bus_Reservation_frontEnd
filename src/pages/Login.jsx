import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';

    if (!formData.password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      
      try {
      const response = await axios.post("http://localhost:8080/api/auth/login",formData);
      const data = response.data;

      if (response.status === 200 && response.data.token) {

        // Store the token in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("User2",JSON.stringify(data));
        console.log("Login successful!",(data));
        console.log(data);
        
        
        toast.success("Login successful!",{position: "top-center",});

        if(data.role == "USER")
          navigate('/user')
        else
          navigate('/operator')
          
      } else {
        console.log("Login failed. Please check your credentials.");
        toast.warning("Login failed. Please check your credentials.",{position: "top-center",});
      }
    } catch (error) {
        console.error("Login error:",error.response?.data || error.message)
        toast.error(error.response?.data || error.message, {position: "top-center",});
    }
    }
  };

  return (
    <div>
        <Navbar/>
            <div className="min-h-screen flex items-center justify-center bg-blue-50">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md border border-blue-200">
                <h2 className="text-2xl font-semibold text-blue-600 text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                    <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div className="text-right">
                    <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                    Forgot password?
                    </a>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                >
                    Login
                </button>
                </form>

                <p className="text-center text-sm mt-4">
                Don’t have an account?{' '}
                <a href="/" className="text-blue-500 hover:underline">
                    Register here
                </a>
                </p>
            </div>
            </div>
    </div>
  );
}