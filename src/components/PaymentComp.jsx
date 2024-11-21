//  primary color #0069ff
// export default PaymentComp;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePaymentStore from "../stores/paymentStore";
import PayerInfoAndPaymentMethod from "./PayerInfoAndPaymentMethod";
import BankTransferDetails from "./BankTransferDetails";
import CardPaymentForm from "./CardPaymentForm";


const PaymentComp = () => {
  const { formid } = useParams();
  console.log(formid);
  
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
// console.log(userid);

  useEffect(() => {
    // console.log(formid);
    
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

  if (loading) return  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
  {/* Spinning Coin */}
  <div className="relative">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center text-blue-500 text-xl font-extrabold">
          M
      </div>
  </div>
  {/* Loader Text */}
  <p className="mt-4 text-lg text-gray-700 animate-pulse font-semibold">
      Loading MansaPay...
  </p>
</div>;
  if (!paymentDetails) return <div>No payment details found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-blue-50 rounded-lg shadow-md">
    <h2 className="text-3xl font-semibold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4">
        Payment Details
      </h2>

      {/* Payment Info */}
   
        {/* Title */}
       
          {/* <FaFileAlt className="text-blue-600 text-lg" /> */}
          <p className="text-lg font-medium text-gray-800">
            <strong>Title:</strong> {paymentDetails.title}
          </p>
       
        {/* Description */}
    
          {/* <FaFileAlt className="text-blue-600 text-lg" /> */}
          <p className="text-lg font-medium text-gray-800">
            <strong>Description:</strong> {paymentDetails.description}
          </p>
    

        {/* Amount */}
 
          <p className="text-lg font-medium text-gray-800">
       
            <strong>Amount:</strong>  <span className="text-blue-600 text-lg">₦</span>{paymentDetails.price}
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
            <><CardPaymentForm userData={userData} setUserData={setUserData} />
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mt-4"
              disabled={submissionLoading}
            >
              {submissionLoading ? "Processing..." : "Complete Payment"}
            </button></>
          )}
       
        </div>
      )}
    </div>
  );
};

export default PaymentComp;
