/* eslint-disable no-unused-vars */
import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
// const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/auth" : "/api/auth";
const API_URL = import.meta.env.VITE_API_BASE_URL;

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: !!localStorage.getItem("token"),
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async ({ name, email, phone, password, password_confirmation }) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        name,
        email,
        phone,
        password,
        password_confirmation,
      });
  console.log(response)
      set({
        user: response?.data.userid,
        isAuthenticated: false,
        message: response.data.message,
        isLoading: false,
      });
  
      toast.success("Signup successful! Please verify your email."); // Show success toast
      return response.data.userid;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error signing up";
      set({ error: errorMessage, isLoading: false });
  
      toast.error(errorMessage); // Show error toast
      throw error;
    }
  },
  

verifyEmail: async (otp, userid) => {
  set({ isLoading: true, error: null });
  try {
    const response = await axios.post(`${API_URL}/verifyotp`, {
      otp,
      userid,
    });
    set({
      user: response.data.userid,
      isAuthenticated: false,
      isLoading: false,
    });

    toast.success("Email verified successfully!"); // Success feedback
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to verify email. Please try again.";
    set({ error: errorMessage, isLoading: false });
    toast.error(errorMessage); // Error feedback
    throw error;
  }
},
login: async (email, password) => {
    set({ isLoading: false, error: null });
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password,
        });
        console.log(response);
        const { token, userid } = response.data;

        
        localStorage.setItem("token", token);
        localStorage.setItem("userid", userid);
        
        // Display success toast
        toast.success("Login successful! Redirecting...");
        
        console.log(token, userid);
        set({
            isAuthenticated: true,
            user: userid,
            error: null,
            isLoading: false,
        });
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Error logging in";
        set({
            error: errorMessage,
            isLoading: false,
        });

        // Display error toast
        toast.error(errorMessage);
        throw error;
    }
},
  getUserProfile : async () => {
    try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        const userid = localStorage.getItem("userid"); // Retrieve userid from localStorage

        if (!token || !userid) {
            throw new Error("Authentication details are missing");
        }

        const response = await axios.post(
            `${API_URL}/getuserprofile`,
            { userid },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Add token in Authorization header
                },
            }
        );

        if (response.data?.response) {
            return response.data.userdetails; // Return user details
        } else {
            throw new Error("Failed to fetch user profile");
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
},
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      // Retrieve token from local storage
      const token = localStorage.getItem("token");
      console.log(token);
      // Send the logout request to the API
      const response = await axios.post(
        `${API_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to the header
          },
        }
      );
      if (response.status === 200) {
        // Clear user data, token, and reset state after successful logout
        localStorage.removeItem("token"); // Clear token from local storage
        set({
          user: null,
          isAuthenticated: false,
          error: null,
          isLoading: false,
        });
      }
    } catch (error) {
      // Set error if logout request fails, but still clear token and user data
      set({ error: "Error logging out", isLoading: false });
    } finally {
      // Ensure that token and sensitive data are cleared regardless of logout request success
      localStorage.removeItem("token");
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error.response.data.message || "Error sending reset password email",
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        password,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error resetting password",
      });
      throw error;
    }
  },
  submitBankDetails: async (formData) => {
    const dataToSend = {
      userid: formData.userId,
      bankname: formData.bankName,
      accountnumber: formData.accountNumber,
      accountname: formData.accountName,
      bankcode: formData.bankCode,
    };
    console.log(dataToSend);
    // Retrieve token from local storage
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${API_URL}/completeprofile`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to the header
          },
        }
      );

      if (response.data.response) {
        toast.success("Bank details submitted successfully!");
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      toast.error("Error submitting bank details:", error);
      alert("An error occurred. Please try again.");
    }
  },
}));
