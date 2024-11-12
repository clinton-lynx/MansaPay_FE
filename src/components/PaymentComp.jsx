// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import usePaymentStore from '../stores/paymentstore'; // Import payment store
// import axios from 'axios';

// const PaymentComp = () => {
//     const { formid } = useParams(); // Get formid from route params
//     const { fetchPaymentDetails } = usePaymentStore(); // Function to fetch payment details
//     const [paymentDetails, setPaymentDetails] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [submissionLoading, setSubmissionLoading] = useState(false);
//     const [userData, setUserData] = useState({
//         firstname: '',
//         lastname: '',
//         email: '',
//         phone: '',
//         price: '',
//     });
//     const userid = localStorage.getItem('userid');

//     // const userid = "S4mbu7qcfqEf5Da"; // Replace this with the actual userid from your app's state or context

//     useEffect(() => {
//         const getPaymentDetails = async () => {
//             try {
//                 const details = await fetchPaymentDetails(userid, formid);
//                 setPaymentDetails(details);
//                 setUserData((prevData) => ({
//                     ...prevData,
//                     price: details.price, // Set the initial price from payment details
//                 }));
//             } catch (error) {
//                 console.error("Failed to fetch payment details", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         getPaymentDetails();
//     }, [userid, formid]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setUserData({ ...userData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        

//         setSubmissionLoading(true);
//         try {
//             const response = await axios.post('/completePayment', {
//                 formid,
//                 userid,
//                 ...userData,
//             });

//             if (response.data.response) {
//                 alert('Payment successful!');
//             } else {
//                 alert('Payment failed. Please try again.');
//             }
//         } catch (error) {
//             console.error("Payment error: ", error);
//             alert("An error occurred. Please try again.");
//         } finally {
//             setSubmissionLoading(false);
//         }
//     };

//     if (loading) return <div>Loading...</div>;

//     if (!paymentDetails) {
//         return <div>No payment details found.</div>;
//     }

//     return (
//         <div className="max-w-lg mx-auto p-6 bg-blue-50 rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold text-blue-600 mb-4">Payment Details</h2>
//             <p><strong>Title:</strong> {paymentDetails.title}</p>
//             <p><strong>Description:</strong> {paymentDetails.description}</p>
//             <p><strong>Amount:</strong> {paymentDetails.price}</p>

//             <h3 className="text-xl mt-6 mb-4">Enter Your Details</h3>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <input
//                     type="text"
//                     name="firstname"
//                     placeholder="First Name"
//                     value={userData.firstname}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded"
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="lastname"
//                     placeholder="Last Name"
//                     value={userData.lastname}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded"
//                     required
//                 />
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={userData.email}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded"
//                     required
//                 />
//                 <input
//                     type="tel"
//                     name="phone"
//                     placeholder="Phone Number"
//                     value={userData.phone}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded"
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="price"
//                     placeholder="Price"
//                     value={userData.price}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded"
//                     required
//                 />
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//                     disabled={submissionLoading}
//                 >
//                     {submissionLoading ? 'Processing...' : 'Complete Payment'}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default PaymentComp;
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import usePaymentStore from '../stores/paymentstore';
import PayerInfoAndPaymentMethod from './PayerInfoAndPaymentMethod';
import BankTransferDetails from './BankTransferDetails';
import CardPaymentForm from './CardPaymentForm';

const PaymentComp = () => {
    const { formid } = useParams();
    const { fetchPaymentDetails, submitPayment } = usePaymentStore();
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submissionLoading, setSubmissionLoading] = useState(false);
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        cardNumber: '',
        expiryDate: '', // Format as "MM/YY"
        securityCode: '',
    });
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('');
    const userid = localStorage.getItem('userid');

    useEffect(() => {
        const getPaymentDetails = async () => {
            try {
                const details = await fetchPaymentDetails(userid, formid);
                setPaymentDetails(details);
                setUserData((prevData) => ({
                    ...prevData,
                    price: details.price,
                }));
            } catch (error) {
                console.error("Failed to fetch payment details", error);
            } finally {
                setLoading(false);
            }
        };
        getPaymentDetails();
    }, [fetchPaymentDetails, userid, formid]);

    const handlePaymentMethodSelection = (method) => {
        setPaymentMethod(method);
        setStep(2);
    };

    const goBack = () => {
        setStep(1);
    };

    const handleSubmit = async () => {
        setSubmissionLoading(true);
        await submitPayment({
            formid,
            ...userData,
        });
        setSubmissionLoading(false);
    };

    if (loading) return <div>Loading...</div>;
    if (!paymentDetails) return <div>No payment details found.</div>;

    return (
        <div className="max-w-lg mx-auto p-6 bg-blue-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Payment Details</h2>
            <p><strong>Title:</strong> {paymentDetails.title}</p>
            <p><strong>Description:</strong> {paymentDetails.description}</p>
            <p><strong>Amount:</strong> {paymentDetails.price}</p>

            {step === 1 && (
                <PayerInfoAndPaymentMethod
                    userData={userData}
                    setUserData={setUserData}
                    onSelectPaymentMethod={handlePaymentMethodSelection}
                />
            )}

            {step === 2 && (
                <div>
                    <button onClick={goBack} className="mb-4 text-blue-600 hover:text-blue-800">
                        &larr; Back
                    </button>
                    {paymentMethod === 'Bank Transfer' ? (
                        <BankTransferDetails formid={formid} userData={userData} />
                    ) : (
                        <CardPaymentForm userData={userData} setUserData={setUserData} />
                    )}
                    <button onClick={handleSubmit} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mt-4" disabled={submissionLoading}>
                        {submissionLoading ? 'Processing...' : 'Complete Payment'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default PaymentComp;
