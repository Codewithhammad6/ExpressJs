import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useStore from "../store/userStore";
import toast from "react-hot-toast";

function OTPVerification() {
  const { email, phone } = useParams();
  const { verifyOTP, getUser } = useStore();
  const navigate = useNavigate();

  const inputsRef = useRef([]);
const [otp, setOtp] = useState(new Array(5).fill(""));


  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < 5) {
      return toast.error("Please enter complete 5-digit OTP");
    }

    const res = await verifyOTP({ email, phone, otp: code });
    if (res.success) {
      await getUser();
      // toast.success("OTP Verified!");
      navigate("/");
    } else {
      toast.error("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Verify OTP</h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Enter the 6-digit code 
        </p>

        <div className="flex justify-between gap-2 mb-6 px-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength={1}
              ref={(el) => (inputsRef.current[index] = el)}
              className="w-12 h-12 border border-gray-300 text-center text-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"

            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          className="w-full bg-blue-600 text-white py-2 text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}

export default OTPVerification;
