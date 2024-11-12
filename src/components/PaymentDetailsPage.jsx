import { FaEdit, FaShareAlt, FaTrash } from "react-icons/fa";

const PaymentLinkDetails = () => {
  const dummyData = {
    title: "Subscription Payment",
    amount: "$99.00",
    dueDate: "2024-12-01",
    link: "https://pay.com/payment/123abc",
    description: "Monthly subscription for premium access.",
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Payment Link Details
        </h2>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-500">Title</p>
          <p className="text-lg font-semibold text-gray-800">{dummyData.title}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-500">Amount</p>
          <p className="text-lg font-semibold text-green-600">{dummyData.amount}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-500">Due Date</p>
          <p className="text-lg font-semibold text-gray-800">{dummyData.dueDate}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-500">Payment Link</p>
          <a
            href={dummyData.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline break-all"
          >
            {dummyData.link}
          </a>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium text-gray-500">Description</p>
          <p className="text-gray-700">{dummyData.description}</p>
        </div>

        <div className="flex justify-around mt-4">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <FaEdit /> Edit
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600">
            <FaShareAlt /> Share
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600">
            <FaTrash /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentLinkDetails;
