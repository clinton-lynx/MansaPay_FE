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
          console.log(paymentData);
          await createPaymentLink(paymentData); // Await the store function
      
          // Get the updated state from the payment store
          const { formId, error } = usePaymentStore.getState();
          console.log(formId);
          if (formId) {
              setPaymentLink(`http://localhost:5173/pay/${formId}`); // Adjust this URL accordingly
              toast.success("Payment link created successfully!");
      
              // Reset the form inputs
              setFormData({
                  title: '',
                  description: '',
                  amount: '',
                  dueDate: '',
              });
          } else if (error) {
              toast.error("Failed to create payment link. Please try again.");
          }
      };
      
        return (
            <div className="container mx-auto py-10 px-4">
            <div className="bg-blue-50 rounded-lg shadow-md p-8 lg:p-12 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
                Create Payment Link
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-blue-600 font-medium mb-2">Link Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
          
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-blue-600 font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Optional"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
          
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-blue-600 font-medium mb-2">Amount (₦)</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
          
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-blue-600 font-medium mb-2">Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
          
                <div className="col-span-2 flex flex-row-reverse justify-between items-center">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                    disabled={loading}
                  >
                    {loading ? "Creating Link..." : "Create Link"}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition"
                    onClick={() => navigate("/dashboard")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
          
              {paymentLink && (
                <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-blue-600 mb-4">Payment Link:</h3>
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={paymentLink}
                      readOnly
                      className="flex-grow p-3 border border-gray-300 rounded-lg"
                    />
                    <button
                      onClick={() => navigator.clipboard.writeText(paymentLink)}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                    >
                      Copy Link
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
              );
    };

    export default CreatePaymentLink;



