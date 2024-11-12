import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../stores/authStore";
import toast from "react-hot-toast";
import { Navbar } from "../components/SignupNavbar";

const EmailVerificationPage = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const { error, isLoading, setLoading, verifyEmail } = useAuthStore();

    const handleChange = (index, value) => {
        const newCode = [...code];
        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        } else {
            newCode[index] = value;
            setCode(newCode);
            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join("");
        const userid = localStorage.getItem("userid");

        // Start loading
        setLoading(true);
        try {
            await verifyEmail(verificationCode, userid);
            navigate("/login");
            toast.success("Email verified successfully");
        } catch (error) {
            // Display error message based on status code
            if (error.response && error.response.status === 400) {
                toast.error("Invalid verification code. Please try again.");
            } else {
                toast.error("Invalid verification code. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (code.every((digit) => digit !== "") && code.join("").length === 6) {
            handleSubmit(new Event("submit"));
        }
    }, [code]);

    return (
        <>
            <Navbar />
            <div className='min-h-[85vh] bg-white flex items-center justify-center relative overflow-hidden'>
                <div className='max-w-md w-full rounded-2xl overflow-hidden border-2 border-gray-300'>
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className='p-8 w-full max-w-md'
                    >
                        <h2 className='text-3xl font-bold mb-6 text-center text-black'>
                            Verify Your Email
                        </h2>
                        <p className='text-center text-gray-700 mb-6'>Enter the 6-digit code sent to your email address.</p>

                        <form onSubmit={handleSubmit} className='space-y-6'>
                            <div className='flex justify-between'>
                                {code.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        type='text'
                                        inputMode='numeric'
                                        pattern="[0-9]*"
                                        maxLength='1'
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value.replace(/\D/, ""))}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className='w-12 h-12 text-center text-2xl font-bold bg-white text-black border-2 border-[rgba(209 213 219 1)] rounded-lg focus:border-blue-500 focus:outline-none shadow-md'
                                        aria-label={`Digit ${index + 1}`}
                                    />
                                ))}
                            </div>
                            {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type='submit'
                                disabled={isLoading || code.some((digit) => !digit)}
                                className='w-full bg-[#0069ff] text-white font-bold py-3 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50'
                            >
                                {isLoading ? "Verifying..." : "Verify Email"}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default EmailVerificationPage;