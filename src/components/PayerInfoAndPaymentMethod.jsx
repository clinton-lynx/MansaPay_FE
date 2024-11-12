// PayerInfoAndPaymentMethod.jsx
import React from 'react';

const PayerInfoAndPaymentMethod = ({ userData, setUserData, onSelectPaymentMethod }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div>
            <h3 className="text-lg font-semibold">Payer Information</h3>
            <form className="space-y-4 mb-4">
                <input type="text" name="firstname" placeholder="First Name" value={userData.firstname} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="lastname" placeholder="Last Name" value={userData.lastname} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="email" name="email" placeholder="Email" value={userData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="tel" name="phone" placeholder="Phone Number" value={userData.phone} onChange={handleChange} className="w-full p-2 border rounded" required />
            </form>

            <h3 className="text-lg font-semibold">Choose Payment Method</h3>
            <button onClick={() => onSelectPaymentMethod('Bank Transfer')} className="w-full bg-gray-200 p-2 mt-2 rounded">Bank Transfer</button>
            <button onClick={() => onSelectPaymentMethod('Card')} className="w-full bg-gray-200 p-2 mt-2 rounded">Card Payment</button>
        </div>
    );
};

export default PayerInfoAndPaymentMethod;
