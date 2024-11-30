
import { useState, useEffect } from 'react';
import usePaymentStore from '../stores/paymentStore';
import axios from 'axios'; // Import Axios

const BankTransferDetails = ({ formid, userData }) => {
    const [loadingPayment, setLoadingPayment] = useState(false); // Track loading state for confirming payment
    const [loadingTestPay, setLoadingTestPay] = useState(false); // Track loading state for test payment
    const {
        initiateBankTransfer,
        confirmPayment,
        transactionDetails,
        loading,
        confirmationMessage,
        error,
    } = usePaymentStore();

    // Trigger bank transfer initiation on component mount
    useEffect(() => {
        console.log('userData', userData);
        if (formid && userData) {
            initiateBankTransfer({
                formid,
                firstname: userData.firstname,
                lastname: userData.lastname,
                email: userData.email,
                phone: userData.phone,
                price: userData.price,
            });
        }
    }, [formid, userData, initiateBankTransfer]);

    const handleTestPay = async () => {
        setLoadingTestPay(true); // Set loading state to true for test pay

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/testpay`, {
                reference: transactionDetails?.transaction_reference,
                accountnumber: transactionDetails?.account_number,
                amount: transactionDetails?.transaction_amount_payable,
            });
                // console.log(response)
            if (response.data.response) {
                // Proceed with confirming the payment after test pay success
                handleConfirmPayment();
            } else {
                // Handle test payment failure
                alert('Test payment failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during test payment:', error);
            alert('An error occurred during the test payment process.');
        } finally {
            setLoadingTestPay(false); // Reset loading state after the request
        }
    };

    const handleConfirmPayment = () => {
        setLoadingPayment(true); // Set loading state to true when the user clicks confirm
        confirmPayment(transactionDetails?.transaction_reference)
            .finally(() => {
                setLoadingPayment(false); // Reset loading after confirmation is done
            });
    };

    if (loading) return <div>Loading bank transfer details...</div>;
    if (error) return <div>Error: {error}</div>;

    return transactionDetails ? (
        <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
            <h4 className="text-2xl font-semibold text-gray-800 mb-6">Bank Transfer Details</h4>

            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between">
                    <p className="text-gray-600 text-lg"><strong>Bank Name:</strong> {transactionDetails.bank_name}</p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between">
                    <p className="text-gray-600 text-lg"><strong>Account Number:</strong> {transactionDetails.account_number}</p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between">
                    <p className="text-gray-600 text-lg"><strong>Account Name:</strong> {transactionDetails.account_name}</p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between">
                    <p className="text-gray-600 text-lg">
                        <strong>Amount Payable:</strong> {transactionDetails.currency.name} {transactionDetails.transaction_amount_payable} 
                    </p>
                </div>
            </div>

            {/* Test Payment Button */}
            <div className="mt-6">
                <button
                    onClick={handleTestPay}
                    className="w-full bg-yellow-600 text-white p-4 rounded-lg shadow-lg hover:bg-yellow-700 transition-all duration-300 ease-in-out"
                    disabled={loadingTestPay || loadingPayment} // Disable button during loading states
                >
                    {loadingTestPay ? 'Testing Payment...' : 'Test Pay'}
                </button>
            </div>

            {/* Confirmation Button */}
            <div className="mt-6">
                <button
                    onClick={handleConfirmPayment}
                    className="w-full bg-blue-600 text-white p-4 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out"
                    disabled={loadingTestPay || loadingPayment} // Disable button during loading states
                >
                    {loadingPayment ? 'Confirming...' : 'I have made the payment'}
                </button>
            </div>

            {/* Confirmation Message */}
            {confirmationMessage && (
                <p className={`mt-6 text-lg font-semibold ${confirmationMessage.includes("Successful") ? "text-green-600" : "text-red-600"}`}>
                    {confirmationMessage}
                </p>
            )}
        </div>
    ) : (
        <div>No bank transfer details available.</div>
    );
};

export default BankTransferDetails;
