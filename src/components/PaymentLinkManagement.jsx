
import { useEffect } from "react";
import {usePaymentStore} from "../stores/paymentStore";
import { Link } from "react-router-dom";

const PaymentLinkManagement = () => {

  const userid = localStorage.getItem('userid');
  const {
    paymentLinks,
    loading,
    error,
    fetchCampaigns,
    deleteCampaign,
  } = usePaymentStore();
// console.log(paymentLinks);

  useEffect(() => {
    // Fetch all payment links on component mount
    fetchCampaigns();
  }, [fetchCampaigns]);
  const handleDelete = (formid) => {

    deleteCampaign(userid, formid);
  };

  const handleCopyLink = (id) => {
    // Assume the link format or use a URL from state if it’s available
    const link = `${window.location.origin}/campaign/${id}`;
    navigator.clipboard.writeText(link)
      .then(() => alert("Link copied to clipboard"))
      .catch(() => alert("Failed to copy link"));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">Payment Link Management</h1>

      {/* Error and loading state display */}
      {loading && <p>Loading campaigns...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Payment Links"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
        />
      </div>

      {/* Table for payment links */}
      <div className="overflow-x-auto">
  <table className="min-w-full bg-white border border-gray-300 rounded-lg">
    <thead>
      <tr>
        <th className="py-3 px-4 text-left bg-gray-200 text-gray-700">Name</th>
        <th className="py-3 px-4 text-left bg-gray-200 text-gray-700">Amount</th>
        <th className="py-3 px-4 text-left bg-gray-200 text-gray-700">Date Created</th>
        <th className="py-3 px-4 text-left bg-gray-200 text-gray-700">Due Date</th>
        <th className="py-3 px-4 text-left bg-gray-200 text-gray-700">Actions</th>
      </tr>
    </thead>
    <tbody>
      {paymentLinks.map((link) => (
        <tr key={link.id} className="border-b hover:bg-gray-100">
          <td className="py-3 px-4">
            <Link to={`/dashboard/payment-details/${link.formid}`} className="text-blue-600 hover:underline">
              {link.title}
            </Link>
          </td>
          <td className="py-3 px-4">${link.price}</td>
          <td className="py-3 px-4">{new Date(link.created_at).toLocaleDateString()}</td>
          <td className="py-3 px-4">
            {link.dueDate ? new Date(link.duedate).toLocaleDateString() : "N/A"}
          </td>
          <td className="py-3 px-4 flex">
            <button 
              onClick={() => handleCopyLink(link.formid)} 
              className="mr-2 text-blue-600 hover:underline"
            >
              Copy Link
            </button>
            <button 
              onClick={() => handleDelete(link.formid)} 
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default PaymentLinkManagement;
