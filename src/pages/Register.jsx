import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';

    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Phone number must be 10 digits';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (!formData.role) newErrors.role = 'Role is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
     try{
      const response = await axios.post("http://localhost:8080/api/auth/register",formData);
      const data = response.data;

      console.log("Registration successful", data);
      console.log(data);
      
      toast.success("Registration successful!",{position: "top-center",});
      navigate('/login')

      if (response.status === 200) {
        // Reset form data after successful registration
        setFormData({firstName: "",lastName: "",email: "",password: "", role: "",});
      }

    } catch (error) {
      console.error("Registration failed:",error.response?.data || error.message)
      toast.error("Registration failed:" + error.response?.data || error.message,{position: "top-center",})
    };
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
        <Navbar/>
            <div className="min-h-screen flex items-center justify-center bg-blue-50">
    <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md border border-blue-200">
      <h2 className="text-2xl font-semibold text-blue-600 text-center mb-6">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="companyName"
          placeholder="Company Name"
          onChange={handleChange}
          className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div>
          <input
            name="email"
            placeholder="Email *"
            onChange={handleChange}
            className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <input
            name="phoneNumber"
            placeholder="Phone Number *"
            onChange={handleChange}
            className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password *"
            onChange={handleChange}
            className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div>
          <select
            name="role"
            onChange={handleChange}
            className="w-full p-2 border border-blue-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Role *</option>
            <option value="operator">Operator</option>
            <option value="user">User</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Register
        </button>
      </form>

      <p className="text-center text-sm mt-4">
        Already signed up?{' '}
        <a href="/login" className="text-blue-500 hover:underline">
          Login here
        </a>
      </p>
    </div>
  </div>
    </div>
  );
}