
import  { useState, useEffect } from 'react';
import { Logo } from "./icons.jsx"; // Replace with the path to your logo

const PayerInfoAndPaymentMethod = ({ userData, setUserData, onSelectPaymentMethod }) => {
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    // Check for required fields
    if (!userData.firstname) errors.firstname = "First name is required.";
    if (!userData.lastname) errors.lastname = "Last name is required.";
    if (!userData.email || !validateEmail(userData.email)) errors.email = "Valid email is required.";
    if (!userData.phone || !validatePhone(userData.phone)) errors.phone = "Valid phone number is required.";

    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0); // If no errors, form is valid
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{11}$/; // Adjust as needed for your phone number format
    return phoneRegex.test(phone);
  };

  useEffect(() => {
    validateForm(); // Revalidate whenever userData changes
  }, [userData]);

  return (
    <div className="mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Logo Section */}
      <div className="flex justify-center mb-6">
        <Logo />
      </div>

      {/* Payer Information Section */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-center text-gray-800">Payer Information</h3>
        <form className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={userData.firstname}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
              {formErrors.firstname && <p className="text-red-500 text-sm">{formErrors.firstname}</p>}
            </div>
            <div className="flex-1">
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={userData.lastname}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
              {formErrors.lastname && <p className="text-red-500 text-sm">{formErrors.lastname}</p>}
            </div>
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={userData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
            {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
          </div>
        </form>
      </div>

      {/* Payment Method Selection Section */}
      <div className="space-y-4 mt-8">
        <h3 className="text-2xl font-semibold text-center text-gray-800">Choose Payment Method</h3>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => onSelectPaymentMethod('Bank Transfer')}
            className={`w-full p-4 ${isFormValid ? 'bg-blue-600' : 'bg-gray-300'} text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400`}
            disabled={!isFormValid}
          >
            Bank Transfer
          </button>
          <button
            onClick={() => onSelectPaymentMethod('Card')}
            className={`w-full p-4 ${isFormValid ? 'bg-blue-600' : 'bg-gray-300'} text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400`}
            disabled={!isFormValid}
          >
            Card Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayerInfoAndPaymentMethod;
