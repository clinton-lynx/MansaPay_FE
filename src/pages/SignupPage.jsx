import { Navbar } from "../components/SignupNavbar";
import { useState } from "react";
import { useAuthStore } from "../stores/authStore"; // Adjust path

const SignupPage = () => {
    const [errors, setErrors] = useState({});

    const validateForm = async (event) => {
        event.preventDefault();
        const form = event.target;
        const newErrors = {};

        if (!form.fullname.value) newErrors.fullname = "Full Name is required";
        if (!form.email.value) newErrors.email = "Email is required";
        if (!form.phone.value) newErrors.phone = "Phone Number is required";
        if (!form.password.value) newErrors.password = "Password is required";
        if (form.password.value !== form.confirmPassword.value)
            newErrors.confirmPassword = "Passwords do not match";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const signup = useAuthStore.getState().signup;
                const userid = await signup({
                    name: form.fullname.value,
                    email: form.email.value,
                    phone: form.phone.value,
                    password: form.password.value,
                    password_confirmation: form.confirmPassword.value,
                });
            
                // Store userid in localStorage
                localStorage.setItem("userid", userid);
                
                console.log(`Signup successful: ${userid}`);
                
                // Redirect or show success message
            } catch (error) {
                console.error("Signup error:", error);
                setErrors({ server: error?.response?.data?.message || "Signup failed" });
            }
            
        }
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
                        onSubmit={validateForm}
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
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs italic">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 text-sm hover:bg-blue-700 text-white  py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="submit"
                            >
                                Sign Up
                            </button>
                        </div>
                        {errors.server && (
                            <p className="text-red-500 text-xs md:text-sm italic">
                                {errors.server}
                            </p>
                        )}
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
