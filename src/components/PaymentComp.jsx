
// export default PaymentComp;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePaymentStore from "../stores/paymentstore";
import PayerInfoAndPaymentMethod from "./PayerInfoAndPaymentMethod";
import BankTransferDetails from "./BankTransferDetails";
import CardPaymentForm from "./CardPaymentForm";

const PaymentComp = () => {
  const { formid } = useParams();
  const { fetchPaymentDetails, submitPayment } = usePaymentStore();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "", // Format as "MM/YY"
    securityCode: "",
  });
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const userid = localStorage.getItem("userid");

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
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">
        Payment Details
      </h2>
      <p>
        <strong>Title:</strong> {paymentDetails.title}
      </p>
      <p>
        <strong>Description:</strong> {paymentDetails.description}
      </p>
      <p>
        <strong>Amount:</strong> {paymentDetails.price}
      </p>

      {step === 1 && (
        <PayerInfoAndPaymentMethod
          userData={userData}
          setUserData={setUserData}
          onSelectPaymentMethod={handlePaymentMethodSelection}
        />
      )}

      {step === 2 && (
        <div>
          <button
            onClick={goBack}
            className="mb-4 text-blue-600 hover:text-blue-800"
          >
            &larr; Back
          </button>
          {paymentMethod === "Bank Transfer" ? (
            <BankTransferDetails formid={formid} userData={userData} />
          ) : (
            <CardPaymentForm userData={userData} setUserData={setUserData} />
          )}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mt-4"
            disabled={submissionLoading}
          >
            {submissionLoading ? "Processing..." : "Complete Payment"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentComp;
