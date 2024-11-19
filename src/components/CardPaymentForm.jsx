// // CardPaymentForm.jsx
// import React from 'react';

// const CardPaymentForm = ({ setUserData }) => {
//     const handleCardChange = (e) => {
//         const { name, value } = e.target;
//         setUserData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     return (
//         <form className="mt-4 space-y-4">
//             <input type="text" name="cardNumber" placeholder="Card Number" onChange={handleCardChange} className="w-full p-2 border rounded" required />
//             <input type="text" name="expiryDate" placeholder="Expiry Date (MM/YY)" onChange={handleCardChange} className="w-full p-2 border rounded" required />
//             <input type="text" name="securityCode" placeholder="security code" onChange={handleCardChange} className="w-full p-2 border rounded" required />
//         </form>
//     );
// };

// export default CardPaymentForm;


// CardPaymentForm.jsx
import React from 'react';

const CardPaymentForm = ({ setUserData }) => {
    const handleCardChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <form className="mt-4 space-y-4">
            <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                onChange={handleCardChange}
                className="w-full p-2 border rounded"
                required
            />
            <input
                type="text"
                name="expiryDate"
                placeholder="Expiry Date (MM/YY)"
                onChange={handleCardChange}
                className="w-full p-2 border rounded"
                required
            />
            <input
                type="text"
                name="securityCode"
                placeholder="Security Code"
                onChange={handleCardChange}
                className="w-full p-2 border rounded"
                required
            />
        </form>
    );
};

export default CardPaymentForm;
