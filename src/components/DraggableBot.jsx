import { useState } from "react";
import { OptionsIcon } from "./icon";

const ChatbotWidget = ({ campaigns }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [messages, setMessages] = useState([]); // Stores messages in the chat

  // Handle campaign selection
  const handleCampaignSelect = (campaign) => {
    setSelectedCampaign(campaign);
    setMessages([]); // Clear chat messages when selecting a new campaign
  };

  // Handle sending messages
  const handleSendMessage = (message) => {
    if (message.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", text: message },
      ]);

      // Simulate AI response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "ai", text: `Response to: "${message}"` },
        ]);
      }, 1000); // Simulate delay
    }
  };

  // Close the modal and reset state
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCampaign(null);
    setMessages([]);
  };

  return (
    <div>
      {/* Chatbot Icon */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-10 right-10 cursor-pointer p-4 rounded-full bg-blue-500 shadow-lg hover:bg-green-600 transition duration-300"
        title="Chat with Mansa AI"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          width="32"
          height="32"
        >
          <path d="M21 3h-18c-1.1 0-1.99.89-1.99 1.99v14.02c0 1.1.89 1.99 1.99 1.99h14.01c1.1 0 1.99-.89 1.99-1.99v-14.02c0-1.1-.89-1.99-1.99-1.99zm-10 8h-4v2h4v4h2v-4h4v-2h-4v-4h-2v4z" />
        </svg>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed bottom-16 right-10 w-96 bg-white p-4 rounded-lg shadow-lg z-50">
          {!selectedCampaign ? (
            <>
         
              {/* Campaign List */}
              <h2 className="text-xl font-[500] text-gray-700 mb-4">
                Choose a Campaign
              </h2>
              <div className="max-h-72 overflow-y-auto space-y-4">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    onClick={() => handleCampaignSelect(campaign)}
                    className="cursor-pointer p-4 border rounded-lg hover:bg-gray-100"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">
                      {campaign.title}
                    </h3>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Chatbox */}
              <div className="flex items-center justify-between border-b border-[#999999] pb-4">
              <button
                  onClick={() => setSelectedCampaign(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  Back
                </button>
        <h2 className="text-[20px] text-[#999999] font-bold">Mansa AI</h2>
        <OptionsIcon />
      </div>
      <div className="py-4 text-[#999999]">
        <p>
          I am Mansa, your friendly AI assistant. Feel free to ask any question as regards to {selectedCampaign.title} Campaign, I&apos;m glad to answer you.
        </p>
      </div>
             
              <div className="max-h-72 overflow-y-auto bg-gray-100 p-4 rounded-md space-y-2">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-lg ${
                      msg.type === "user"
                        ? "bg-blue-500 text-white self-end"
                        : "bg-gray-300 text-gray-800 self-start"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center">
                <input
                  type="text"
                  className="flex-1 border p-2 rounded-l-md focus:outline-none"
                  placeholder="Type your question..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage(e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
                <button
                  onClick={() => {
                    const input = document.querySelector("input");
                    handleSendMessage(input.value);
                    input.value = "";
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </>
          )}
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
