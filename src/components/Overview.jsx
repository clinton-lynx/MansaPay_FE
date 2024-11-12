import  { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import usePaymentStore from "../stores/paymentstore"; // Import your custom hook or store

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const Overview = () => {
  const { transactions, fetchTransactions } = usePaymentStore();
console.log(transactions);

  useEffect(() => {

    fetchTransactions(); // Fetch transactions on mount
  }, [fetchTransactions]);
  const [transferAmount, setTransferAmount] = useState("");
  const { balance, amountReceived, amountSent, payout } = usePaymentStore();

  // Replace this with your actual token retrieval logic
  const token = "your-token-here"; 

  const handleTransfer = () => {
    if (!transferAmount) {
      alert("Please enter an amount to transfer.");
      return;
    }
    payout(token, transferAmount);
    setTransferAmount("");
  };

  // Utility function to generate an array of random numbers
  const generateRandomData = (length, min, max) => {
    return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
  };

  const monthlyIncomeData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Monthly Income ($)",
        data: [500, 700, 1000, 800, 1200, 1500, 900, 1300, 1700, 1600, 1800, 2000],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const transactionVolumeData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Transactions",
        data: generateRandomData(4, 10, 50),
        fill: false,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* Balance Card */}
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Total Balance</h2>
          <p className="text-2xl font-bold text-blue-600">${balance}</p>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <div>
            <p className="text-gray-500">Amount Received</p>
            <p className="font-semibold text-green-500">${amountReceived}</p>
          </div>
          <div>
            <p className="text-gray-500">Amount Sent</p>
            <p className="font-semibold text-red-500">${amountSent}</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <input
            type="number"
            placeholder="Amount to Transfer"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
            className="border rounded-md p-2 w-40 mr-2"
          />
          <button
            onClick={handleTransfer}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Transfer Money
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[300px]">
        <div className="bg-white shadow-md rounded-lg p-6 h-[300px]">
          <h3 className="text-lg font-semibold mb-4">Monthly Income</h3>
          <Bar data={monthlyIncomeData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 h-[300px]">
          <h3 className="text-lg font-semibold mb-4">Transaction Volume Over Time</h3>
          <Line data={transactionVolumeData} options={{ responsive: true, maintainAspectRatio: false }} />
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
                  {transaction.amount < 0 ? `-$${Math.abs(transaction.amount)}` : `+$${transaction.amount}`}
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
        <button className="bg-green-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-green-600 transition">
          Create Payment Page
        </button>
      </div>
    </div>
  );
};

export default Overview;
