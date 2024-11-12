import { useState } from 'react';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import {usePaymentStore} from '../stores/paymentstore'; // Import payment store

const CreatePaymentLink = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem('userid');
    const { createPaymentLink, loading } = usePaymentStore(); // Get store functions and state
    // const { user } = useAuthStore(); // Get store functions and state
    console.log(user)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        amount: '',
        dueDate: '',
    });
    const [paymentLink, setPaymentLink] = useState(''); // State to hold the generated payment link

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Frontend validation
        if (!formData.title || !formData.amount || isNaN(formData.amount)) {
            toast.error("Please fill in required fields and ensure amount is a number.");
            return;
        }

        // Call the store's createPaymentLink function with form data
        const paymentData = {
            userid: user,
            title: formData.title,
            description: formData.description,
            price: formData.amount,
            dueDate: formData.dueDate,
        };
        console.log(paymentData)
        await createPaymentLink(paymentData); // Await the store function

        // Get the updated state from the payment store
        const { formId, error } = usePaymentStore.getState();
console.log(formId)
        if (formId) {
            setPaymentLink(`http://localhost:5173/dashboard/payment/${formId}`); // Adjust this URL accordingly
            toast.success("Payment link created successfully!");
        } else if (error) {
            toast.error("Failed to create payment link. Please try again.");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-blue-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">Create Payment Link</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-blue-600 font-medium mb-1">Link Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>

                <div>
                    <label className="block text-blue-600 font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                        placeholder="Optional"
                    />
                </div>

                <div>
                    <label className="block text-blue-600 font-medium mb-1">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>

                <div>
                    <label className="block text-blue-600 font-medium mb-1">Due Date</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        disabled={loading} // Disable button when loading
                    >
                        {loading ? "Creating Link..." : "Create Link"}
                    </button>
                    <button
                        type="button"
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                        onClick={() => navigate("/dashboard")}
                    >
                        Cancel
                    </button>
                </div>
            </form>

            {paymentLink && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">Payment Link:</h3>
                    <input
                        type="text"
                        value={paymentLink}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button
                        onClick={() => navigator.clipboard.writeText(paymentLink)}
                        className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                        Copy Link
                    </button>
                </div>
            )}
        </div>
    );
};

export default CreatePaymentLink;
