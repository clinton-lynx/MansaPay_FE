import  { useEffect, useState } from "react";
import {  Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import usePaymentStore from "../stores/paymentStore"; // Import your custom hook or store
import { Link } from "react-router-dom";
import useDashboardStore from "../stores/dashboardStore";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const Overview = () => {


  const { dashboardData, fetchDashboardData } = useDashboardStore();
  const userId = localStorage.getItem('userid') // Replace with the actual userId
  const token = localStorage.getItem("token") // Replace with the actual token

  useEffect(() => {
    fetchDashboardData(token, userId);
    console.log(dashboardData);
  }, [token, userId]);
  const { transactions, fetchTransactions } = usePaymentStore();
console.log(transactions);

  useEffect(() => {

    fetchTransactions(); // Fetch transactions on mount
  }, [fetchTransactions]);
  const [transferAmount, setTransferAmount] = useState("");
  const { balance, amountReceived, amountSent, payout, pendingPayments } = usePaymentStore();

  // Chart Data

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
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* Balance Card */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Total Balance Card */}
  <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
    <div className="text-blue-600 text-4xl mb-3">
      <i className="fas fa-wallet"></i> {/* Replace with an appropriate wallet icon */}
    </div>
    <h2 className="text-lg font-semibold">Total Balance</h2>
    <p className="text-2xl font-bold text-blue-600">₦{dashboardData.totalBalance}</p>
  </div>

  {/* Successful Payments Card */}
  <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
    <div className="text-green-500 text-4xl mb-3">
      <i className="fas fa-check-circle"></i> {/* Replace with a checkmark icon */}
    </div>
    <h2 className="text-lg font-semibold">Successful Payments</h2>
    <p className="text-xl font-bold text-green-500"> {dashboardData.successfulPayments.count} (₦{dashboardData.successfulPayments.totalAmount})</p>
  </div>

  {/* Pending Payments Card */}
  <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
    <div className="text-yellow-500 text-4xl mb-3">
      <i className="fas fa-hourglass-half"></i> {/* Replace with a pending/hourglass icon */}
    </div>
    <h2 className="text-lg font-semibold">Pending Payments</h2>
    <p className="text-xl font-bold text-yellow-500"> {dashboardData.pendingPayments.count} (₦{dashboardData.pendingPayments.totalAmount})</p>
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


      {/* Create Payment Page Button */}
      <div className="flex justify-center">
        <Link to={"/dashboard/create-payment-link"} className="bg-green-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-green-600 transition">
          Create Payment Page
        </Link>
      </div>
    </div>
  );
};

export default Overview;
