
import { useEffect, useState } from "react";
import { FaEdit, FaShareAlt, FaTrash, FaDownload } from "react-icons/fa";
import Chatbot from "./MansaAI";
import jsPDF from "jspdf"; // Library to generate PDFs
import { Bar } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import usePaymentStore from "../stores/paymentStore";
const PaymentLinkDetails = () => {
  const { fetchPaymentDetails } = usePaymentStore();
  const [analyticsSummary, setAnalyticsSummary] = useState('');
  const { formid } = useParams();
  const [campaignDetails, setCampaignDetails] = useState({ paymentmade: [] });
  const [campaignAiDetails, setCampaignAiDetails] = useState([]);
  // console.log(formid);
  const [payers, setPayers] = useState([]);
  console.log(formid);
  const [showModal, setShowModal] = useState(false);
  const userid = localStorage.getItem("userid");
  // console.log(userid);
  const protocol = window.location.protocol; // e.g., 'https:'
  const hostname = window.location.hostname; // e.g., 'example.com'
  const port = window.location.port ? `:${window.location.port}` : ''; // e.g., '' or ':3000'
  
  const baseUrl = `${protocol}//${hostname}${port}`;

  const { getCampaignDetails } = usePaymentStore();
  useEffect(() => { 
    const getCampaignAiDetails = async ()=>{

      try {
console.log("called");  

        const detailsAi = await getCampaignDetails(formid);
        console.log(detailsAi);                                           
        setCampaignAiDetails(detailsAi)
      } catch (error) {
        console.error("Failed to fetch campaign details", error);
      } 
    }

    getCampaignAiDetails();
  }, [getCampaignDetails,  formid]);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const description = campaignDetails?.campaigns?.description || "";
  const truncatedDescription = description.slice(0, 100); // Adjust length as needed

  useEffect(() => { 
    const getCampaignDetails = async ()=>{

      try {
// console.log("called");

const details = await fetchPaymentDetails(userid, formid);
// console.log(details);
setCampaignDetails(details)
} catch (error) {
  console.error("Failed to fetch campaign details", error);
} 
}

getCampaignDetails();
}, [fetchPaymentDetails, userid, formid]);


const campaignTableDetails = campaignAiDetails;
console.log(campaignDetails);
console.log(campaignAiDetails);
console.log(campaignTableDetails);


  const formatPayerData = (campaignDetails) => {
    if (!campaignDetails || !Array.isArray(campaignDetails.paymentmade)) {
      console.error("Invalid paymentmade data:", campaignDetails?.paymentmade);
      return [];
    }
    return campaignDetails.paymentmade.map((payer) => ({
      name: payer.payer_name,
      email: payer.payer_email,
      amount: `₦${payer.amount.toLocaleString()}`, // Add currency symbol and format number
      time: new Date(payer.created_at).toLocaleDateString(), // Format date
      method: payer.payment_method,
    }));
  };
  useEffect(() => {
    const formattedPayers = formatPayerData(campaignTableDetails);
    setPayers(formattedPayers); // Set formatted payers to state
  }, [getCampaignDetails, campaignTableDetails]);

  const generatePDF = () => {
    if (!payers.length) {
      alert("No data available to generate PDF");
      return;
    }

    const doc = new jsPDF();
    doc.text("List of Payers", 20, 10);

    payers.forEach((payer, index) => {
      const payerInfo = `${index + 1}. ${payer.name} | ${payer.email} | ${payer.amount} | ${payer.time} | ${payer.method}`;
      doc.text(payerInfo, 20, 20 + (index + 1) * 10);
    });

    doc.save("payers-list.pdf");
  };



  useEffect(() => {
    const fetchAnalyticsSummary = async () => {
      try {
        const response = await fetch('https://mansa-be-6h4j.vercel.app/generate-analytics-summary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ campaignDetails: campaignAiDetails }),
        });

        const data = await response.json();
        console.log(data)
        if (data.analyticsSummary) {
          setAnalyticsSummary(data.analyticsSummary);
        } else {
          setAnalyticsSummary('No analytics summary available.');
        }
      } catch (error) {
        console.error('Error fetching analytics summary:', error);
        setAnalyticsSummary('Error fetching summary.');
      }
    };

    fetchAnalyticsSummary();
    console.log(campaignDetails);
  }, [campaignAiDetails]);





  const [chartData, setChartData] = useState({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Transactions (₦)",
        data: [0, 0, 0, 0, 0, 0, 0], // Initialize with zeros
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (campaignDetails?.paymentmade) {
      const dailyTotals = [0, 0, 0, 0, 0, 0, 0]; // Initialize totals for each day (Sun to Sat)

      campaignDetails.paymentmade.forEach((payment) => {
        const date = new Date(payment.created_at);
        const dayIndex = date.getDay(); // Sunday = 0, Monday = 1, ...
        dailyTotals[dayIndex] += parseFloat(payment.amount || 0);
      });

      // Reorder days to start from Monday
      const reorderedTotals = [...dailyTotals.slice(1), dailyTotals[0]];

      setChartData((prevData) => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: reorderedTotals,
          },
        ],
      }));
    }
  }, [campaignDetails]);





  return (
    <div className="container mx-auto py-10 px-6 min-h-screen bg-gray-100">
        <div className="mb-6">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800">Campaign Analytics Summary</h3>
          <p className="text-gray-700 mt-2">{analyticsSummary}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Transactions Chart Section */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Transactions Chart</h2>
          <div className="h-96">
            {/* ChartJS chart goes here */}
            {/* <div style={{ height: "400px", width: "600px" }}> */}
      <Bar
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
          {/* </div> */}
        </div>

        {/* Payment Details Section */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Payment Link Details</h2>
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-500">Title</p>
            <p className="text-lg font-semibold text-gray-800">{campaignDetails?. campaigns?.title}</p>
          </div>
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-500">Amount</p>
            <p className="text-lg font-semibold text-green-600">{campaignDetails?. campaigns?.price || campaignDetails?. campaigns?.goal}</p>
          </div>
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-500">Due Date</p>
            <p className="text-lg font-semibold text-gray-800">{campaignDetails?. campaigns?.duedate}</p>
          </div>
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-500">Payment Link</p>
            <a href={`${baseUrl}/pay/${campaignDetails?. campaigns?.formid}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline break-all">
              {`mansapay.com/pay/${campaignDetails?. campaigns?.formid}`}
            </a>
          </div>
          <div className="mb-6">
      <p className="text-sm font-medium text-gray-500">Description</p>
      <p className="text-gray-700">
        {isExpanded ? description : truncatedDescription}
        {description.length > 100 && (
          <span
            className="text-blue-500 cursor-pointer ml-2"
            onClick={toggleDescription}
          >
            {isExpanded ? "Show less" : "Show more"}
          </span>
        )}
      </p>
    </div>
          <div className="flex justify-between">
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
{/* Payer Table Section */}
<div className="lg:col-span-4 bg-white rounded-lg shadow-lg p-6 mt-8">
  <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center hidden lg:block">
    Payer Details
  </h3>
  <table className="min-w-full table-auto border-collapse hidden lg:table">
    <thead>
      <tr>
        <th className="px-4 py-2 border text-left">Name</th>
        <th className="px-4 py-2 border text-left">Email</th>
        <th className="px-4 py-2 border text-left">Amount</th>
        <th className="px-4 py-2 border text-left">Time</th>
        <th className="px-4 py-2 border text-left">Payment Method</th>
      </tr>
    </thead>
    <tbody>
      {payers.slice(0, 3).map((payer, index) => (
        <tr key={index}>
          <td className="px-4 py-2 border">{payer.name}</td>
          <td className="px-4 py-2 border">{payer.email}</td>
          <td className="px-4 py-2 border">{payer.amount}</td>
          <td className="px-4 py-2 border">{payer.time}</td>
          <td className="px-4 py-2 border">{payer.method}</td>
        </tr>
      ))}
    </tbody>
  </table>
  
  {/* View More Button (Visible only on larger screens) */}
  <button
    className="mt-4 text-blue-500 underline hidden lg:block"
    onClick={() => setShowModal(true)}
  >
    View More
  </button>

  {/* Download Button (Visible only on mobile) */}
  <button
    className="lg:hidden mt-4 text-blue-500 underline"
    onClick={generatePDF} // Ensure this function is defined to handle the PDF download
  >
    Download PDF
  </button>
</div>
        {/* Mansa AI Chatbot Section */}
        <Chatbot campaignDetails={campaignAiDetails} />
      </div>

      {/* Modal for Full Payer List */}
      {showModal && (
  <div
    className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50"
    onClick={() => setShowModal(false)} // Close modal on clicking outside
  >
    <div
      className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full"
      onClick={(e) => e.stopPropagation()} // Prevent click from closing modal when clicking inside
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">List of Payers</h2>
        <button
          onClick={generatePDF}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
        >
          <FaDownload /> Download PDF
        </button>
      </div>

      {/* Scrollable Table */}
      <div className="max-h-96 overflow-y-auto mb-4">  {/* Added fixed height and scroll */}
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-left">Name</th>
              <th className="px-4 py-2 border text-left">Email</th>
              <th className="px-4 py-2 border text-left">Amount</th>
              <th className="px-4 py-2 border text-left">Time</th>
              <th className="px-4 py-2 border text-left">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {payers.map((payer, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{payer.name}</td>
                <td className="px-4 py-2 border">{payer.email}</td>
                <td className="px-4 py-2 border">{payer.amount}</td>
                <td className="px-4 py-2 border">{payer.time}</td>
                <td className="px-4 py-2 border">{payer.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => setShowModal(false)}
        className="mt-4 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default PaymentLinkDetails;
