import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const useStore = create((set) => ({
  user: null,
  loading: false,
  isAuth: false,
  loaded: false, //  indicates if user load attempt has completed

  //  Get current user (called on app load)
  getUser: async () => {
    try {
      set({ loading: true });
      const { data } = await axiosInstance.get("/user/me");
      set({ user: data.user, isAuth: true });
    } catch (err) {
      console.log("User fetch failed:", err?.response?.data?.message);
      set({ user: null, isAuth: false });
    } finally {
      set({ loading: false ,loaded: true });
    }
  },

  //  Register
  register: async (formData) => {
    try {
      set({ loading: true });
      const { data } = await axiosInstance.post("/user/register", formData);
      toast.success("OTP sent to your phone!");
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },

  //Verify OTP
  verifyOTP: async (formData) => {
    try {
      set({ loading: true });
      const { data } = await axiosInstance.post("/user/otp-verification", formData);
      toast.success("Account verified successfully!");
      return data;
    } catch (err) {
      toast.error(err?.response?.data?.message || "OTP verification failed");
      return null;
    } finally {
      set({ loading: false });
    }
  },


  // Login
login: async (formData) => {
  try {
    set({ loading: true });
    const { data } = await axiosInstance.post("/user/login", formData);
    set({ user: data.user, isAuth: true });
    toast.success(data.message || "Login successful");
    return { success: true, user: data.user }; // ✅ return full object
  } catch (err) {
    set({ user: null, isAuth: false });
    toast.error(err?.response?.data?.message || "Login failed");
    return { success: false }; 
  } finally {
    set({ loading: false });
  }
},


  //  Logout
  logout: async () => {
    try {
      set({ loading: true });
      await axiosInstance.get("/user/logout");
      set({ user: null, isAuth: false });
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Logout failed");
    } finally {
      set({ loading: false });
    }
  },

  //  Forgot Password
  forgotPassword: async (email) => {
    try {
      set({ loading: true });
      const { data } = await axiosInstance.post("/user/password/forgot", { email });
      toast.success(data.message || "Reset link sent");
      return true; 
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send reset link");
      return false; 
    } finally {
      set({ loading: false });
    }
  },

  // Reset Password
 resetPassword: async (token, newPassword,confirmPassword) => {
  try {
    set({ loading: true });
    const { data } = await axiosInstance.put(`/user/password/reset/${token}`, {
      password: newPassword,
      confirmPassword: confirmPassword,
    });

    toast.success(data.message || "Password reset successful");

    // Auto login after password reset
    set({ user: data.user, isAuth: true });

  } catch (err) {
    toast.error(err?.response?.data?.message || "Reset failed");
  } finally {
    set({ loading: false });
  }
},

}));

export default useStore;
