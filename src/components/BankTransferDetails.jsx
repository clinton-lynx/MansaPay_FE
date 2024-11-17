import React, { useEffect } from 'react';
import usePaymentStore from '../stores/paymentstore';

const BankTransferDetails = ({ formid, userData }) => {
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

    const handleConfirmPayment = () => {
        confirmPayment(transactionDetails?.transaction_reference);
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
                    <strong>Amount Payable:</strong> {transactionDetails.transaction_amount_payable} {transactionDetails.currency.name}
                </p>
            </div>
        </div>
    
        {/* Confirmation Button */}
        <div className="mt-6">
            <button
                onClick={handleConfirmPayment}
                className="w-full bg-blue-600 text-white p-4 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out"
                disabled={loading}
            >
                {loading ? 'Confirming...' : 'I have made the payment'}
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
