// import React, { useEffect, useState } from "react";
// import axios from "axios";
// // import { usePaymentStore } from "../stores/paymentStore"; // Make sure this store includes `fetchCampaigns`

// const API_URL = "https://df12-105-112-12-82.ngrok-free.app/api/getcampaigns";

// // axios.defaults.withCredentials = true;

// const PaymentLinkManagement = () => {
//   const [campaigns, setCampaigns] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCampaigns = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(API_URL, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.data.response) {
//           setCampaigns(response.data.campaigns);
//         } else {
//           setError("Failed to fetch campaigns.");
//         }
//       } catch (error) {
//         console.error("Error fetching campaigns:", error);
//         setError("An error occurred while fetching campaigns.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCampaigns();
//   }, []);

//   const handleDelete = (id) => {
//     setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
//   };

//   const handleCopyLink = (formid) => {
//     const link = `https://example.com/payment/${formid}`;
//     navigator.clipboard.writeText(link).then(() => {
//       alert("Link copied to clipboard!");
//     }).catch(() => {
//       alert("Failed to copy link.");
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-2xl font-semibold text-gray-700 mb-6">Payment Link Management</h1>
      
//       {/* Search bar */}
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search Payment Links"
//           className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
//         />
//       </div>

//       {/* Table for payment links */}
//       {loading ? (
//         <div>Loading campaigns...</div>
//       ) : error ? (
//         <div className="text-red-600">{error}</div>
//       ) : (
//         <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
//           <thead>
//             <tr>
//               <th className="py-3 px-4 text-left bg-gray-200 text-gray-700">ID</th>
//               <th className="py-3 px-4 text-left bg-gray-200 text-gray-700">Name</th>
//               <th className="py-3 px-4 text-left bg-gray-200 text-gray-700">Amount</th>
//               <th className="py-3 px-4 text-left bg-gray-200 text-gray-700">Date Created</th>
//               <th className="py-3 px-4 text-left bg-gray-200 text-gray-700">Due Date</th>
//               <th className="py-3 px-4 text-left bg-gray-200 text-gray-700">Due Time</th>
//               <th className="py-3 px-4 text-left bg-gray-200 text-gray-700">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {campaigns.map((campaign) => (
//               <tr key={campaign.id} className="border-b">
//                 <td className="py-3 px-4">{campaign.id}</td>
//                 <td className="py-3 px-4">{campaign.title}</td>
//                 <td className="py-3 px-4">${campaign.price}</td>
//                 <td className="py-3 px-4">{new Date(campaign.created_at).toLocaleDateString()}</td>
//                 <td className="py-3 px-4">{campaign.dueDate || "N/A"}</td>
//                 <td className="py-3 px-4">{campaign.dueTime || "N/A"}</td>
//                 <td className="py-3 px-4">
//                   <button
//                     className="mr-2 text-blue-600 hover:underline"
//                     onClick={() => handleCopyLink(campaign.formid)}
//                   >
//                     Copy Link
//                   </button>
//                   <button
//                     className="text-red-600 hover:underline"
//                     onClick={() => handleDelete(campaign.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default PaymentLinkManagement;



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
console.log(paymentLinks);

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
      <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
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
  );
};

export default PaymentLinkManagement;
