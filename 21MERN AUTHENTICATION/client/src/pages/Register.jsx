import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../store/userStore';
import { useNavigate } from 'react-router-dom';

function Register() {
  const { register } = useStore();
const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+92',
    password: '',
    verificationMethod: 'email',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Always keep +92 and allow only digits after it
      if (!value.startsWith("+92")) return;

      const numericPart = value.slice(3).replace(/\D/g, "");
      setFormData((prev) => ({
        ...prev,
        phone: "+92" + numericPart,
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await register(formData);

    if (result?.success) {
      const { email, phone } = formData;
      setFormData({
        name: '',
        email: '',
        phone: '+92',
        password: '',
        verificationMethod: 'email',
      });
  navigate(`/otp-verification/${encodeURIComponent(email)}/${encodeURIComponent(phone)}`);
    }

    // Do not reset form if there's an error
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-900 pt-20">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2"
            value={formData.name}
            onChange={handleChange}
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            required={formData.verificationMethod === 'email'}
            disabled={formData.verificationMethod !== 'email'}
            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Phone */}
          <input
            type="text"
            name="phone"
            placeholder="+923001234567"
            maxLength={13}
            required={formData.verificationMethod === 'phone'}
            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none"
            value={formData.phone}
            onChange={handleChange}
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none"
            value={formData.password}
            onChange={handleChange}
          />
<label>Send OTP :</label>
          {/* Verification Method */}
          <div className="flex mt-3 items-center gap-4">
            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <input
                type="radio"
                name="verificationMethod"
                value="email"
                checked={formData.verificationMethod === 'email'}
                onChange={handleChange}
              />
              Email
            </label>
            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <input
                type="radio"
                name="verificationMethod"
                value="phone"
                checked={formData.verificationMethod === 'phone'}
                onChange={handleChange}
              />
              Phone
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-md disabled:opacity-50"
          >
             {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Register"
                  )}
          </button>
        </form>

        <div className="mt-6 flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <Link to="/login" className="hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
