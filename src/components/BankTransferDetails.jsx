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
        <div className="mt-4 bg-gray-100 p-4 rounded">
            <h4 className="text-lg font-semibold">Bank Transfer Details</h4>
            <p><strong>Bank Name:</strong> {transactionDetails.bank_name}</p>
            <p><strong>Account Number:</strong> {transactionDetails.account_number}</p>
            <p><strong>Account Name:</strong> {transactionDetails.account_name}</p>
            <p><strong>Amount Payable:</strong> {transactionDetails.transaction_amount_payable} {transactionDetails.currency.name}</p>

            {/* Confirmation Button */}
            <button
                onClick={handleConfirmPayment}
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mt-4"
                disabled={loading}
            >
                {loading ? 'Confirming...' : 'I have made the payment'}
            </button>

            {/* Confirmation Message */}
            {confirmationMessage && (
                <p className={`mt-4 ${confirmationMessage.includes("Successful") ? "text-green-600" : "text-red-600"}`}>
                    {confirmationMessage}
                </p>
            )}
        </div>
    ) : (
        <div>No bank transfer details available.</div>
    );
};

export default BankTransferDetails;
