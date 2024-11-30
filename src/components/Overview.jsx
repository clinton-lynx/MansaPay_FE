import  { useEffect, useState } from "react";
import {  Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import usePaymentStore from "../stores/paymentStore"; // Import your custom hook or store
import { Link } from "react-router-dom";
import useDashboardStore from "../stores/dashboardStore";
import { WalletIcon, CheckCircleIcon, ClockIcon, XCircleIcon, CurrencyDollarIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/solid';
import ChatbotWidget from "./DraggableBot";
import CampaignTitle from "./CampaignTitle";


ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const Overview = () => {

  const userid = localStorage.getItem('userid');
  const {
    paymentLinks,
    fetchCampaigns,
  } = usePaymentStore();

  const { dashboardData, fetchDashboardData } = useDashboardStore();
  const userId = localStorage.getItem('userid') // Replace with the actual userId
  const token = localStorage.getItem("token") // Replace with the actual token

  useEffect(() => {
    fetchDashboardData(token, userId);
    // console.log(dashboardData);
  }, [token, userId]);
  const { transactions, fetchTransactions } = usePaymentStore();
// console.log(transactions);

  useEffect(() => {

    fetchTransactions(); // Fetch transactions on mount
  }, [fetchTransactions]);
  const [transferAmount, setTransferAmount] = useState("");
  const { balance, amountReceived, amountSent, payout, pendingPayments } = usePaymentStore();

  // Chart Data
console.log(paymentLinks)
  const weeklyIncomeData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], // Labels for the past 7 days
    datasets: [
      {
        label: "Weekly Income (₦)", // Adjusted for Naira
        data: [4500, 5200, 4800, 5000, 4700, 5500, 6000], // Example data for the past 7 days
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Adjusted color
        borderColor: "rgba(75, 192, 192, 1)", 
        borderWidth: 1,
      },
    ],
  };
  

  const campaigns = [
  {
    id: 1,
    image: "https://picsum.photos/300/200",
    title: "Save the Rainforest",
    raisedAmount: 25000,
    goalAmount: 50000,
    amountLeft: 25000,
  },
  {
    id: 2,
    image: "https://picsum.photos/300/200",
    title: "Education for All",
    raisedAmount: 40000,
    goalAmount: 100000,
    amountLeft: 60000,
  },
  {
    id: 3,
    image: "https://picsum.photos/300/200",
    title: "Healthcare Support",
    raisedAmount: 30000,
    goalAmount: 70000,
    amountLeft: 40000,
  },
  {
    id: 3,
    image: "https://picsum.photos/300/200",
    title: "Healthcare Support",
    raisedAmount: 30000,
    goalAmount: 70000,
    amountLeft: 40000,
  },
  {
    id: 3,
    image: "https://picsum.photos/300/200",
    title: "Healthcare Support",
    raisedAmount: 30000,
    goalAmount: 70000,
    amountLeft: 40000,
  },
  {
    id: 3,
    image: "https://picsum.photos/300/200",
    title: "Healthcare Support",
    raisedAmount: 30000,
    goalAmount: 70000,
    amountLeft: 40000,
  },
  {
    id: 3,
    image: "https://picsum.photos/300/200",
    title: "Healthcare Support",
    raisedAmount: 30000,
    goalAmount: 7000,
    amountLeft: 4000,
  },
];


useEffect(() => {
  // Fetch all payment links on component mount
  fetchCampaigns();
}, [fetchCampaigns]);


  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
       {/* Header Row */}
  <div className="flex justify-between items-center">
    {/* Title */}
    <h1 className="text-2xl font-semibold text-gray-800">Dashboard Management</h1>
    
    {/* Add Campaign Button */}
     <Link to={"/dashboard/create-payment-link"} className=" text-white font-semibold rounded-md hover:bg-green-600 transition">
    <button 
      className="bg-blue-600 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
    >
      + Add New Campaign
    </button>
     </Link>
  </div>

     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
  {/* Total Balance Card */}
  <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start">
  <div className="text-blue-600 text-5xl mb-4">
    <WalletIcon className="h-10 w-10" />
  </div>
  <p className="text-3xl font-bold text-blue-600 mb-2">
    ₦{new Intl.NumberFormat('en-NG').format(dashboardData.totalBalance)}
  </p>
  <h3 className="text-lg font-medium text-gray-700">Total Balance</h3>
</div>

  {/* Today's Balance Card */}
  <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start">
    <div className="text-green-600 text-5xl mb-4">
      <CurrencyDollarIcon className="h-10 w-10" />
    </div>
    <p className="text-3xl font-bold text-green-600 mb-2">₦{dashboardData.todaysBalance}</p>
    <h3 className="text-lg font-medium text-gray-700">Today&apos;s Balance</h3>
  </div>

  {/* Total Payees Card */}
  <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start">
    <div className="text-yellow-600 text-5xl mb-4">
      <UserGroupIcon className="h-10 w-10" />
    </div>
    <p className="text-3xl font-bold text-yellow-600 mb-2">{dashboardData.totalPayers}</p>
    <h3 className="text-lg font-medium text-gray-700">Total Payers</h3>
  </div>

  {/* Total Campaigns Card */}
  <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start">
    <div className="text-purple-600 text-5xl mb-4">
      <ChartBarIcon className="h-10 w-10" />
    </div>
    <p className="text-3xl font-bold text-purple-600 mb-2">{dashboardData.totalCampaigns}</p>
    <h3 className="text-lg font-medium text-gray-700">Total Campaigns</h3>
  </div>
</div>
<div className="mt-8">
  {/* Campaigns Section Header */}
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-semibold text-gray-800">Campaigns</h2>
    <div className="flex gap-4">
      {/* <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">
        Previous
      </button>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
        Next
      </button> */}
    </div>
  </div>

 {/* Horizontal Scrollable Campaigns */}
  <div className="flex space-x-6 overflow-x-auto scrollbar-hide p-4">
   {paymentLinks.map((campaign) => (
  <div
    key={campaign.id}
    className="min-w-[350px]  bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
  >
    {/* Campaign Image */}
    <img
      src={campaign?.picture}
      // src={"https://mansapay.net.ng/mansapay/public/uploads/3ab4e676d10f16f191042a0870d2c142_Screenshot%202024-11-18%20152336.png"}

      alt={campaign.title}
      className="h-40 w-full object-cover"
    />

    {/* Campaign Details */}
    <div className="p-4 flex flex-col">
      {/* Campaign Title */}
      <h3 className="text-lg font-[500] text-gray-900 mb-3">
      <CampaignTitle title={campaign.title} />

      </h3>

      {/* View Details Button */}
      <Link to={`/dashboard/payment-details/${campaign.formid}`} className="bg-blue-600 text-center text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 mb-4">
        View Details
      </Link>

{/* Campaign Stats */}
<div className="grid grid-cols-3 gap-6 text-center">
  {campaign.price && !campaign.goal ? ( 
    // Strict campaign: Only show price
    <div className="col-span-3">
      <p className="text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">
        Price
      </p>
      <h4 className="text-base font-[600] text-gray-800">
        ₦{campaign.price}
      </h4>
    </div>
  ) : (
    // Flexible campaign: Show raised, goal, and left
    <>
      <div>
        <p className="text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">
          Raised
        </p>
        <h4 className="text-base font-[600] text-gray-800">
          ₦{campaign.amountRaised}
        </h4>
      </div>
      <div>
        <p className="text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">
          Goal
        </p>
        <h4 className="text-base font-[600] text-gray-800">
          ₦{campaign.goal}
        </h4>
      </div>
      <div>
        <p className="text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">
          Left
        </p>
        <h4 className="text-base font-[600] text-gray-800">
          ₦{campaign.amountLeft || "0"} {/* Default to 0 if null */}
        </h4>
      </div>
    </>
  )}
</div>

    </div>
  </div>
))}
  </div>
</div>

  {/* </div> */}

      {/* Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div  className="bg-white shadow-md rounded-lg p-6" style={{ height: "300px", width: "inherit" }}>
          <h3 className="text-lg font-semibold mb-4">Weekly Income</h3>
          <Bar data={weeklyIncomeData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-md rounded-lg p-6 flex flex-col justify-between h-[300px] text-white">
  {/* Bank Card Section */}
  <div>
    <h3 className="text-lg font-semibold">Bank Balance</h3>
    <p className="text-2xl font-bold mt-2">₦{dashboardData.totalBalance}</p>
    <div className="mt-4 flex items-center justify-between">
      <p className="text-sm">Account Number:</p>
      <p className="font-semibold">{dashboardData.accountNumber}</p>
    </div>
    <div className="mt-4 flex items-center justify-between">
      <p className="text-sm">Bank Name:</p>
      <p className="font-semibold">{dashboardData.bankName}</p>
    </div>
  </div>

  {/* Withdrawal Section */}
  <div className="mt-4">
    <input
      type="number"
      placeholder="Enter amount to withdraw"
      // value={withdrawAmount}
      // onChange={(e) => setWithdrawAmount(e.target.value)}
      className="w-full p-2 rounded-md text-black border border-gray-300"
    />
    <button
      // onClick={handleWithdraw}
      className="w-full bg-white text-blue-600 font-semibold mt-2 py-2 rounded-md hover:bg-blue-100 transition"
    >
      Withdraw
    </button>
  </div>
</div>

      </div>

     {/* Recent Transactions */}
     <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <ul className="space-y-4">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <li key={transaction.id} className="flex justify-between">
                <span>
                  {transaction.beneficiary || "Unknown Beneficiary"}
                </span>
                <span className={transaction.amount < 0 ? "text-red-500" : "text-green-500"}>
                  {transaction.amount < 0 ? `₦${Math.abs(transaction.amount)}` : `₦${transaction.amount}`}
                </span>
              </li>
            ))
          ) : (
            <p>No recent transactions available.</p>
          )}
        </ul>
      </div>
{/* <ChatbotWidget campaigns={campaigns}/> */}

    </div>
  );
};

export default Overview;
