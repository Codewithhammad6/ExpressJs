import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useStore from "../store/userStore";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { forgotPassword, loading } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await forgotPassword(email);
    if (success) {
      setSent(true); 
      toast.success("Reset link sent!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="card w-full max-w-md shadow-xl border border-gray-200 bg-base-100">
        <div className="card-body space-y-5">
          <h2 className="text-3xl font-bold text-center">Forgot Password</h2>

          {!sent ? (
            <>
              <p className="text-center text-sm text-gray-500">
                Enter your email to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-sm font-semibold">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full mt-2 tracking-wide font-semibold"
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-4">
              <h3 className="text-lg text-green-600 font-semibold">Check your email</h3>
              <p className="text-sm text-gray-500">
                A password reset link has been sent to your email. Please follow the instructions to reset your password.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="btn btn-outline btn-primary mt-4"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
