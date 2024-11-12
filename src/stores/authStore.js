/* eslint-disable no-unused-vars */
import { create } from "zustand";
import axios from "axios";

// const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/auth" : "/api/auth";
const API_URL = "https://cb1f-105-113-111-212.ngrok-free.app/api";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: !!localStorage.getItem("token"),
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async ({ name, email, phone, password, password_confirmation }) => {
    // Updated to match the new structure
    set({ isLoading: true, error: null, message: null }); // Reset message
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        name,
        email,
        phone,
        password,
        password_confirmation,
      });
      console.log(response);
      console.log(response?.data.userid);
      set({
        user: response?.data.userid,
        isAuthenticated: true,
        message: response.data.message,
        isLoading: false,
      });
      return response.data.userid;
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
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
      // Assuming the response includes a message or user data upon successful verification
      set({
        user: response.data.userid,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data; // Return response for further handling
    } catch (error) {
      set({
        error: error.response.data.message || "Error verifying email",
        isLoading: false,
      });
      throw error; // Throw error to be caught in the component
    }
  },
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      console.log(response);
      // Assuming response contains the token and user ID
      const { token, userid } = response.data;

      // Set the user ID and token in state
      set({
        isAuthenticated: true,
        user: userid,
        // token: token,  // You can add a token property in your store
        error: null,
        isLoading: false,
      });

      // Optionally, store the token in localStorage for persistent authentication
      localStorage.setItem("token", token);
      localStorage.setItem("userid", userid);
      console.log(token, userid);
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false,
      });
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
        alert("Bank details submitted successfully!");
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting bank details:", error);
      alert("An error occurred. Please try again.");
    }
  },
}));
