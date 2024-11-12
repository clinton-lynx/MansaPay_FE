


import jsPDF from "jspdf";
import "jspdf-autotable";
import { useEffect } from "react";
import { usePaymentStore } from "../stores/paymentstore.js";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const CampaignDetailsPage = () => {
  const { fetchCampaignStatus, currentCampaign } = usePaymentStore();
  const { campaignId } = useParams();

  useEffect(() => {
    fetchCampaignStatus(campaignId);
  }, [campaignId, fetchCampaignStatus]);

  // Dummy data for UI testing
  const dummyPayers = [
    { id: 1, name: "John Doe", amount: 100, paymentTime: "2024-11-01T10:00:00Z", status: "Success" },
    { id: 2, name: "Jane Smith", amount: 75, paymentTime: "2024-11-02T14:30:00Z", status: "Pending" },
    { id: 3, name: "Alice Johnson", amount: 50, paymentTime: "2024-11-03T16:45:00Z", status: "Failed" },
  ];

  const payersList = currentCampaign?.payers?.length ? currentCampaign.payers : dummyPayers;

  if (!currentCampaign) return <p>Loading...</p>;

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.text("Payers List for Campaign", 10, 10);

    const headers = [["Name", "Amount", "Payment Time", "Status"]];
    const data = payersList.map((payer) => [
      payer.name || "N/A",
      `$${payer.amount}`,
      format(new Date(payer.paymentTime), "MMM d, yyyy h:mm a"),
      payer.status,
    ]);

    doc.autoTable({
      startY: 20,
      head: headers,
      body: data,
    });

    doc.save("PayersList.pdf");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* Campaign Overview */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Campaign: {currentCampaign.title}</h2>
        <p className="text-lg mb-2">Description: {currentCampaign.description}</p>
        <p className="text-lg mb-2">Due Date: {format(new Date(currentCampaign.dueDate), "MMM d, yyyy")}</p>
        <p className="text-lg">Total Amount Received: ${currentCampaign.totalAmountReceived || 0}</p>
      </div>

      {/* List of Payers */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Payers</h3>
        <ul className="space-y-4">
          {payersList.map((payer) => (
            <li key={payer.id} className="flex justify-between items-center">
              <span>{payer.name}</span>
              <span>${payer.amount}</span>
              <span>{format(new Date(payer.paymentTime), "MMM d, yyyy h:mm a")}</span>
              <span className={payer.status === "Success" ? "text-green-500" : payer.status === "Pending" ? "text-yellow-500" : "text-red-500"}>
                {payer.status}
              </span>
            </li>
          ))}
        </ul>
        <button onClick={handleGeneratePDF} className="mt-4 bg-blue-500 text-white p-2 rounded">
          Generate PDF Report
        </button>
      </div>

      {/* Mansa AI Chat Bot */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Ask Mansa AI</h3>
        <div id="mansa-ai-chatbox" className="mt-4 border rounded-lg p-4">
          {/* Integrate the Mansa AI chat modal component */}
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailsPage;
