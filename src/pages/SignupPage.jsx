import { Navbar } from "../components/SignupNavbar";
import { useState } from "react";
import { useAuthStore } from "../stores/authStore"; // Adjust path
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignupPage = () => {
    const [errors, setErrors] = useState({});
    const [fullname, setFullname] = useState("");  // State for fullname input
    const [email, setEmail] = useState("");  // State for email input
    const [phone, setPhone] = useState("");  // State for phone input
    const [password, setPassword] = useState("");  // State for password input
    const [confirmPassword, setConfirmPassword] = useState("");  // State for confirm password input
    const navigate = useNavigate();  // Initialize the navigate function from react-router-dom
    const [loading, setLoading] = useState(false);  // State to manage loading status

//   const validateForm = async (event) => {
//     console.log("Loading state:", loading);  // Check if this is being set correctly

//       event.preventDefault();
//       const newErrors = {};

//     // Validate inputs
//     if (!fullname) newErrors.fullname = "Full Name is required";
//     if (!email) newErrors.email = "Email is required";
//     if (!phone) newErrors.phone = "Phone Number is required";
//     if (!password) newErrors.password = "Password is required";
//     if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";

//     setErrors(newErrors);
//     setLoading(true);  // Show loading indicator
//     console.log("Loading state:", loading);  // Check
//     // If no errors, proceed with signup
//     if (Object.keys(newErrors).length === 0) {
//         setLoading(true);  // Show loading indicator
//         console.log("Loading state:", loading);  // Check if this is being set correctly

//         try {
//         const signup = useAuthStore.getState().signup;
//         const userid = await signup({
//           name: fullname,
//           email: email,
//           phone: phone,
//           password: password,
//           password_confirmation: confirmPassword,
//         });

//         if (userid) {
//             localStorage.setItem("userid", userid);
//             toast.success("Account created! Please verify your email.");
//             navigate("/verify-email");
            
// toast.success("Signup successful! Please verify your email.");  // Show success toast
// // Clear input fields after successful signup
// setFullname("");
// setEmail("");
// setPhone("");
// setPassword("");
// setConfirmPassword("");
//         } else {
//             console.log("User ID was not returned, check the signup response.");
//             toast.error("Unexpected error. Please try again.");
//         }




//       } catch (error) {
//         console.error("Signup error:", error);
//         setErrors({
//           server: error?.response?.data?.message || "Signup failed",
//         });
//       } finally {
//         setLoading(false);  // Hide loading indicator after the process completes
//       }
//     }
//   };


const validateFields = () => {
  const validationErrors = {};

  // Validate inputs
  if (!fullname.trim()) validationErrors.fullname = "Full Name is required.";
  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) validationErrors.email = "Email is required.";
  else if (!emailPattern.test(email)) validationErrors.email = "Please enter a valid email address.";

  if (!phone.trim()) validationErrors.phone = "Phone number is required.";

  if (!password) validationErrors.password = "Password is required.";
  else if (password.length < 8) validationErrors.password = "Password must be at least 8 characters long.";

  if (password !== confirmPassword) validationErrors.confirmPassword = "Passwords do not match.";

  setErrors(validationErrors);
  return Object.keys(validationErrors).length === 0;
};

const handleSignUp = async (event) => {
    event.preventDefault();
    console.log("hit");
    
    
    // Run validation before proceeding
    if (!validateFields()) {
        toast.error("Please fill out all required fields correctly.");
        return;
    }
    
    setLoading(true);  // Show loading indicator
    // return console.log("red");
    setTimeout(() => {
    try {
    
    const signup = useAuthStore.getState().signup;
    const userid =  signup({
      name: fullname,
      email: email,
      phone: phone,
      password: password,
      password_confirmation: confirmPassword
    });

    if (userid) {
      localStorage.setItem("userid", userid);
      toast.success("Account created! Please verify your email.");
      navigate("/verify-email");

      // Clear input fields after successful signup
    //   setFullname("");
    //   setEmail("");
    //   setPhone("");
    //   setPassword("");
    //   setConfirmPassword("");
    } else {
      console.log("User ID was not returned, check the signup response.");
      toast.error("Unexpected error. Please try again.");
    }
  } catch (error) {
    console.error("Signup error:", error);
    setErrors({
      server: error?.response?.data?.message || "Signup failed",
    });
  } finally {
    setLoading(false);  // Hide loading indicator after the process completes
  }
}, 5000);  // Delay of 5 seconds
};
    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="flex flex-col md:flex-row min-h-screen font-poppins">
                <div className="flex-1 flex items-center justify-center p-6">
                    <form
                        className="w-full max-w-md text-base md:text-sm"
                        onSubmit={handleSignUp}
                    >
                        <h1 className="font-bold text-2xl md:text-4xl mb-6 capitalize">
                            Get the best crowdfunding experience.
                        </h1>
                        <div className="mb-2">
                            <label
                                className="block text-gray-700 text-sm md:text-base mb-2"
                                htmlFor="fullname"
                            >
                                Full Name
                            </label>
                            <input
                                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.fullname ? "border-red-500" : "border-gray-300"
                                }`}
                                id="fullname"
                                type="text"
                                placeholder="Full Name"
                                value={fullname}  // Set value to state
                                onChange={(e) => setFullname(e.target.value)}  // Update state on change
                            />
                            {errors.fullname && (
                                <p className="text-red-500 text-xs md:text-sm italic">
                                    {errors.fullname}
                                </p>
                            )}
                        </div>
                        <div className="mb-2">
                            <label
                                className="block text-gray-700 text-sm md:text-base mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.email ? "border-red-500" : "border-gray-300"
                                }`}
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={email}  // Set value to state
                                onChange={(e) => setEmail(e.target.value)}  // Update state on change
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs md:text-sm italic">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                        <div className="mb-2">
                            <label
                                className="block text-gray-700 text-sm md:text-base mb-2"
                                htmlFor="phone"
                            >
                                Phone Number
                            </label>
                            <input
                                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.phone ? "border-red-500" : "border-gray-300"
                                }`}
                                id="phone"
                                type="tel"
                                placeholder="Phone Number"
                                value={phone}  // Set value to state
                                onChange={(e) => setPhone(e.target.value)}  // Update state on change
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-xs italic">{errors.phone}</p>
                            )}
                        </div>
                        <div className="mb-2">
                            <label
                                className="block text-gray-700 text-sm mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.password ? "border-red-500" : "border-gray-300"
                                }`}
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={password}  // Set value to state
                                onChange={(e) => setPassword(e.target.value)}  // Update state on change
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs italic">{errors.password}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm  mb-2"
                                htmlFor="confirmPassword"
                            >
                                Confirm Password
                            </label>
                            <input
                                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                                }`}
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}  // Set value to state
                                onChange={(e) => setConfirmPassword(e.target.value)}  // Update state on change
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs italic">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center justify-between">
                              {/* Signup Button */}
      <button
        className="bg-blue-500 text-sm hover:bg-blue-700 text-white py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="submit"
        disabled={loading}  // Disable button when loading
      >
        {loading ? "Signing Up..." : "Sign Up"} {/* Display loading text */}
      </button>
</div>
      {/* Display server error message if any */}
      {errors.server && <p>{errors.server}</p>}
                        <p className="mt-2 text-center text-gray-600">
                            Already have an account?{" "}
                            <a
                                href="/login"
                                className="text-blue-500 hover:text-blue-700"
                            >
                                Login
                            </a>
                        </p>
                    </form>
                </div>
                <div className="flex-1   items-center justify-center p-6 bg-gray-100 hidden md:flex">
                    <img
                        src="/signup_illustration.png"
                        alt="Signup"
                        className="max-w-full h-auto"
                    />
                </div>
            </div>
        </>
    );
};

export default SignupPage;
