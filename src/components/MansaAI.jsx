// import { useState } from 'react';
// import ReactMarkdown from 'react-markdown';

// const Chatbot = () => {
//   const [userInput, setUserInput] = useState('');
//   const [chatHistory, setChatHistory] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // Example campaign context (you could dynamically assign this based on the current campaign)
//   const campaignDetails = {
//     id: "campaign-123",
//     name: "Holiday Promotion",
//     goal: "Increase sales by 20%",
//     startDate: "2024-11-01",
//     endDate: "2024-11-30",
//     totalPayments: 15000,
//   };

//   // Function to handle user queries locally
//   const handleUserQuery = (query) => {
//     const lowerCaseQuery = query.toLowerCase();

//     if (lowerCaseQuery.includes("payment so far")) {
//       return `As of now, the total payments received are $${campaignDetails.totalPayments}.`;
//     }

//     if (lowerCaseQuery.includes("campaign dates")) {
//       return `The campaign runs from ${campaignDetails.startDate} to ${campaignDetails.endDate}.`;
//     }

//     if (lowerCaseQuery.includes("improve")) {
//       return "Here are some tips to improve your campaign:\n1. Offer limited-time discounts to create urgency.\n2. Send personalized emails to your customer base.\n3. Utilize social media for targeted advertising.";
//     }

//     if (lowerCaseQuery.includes("percentage of payers")) {
//       return "I'm sorry, I don't have data on the total number of payers. Please ask your backend team for this information.";
//     }

//     if (lowerCaseQuery.includes("by date")) {
//       const match = query.match(/\d{4}-\d{2}-\d{2}/);
//       if (match) {
//         const requestedDate = match[0];
//         return `I'm unable to calculate payments as of ${requestedDate} because historical data is unavailable.`;
//       }
//       return "Please provide a specific date in YYYY-MM-DD format.";
//     }

//   };

//   // Handle sending the message
//   const sendMessage = async () => {
//     if (!userInput) return;

//     setIsLoading(true);
//     setChatHistory((prev) => [
//       ...prev,
//       { role: 'user', message: userInput },
//     ]);

//     try {
//       // Attempt to handle the query locally
//       const localResponse = handleUserQuery(userInput);

//       if (localResponse) {
//         setChatHistory((prev) => [
//           ...prev,
//           { role: 'bot', message: localResponse },
//         ]);
//       } else {
//         // Fallback to the server if the query cannot be handled locally
//         const response = await fetch('http://localhost:3000/chat', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ 
//             userInput, 
//             campaignDetails, // Include dynamic data like payments
//           }),
//         });

//         if (!response.ok) {
//           throw new Error('Server error');
//         }

//         const data = await response.json();

//         if (!data || !data.response) {
//           throw new Error('Invalid response from server');
//         }

//         setChatHistory((prev) => [
//           ...prev,
//           { role: 'bot', message: data.response },
//         ]);
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//       setChatHistory((prev) => [
//         ...prev,
//         { role: 'bot', message: 'An error occurred while processing your request.' },
//       ]);
//     } finally {
//       setIsLoading(false);
//       setUserInput('');
//     }
//   };

//   return (
//     <div className="lg:col-span-4 bg-white rounded-lg shadow-lg p-6">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
//         Mansa AI Chatbot
//       </h2>
//       <div className="h-80 bg-gray-50 rounded-lg p-4 shadow-inner overflow-y-auto">
//         {/* Chat history */}
//         <div className="flex flex-col h-full">
//           <div className="flex-grow overflow-auto">
//             {chatHistory.map((msg, index) => (
//               <div key={index} className="mb-4">
//                 <p
//                   className={`${
//                     msg.role === 'user' ? 'text-sm text-gray-600' : 'text-sm text-gray-800'
//                   }`}
//                 >
//                   {msg.role === 'user' ? 'Merchant:' : 'Mansa AI:'}
//                 </p>
//                 <div
//                   className={`${
//                     msg.role === 'user' ? 'bg-blue-100' : 'bg-green-100'
//                   } text-gray-800 px-4 py-2 rounded-lg mt-2 w-fit`}
//                 >
//                   {msg.role === 'bot' ? (
//                     <ReactMarkdown>{msg.message}</ReactMarkdown>
//                   ) : (
//                     msg.message
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//           {/* User input and Send button */}
//           <div className="flex items-center mt-4">
//             <input
//               type="text"
//               value={userInput}
//               onChange={(e) => setUserInput(e.target.value)}
//               placeholder="Type a message..."
//               className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
//             />
//             <button
//               onClick={sendMessage}
//               disabled={isLoading}
//               className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//             >
//               {isLoading ? 'Sending...' : 'Send'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;




import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import usePaymentStore from '../stores/paymentStore';

const Chatbot = ({campaignDetails}) => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);







  // Function to handle user queries locally
  const handleUserQuery = (query) => {
    const lowerCaseQuery = query.toLowerCase();

    if (lowerCaseQuery.includes("payment so far")) {
      return `As of now, the total payments received are $${campaignDetails.totalPayments}.`;
    }

    if (lowerCaseQuery.includes("campaign dates")) {
      return `The campaign runs from ${campaignDetails.startDate} to ${campaignDetails.endDate}.`;
    }

    if (lowerCaseQuery.includes("improve")) {
      return "Here are some tips to improve your campaign:\n1. Offer limited-time discounts to create urgency.\n2. Send personalized emails to your customer base.\n3. Utilize social media for targeted advertising.";
    }

    if (lowerCaseQuery.includes("percentage of payers")) {
      return "I'm sorry, I don't have data on the total number of payers. Please ask your backend team for this information.";
    }

    if (lowerCaseQuery.includes("by date")) {
      const match = query.match(/\d{4}-\d{2}-\d{2}/);
      if (match) {
        const requestedDate = match[0];
        return `I'm unable to calculate payments as of ${requestedDate} because historical data is unavailable.`;
      }
      return "Please provide a specific date in YYYY-MM-DD format.";
    }
  };

  // Handle sending the message
  const sendMessage = async () => {
    if (!userInput) return;

    setIsLoading(true);
    setChatHistory((prev) => [
      ...prev,
      { role: 'user', message: userInput },
    ]);

    try {
      // Attempt to handle the query locally
      const localResponse = handleUserQuery(userInput);

      if (localResponse) {
        setChatHistory((prev) => [
          ...prev,
          { role: 'bot', message: localResponse },
        ]);
      } else {
        // Fallback to the server if the query cannot be handled locally
        const response = await fetch('https://mansa-be-gsse.vercel.app/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userInput,
            campaignDetails, // Include dynamic data like payments
          }),
        });

        if (!response.ok) {
          throw new Error('Server error');
        }

        const data = await response.json();

        if (!data || !data.response) {
          throw new Error('Invalid response from server');
        }

        setChatHistory((prev) => [
          ...prev,
          { role: 'bot', message: data.response },
        ]);
      }
      // console.log(campaignDetails);
      
    } catch (error) {
      console.error('Error:', error.message);
      setChatHistory((prev) => [
        ...prev,
        { role: 'bot', message: 'An error occurred while processing your request.' },
      ]);
    } finally {
      setIsLoading(false);
      setUserInput('');
    }
  };

  // Add a default welcome message on initial load
  useEffect(() => {
    setChatHistory([
      { role: 'bot', message: 'Hello! How can I assist you with your campaign today?' },
    ]);
  }, []);

  return (
    <div className="lg:col-span-4 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Mansa AI Chatbot
      </h2>
      <div className="h-80 bg-gray-50 rounded-lg p-4 shadow-inner overflow-y-auto">
        {/* Chat history */}
        <div className="flex flex-col h-full">
          <div className="flex-grow overflow-auto">
            {chatHistory.length === 0 && (
              <div className="text-center text-gray-500 mt-4">
                No messages yet. Ask me something!
              </div>
            )}
            {chatHistory.map((msg, index) => (
              <div key={index} className="mb-4">
                <p
                  className={`${
                    msg.role === 'user' ? 'text-sm text-gray-600' : 'text-sm text-gray-800'
                  }`}
                >
                  {msg.role === 'user' ? 'Merchant:' : 'Mansa AI:'}
                </p>
                <div
                  className={`${
                    msg.role === 'user' ? 'bg-blue-100' : 'bg-green-100'
                  } text-gray-800 px-4 py-2 rounded-lg mt-2 w-fit`}
                >
                  {msg.role === 'bot' ? (
                    <ReactMarkdown>{msg.message}</ReactMarkdown>
                  ) : (
                    msg.message
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* User input and Send button */}
          <div className="flex items-center mt-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); // Prevent the default action (form submission, etc.)
                  sendMessage(); // Trigger sendMessage function
                }
              }}
              placeholder="Type a message..."
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading}
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
