import { useState } from "react";
import { banks as rawBanks } from "../utils/bank";
import { useAuthStore } from "../stores/authStore";

// Convert specific keys to camelCase
const banks = rawBanks.map((bank) => ({
  bankCode: bank["Bank Code"],
  bankName: bank["Bank Name"],
}));

const BankForm = () => {
  const userId = localStorage.getItem("userid");
  const { submitBankDetails } = useAuthStore();

  const [filteredBanks, setFilteredBanks] = useState(banks);
  const [isBankListOpen, setIsBankListOpen] = useState(false);
  const [formData, setFormData] = useState({
    userId,
    bankName: "",
    accountNumber: "",
    accountName: "",
    bankCode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate account number
    if (name === "accountNumber" && value.length > 10) return;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Filter bank names
    if (name === "bankName") {
      setIsBankListOpen(true);
      const filtered = banks.filter((bank) =>
        bank.bankName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredBanks(filtered);
    }
  };

  // Handle bank selection
  const handleBankSelect = (bank) => {
    setFormData((prevData) => ({
      ...prevData,
      bankName: bank.bankName,
      bankCode: bank.bankCode,
    }));
    setIsBankListOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate form
    if (formData.accountNumber.length !== 10) {
      setError("Account number must be exactly 10 digits.");
      return;
    }
    if (!formData.bankName || !formData.accountName) {
      setError("All fields are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitBankDetails(formData);
      alert("Bank details submitted successfully!");
      setFormData({
        userId,
        bankName: "",
        accountNumber: "",
        accountName: "",
        bankCode: "",
      });
    } catch {
      setError("Failed to submit bank details. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white shadow-lg rounded-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">Bank Details</h2>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700">Account Name:</label>
          <input
            type="text"
            name="accountName"
            value={formData.accountName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Account Number:</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
          />
          {formData.accountNumber.length > 0 && formData.accountNumber.length !== 10 && (
            <p className="text-red-500 text-xs mt-1">Account number must be 10 digits.</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bank Name:</label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            onFocus={() => setIsBankListOpen(true)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
          />
          {isBankListOpen && filteredBanks.length > 0 && (
            <ul className="mt-2 bg-white border border-gray-300 rounded-lg max-h-48 overflow-y-auto">
              {filteredBanks.map((bank) => (
                <li
                  key={bank.bankCode}
                  onClick={() => handleBankSelect(bank)}
                  className="px-4 py-2 cursor-pointer hover:bg-indigo-100"
                >
                  {bank.bankName}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default BankForm;
