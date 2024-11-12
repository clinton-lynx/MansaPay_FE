import { useState } from "react";
import { Navbar } from "../components/SignupNavbar";

const LoginPage = () => {
    const [errors, setErrors] = useState({});

    const validateForm = (event) => {
        event.preventDefault();
        const form = event.target;
        const newErrors = {};

        if (!form.email.value) newErrors.email = "Email is required";
        if (!form.password.value) newErrors.password = "Password is required";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Submit form
        }
    };

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="flex flex-col md:flex-row min-h-screen font-poppins">
                <div className="flex-1 flex items-center justify-center p-6">
                    <form className="w-full max-w-md text-base md:text-sm" onSubmit={validateForm}>
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
                                placeholder="Password"
                            />
                            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 text-sm hover:bg-blue-700 text-white py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="submit"
                            >
                                Login
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
