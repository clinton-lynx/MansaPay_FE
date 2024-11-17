import { useState } from "react";
import { useAuthStore } from "../stores/authStore"; // Import your Zustand store
import { Navbar } from "../components/SignupNavbar";

// const LoginPage = () => {
//     const [errors, setErrors] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [formData, setFormData] = useState({ email: "", password: "" });
//     const login = useAuthStore((state) => state.login); // Access the login function

//     const validateForm = () => {
//         const newErrors = {};
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//         if (!formData.email) newErrors.email = "Email is required";
//         else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format";

//         if (!formData.password) newErrors.password = "Password is required";
//         else if (formData.password.length < 6)
//             newErrors.password = "Password must be at least 6 characters";

//         return newErrors;
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleLogin = async (event) => {
//         event.preventDefault();
//         const newErrors = validateForm();

//         setErrors(newErrors);

//         if (Object.keys(newErrors).length === 0) {
//             // If no errors, proceed with login
//             try {
//                 setLoading(true); // Show loading state
//                 await login(formData.email, formData.password); // Call login function
//                 console.log("Login successful");
//                 // Redirect to dashboard or another page
//                 window.location.href = "/dashboard";
//             } catch (error) {
//                 console.error("Login failed:", error);
//                 setErrors({ server: error?.response?.data?.message || "Login failed" });
//             } finally {
//                 setLoading(false); // Hide loading state
//             }
//         }
//     };

//     return (
//         <>
//             <div>
//                 <Navbar />
//             </div>
//             <div className="flex flex-col md:flex-row min-h-screen font-poppins">
//                 <div className="flex-1 flex items-center justify-center p-6">
//                     <form
//                         className="w-full max-w-md text-base md:text-sm"
//                         onSubmit={handleLogin}
//                     >
//                         <h1 className="font-bold text-2xl md:text-4xl mb-1 capitalize">Welcome Back!</h1>
//                         <p className="text-sm mb-4">Sign into your Mansapay account to continue ✨</p>
//                         <div className="mb-2">
//                             <label className="block text-gray-700 text-sm md:text-base mb-2" htmlFor="email">
//                                 Email
//                             </label>
//                             <input
//                                 className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
//                                 id="email"
//                                 type="email"
//                                 name="email"
//                                 placeholder="Email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                             />
//                             {errors.email && <p className="text-red-500 text-xs md:text-sm italic">{errors.email}</p>}
//                         </div>
//                         <div className="mb-2">
//                             <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
//                                 Password
//                             </label>
//                             <input
//                                 className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
//                                 id="password"
//                                 type="password"
//                                 name="password"
//                                 placeholder="Password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                             />
//                             {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
//                         </div>
//                         <div className="mb-2">
//                             {errors.server && <p className="text-red-500 text-sm italic">{errors.server}</p>}
//                         </div>
//                         <div className="flex items-center justify-between">
//                             <button
//                                 className={`bg-blue-500 text-sm hover:bg-blue-700 text-white py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                 type="submit"
//                                 disabled={loading}
//                             >
//                                 {loading ? "Logging in..." : "Login"}
//                             </button>
//                         </div>
//                         <p className="mt-2 text-center text-gray-600">
//                             Don&apos;t have an account? <a href="/sign-up" className="text-blue-500 hover:text-blue-700">Sign Up</a>
//                         </p>
//                     </form>
//                 </div>
//                 <div className="flex-1 items-center justify-center p-6 bg-gray-100 hidden md:flex">
//                     <img
//                         src="/signup_illustration.png"
//                         alt="Login"
//                         className="max-w-full h-auto"
//                     />
//                 </div>
//             </div>
//         </>
//     );
// };

// export default LoginPage;

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const LoginPage = () => {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const login = useAuthStore((state) => state.login);

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const newErrors = {};

        if (!form.email.value) newErrors.email = "Email is required";
        if (!form.password.value) newErrors.password = "Password is required";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                setLoading(true);
                await login(form.email.value, form.password.value);

                // Notify success
                toast.success("Login successful!");
                
                // Redirect on success
                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 1000); // Add a delay for a smoother transition
            } catch (error) {
                console.error("Login failed:", error);
                toast.error("Login failed. Please try again.");
                setErrors({ server: error.message });
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <div>
                <Navbar />
            </div>
            <div className="flex flex-col md:flex-row min-h-screen font-poppins">
                <div className="flex-1 flex items-center justify-center p-6 relative">
                    {loading && (
                        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                            <div className="loader border-t-blue-500"></div>
                        </div>
                    )}
                    <form
                        className="w-full max-w-md text-base md:text-sm relative"
                        onSubmit={handleLogin}
                    >
                        <h1 className="font-bold text-2xl md:text-4xl mb-1 capitalize">Welcome Back!</h1>
                        <p className="text-sm mb-4">Sign into your Mansapay account to continue ✨</p>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm md:text-base mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Email"
                            />
                            {errors.email && <p className="text-red-500 text-xs md:text-sm italic">{errors.email}</p>}
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Password"
                            />
                            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                        </div>
                        <div className="mb-2">
                            {errors.server && <p className="text-red-500 text-sm italic">{errors.server}</p>}
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className={`bg-blue-500 text-sm hover:bg-blue-700 text-white py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </div>
                        <p className="mt-2 text-center text-gray-600">
                            Don&apos;t have an account? <a href="/signup" className="text-blue-500 hover:text-blue-700">Sign Up</a>
                        </p>
                    </form>
                </div>
                <div className="flex-1 items-center justify-center p-6 bg-gray-100 hidden md:flex">
                    <img
                        src="/signup_illustration.png"
                        alt="Login"
                        className="max-w-full h-auto"
                    />
                </div>
            </div>
        </>
    );
};

export default LoginPage;
