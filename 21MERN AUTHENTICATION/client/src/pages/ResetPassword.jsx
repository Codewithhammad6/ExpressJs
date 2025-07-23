import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useStore from "../store/userStore";


const ResetPassword = () => {
  const { token } = useParams();
  const { resetPassword, loading } = useStore();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  await resetPassword(token, newPassword,confirmPassword);

  setNewPassword("");
  setConfirmPassword("");
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-gray-200">
        <form onSubmit={handleSubmit} className="card-body space-y-5">
          <h2 className="text-3xl font-bold text-center text-purple-700">
            Reset Password
          </h2>
          <p className="text-center text-sm text-gray-500">
            Enter and confirm your new password below.
          </p>

          {/* New Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">New Password</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full font-semibold tracking-wide"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
