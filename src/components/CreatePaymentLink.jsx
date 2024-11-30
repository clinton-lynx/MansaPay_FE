import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { usePaymentStore } from "../stores/paymentStore"; // Import payment store
import axios from "axios";

const CreatePaymentLink = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [image, setImage] = useState(null); // Stores the Cloudinary image URL
  const [customFields, setCustomFields] = useState([]); // Array to store custom fields
  const [showModal, setShowModal] = useState(false); // Controls the modal visibility
  const [newField, setNewField] = useState({ label: "", type: "text" }); // New custom field data
  const [imageLoading, setImageLoading] = useState(false); // Tracks upload status
  const [formIdImage, setFormIdImage] = useState(null); // Stores the Cloudinary image URL
  const [activeTab, setActiveTab] = useState("strict"); // Default tab is 'standard'

  const protocol = window.location.protocol; // e.g., 'https:'
  const hostname = window.location.hostname; // e.g., 'example.com'
  const port = window.location.port ? `:${window.location.port}` : ""; // e.g., '' or ':3000'

  const baseUrl = `${protocol}//${hostname}${port}`;
  const handleCopyLink = () => {
    navigator.clipboard.writeText(paymentLink);
    setShowNotification(true);
    // Hide the notification after 2 seconds
    setTimeout(() => setShowNotification(false), 1000);
  };

  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const user = localStorage.getItem("userid");
  const { createPaymentLink, loading } = usePaymentStore(); // Get store functions and state

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    goal: "",
    duedate: "",
  });
  const [paymentLink, setPaymentLink] = useState(""); // State to hold the generated payment link

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab); // Change the active tab
  };

  const handleSubmit = async (e) => {
    console.log("submitting");
    e.preventDefault();

    // // Frontend validation
    // if (!formData.title || !formData.amount || isNaN(formData.amount)) {
    //   toast.error("Please fill in required fields and ensure amount is a number.");
    //   return;
    // }

    // Prepare the JSON payload for the payment data
    const paymentData = {
      userid: user,
      formid: formIdImage,
      title: formData.title,
      description: formData.description,
      price: formData.amount,
      duedate: formData.dueDate,
      form_fields: customFields, // Include custom fields array
      goal: formData.goal, // Add goal field if needed
    };

    console.log("Payment data being sent:", paymentData);
    // Call the store's createPaymentLink function
    console.log(paymentData);
    await createPaymentLink(paymentData);

    const { formId, error } = usePaymentStore.getState();

    if (formId) {
      setPaymentLink(`${baseUrl}/pay/${formId}`); // Adjust this URL accordingly
      toast.success("Payment link created successfully!");

      // Reset the form inputs
      setFormData({
        title: "",
        description: "",
        amount: "",
        duedate: "",
        goal: "",
        // image: null, // Reset the image field
      });
      setCustomFields([]); // Reset the custom fields
    } else if (error) {
      toast.error("Failed to create payment link. Please try again.");
    }
  };
  const addCustomField = () => {
    // Ensure newField is valid
    if (!newField.label || !newField.type) {
      alert("Please provide both a label and a type for the custom field.");
      return;
    }

    // Add the new field to the customFields array
    setCustomFields([...customFields, newField]);

    // Reset newField state
    setNewField({ label: "", type: "text" });

    // Close the modal
    setShowModal(false);
  };

  const uploadImage = async (imageFile) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("picture", imageFile);
  
      const response = await axios.post(`${API_URL}/addimage`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.data?.formid) {
        console.log("Image uploaded successfully:", response.data.formid);
        setFormIdImage(response.data.formid);
        return response.data.formid;
      } else {
        throw new Error("Image upload failed. No identifier returned.");
      }
    } catch (error) {
      console.error("Error during image upload:", error.message);
      toast.error("Failed to upload image. Please try again.");
      return null;
    }
  };
  
  // const handleEnhanceContent = async (fieldName) => {
  //   try {
  //     const inputValue = formData[fieldName];

  //     if (!inputValue) {
  //       alert('Please enter a value before enhancing.');
  //       return;
  //     }

  //     // Call the backend endpoint
  //     const response = await axios.post('http://localhost:3000/enhance-title', { title: inputValue }, { withCredentials: true } );

  //     if (response.data.enhancedTitle) {
  //       // Update the formData with the enhanced title
  //       setFormData({
  //         ...formData,
  //         [fieldName]: response.data.enhancedTitle,
  //       });
  //     } else {
  //       alert('Could not enhance the content. Try again.');
  //     }
  //   } catch (error) {
  //     console.error('Error enhancing content:', error);
  //     alert('An error occurred while enhancing the content.');
  //   }
  // };

  const handleEnhanceContent = async (field) => {
    try {
      const endpoint =
        field === "title" ? "/enhance-title" : "/enhance-description";
      const value = field === "title" ? formData.title : formData.description;

      const response = await axios.post(
        `https://mansa-be-6h4j.vercel.app${endpoint}`,
        { [field]: value },
        { withCredentials: true }
      );

      if (field === "title") {
        setFormData((prev) => ({
          ...prev,
          title: response.data.enhancedTitle,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          description: response.data.enhancedDescription,
        }));
      }
    } catch (error) {
      console.error("Error enhancing content:", error);
      alert("Failed to enhance content. Please try again.");
    }
  };








  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      const chunks = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(blob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const handleSendToBackend = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append("voiceNote", audioBlob, "recording.webm");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    try {
      const response = await fetch("http://localhost:3000/transcribe-and-enhance-title", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Enhanced Title:", data.enhancedTitle);
    } catch (error) {
      console.error("Error sending voice note:", error);
    }
  };

















  return (
    <div className="container mx-auto py-10 px-4">
      <div className="bg-blue-50 rounded-lg shadow-md p-8 lg:p-12 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
          Create Campaign
        </h2>

        {/* Tabs */}
        <div className="flex justify-center items-center space-x-4 border-b-2 mb-6 mx-auto">
          <button
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === "strict"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => handleTabChange("strict")}
          >
            Strict Campaign
          </button>
          <button
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === "flexible"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => handleTabChange("flexible")}
          >
            Flexible Campaign
          </button>
        </div>
        {activeTab === "strict" && (
  <form
    className="grid grid-cols-1 md:grid-cols-2 items-center gap-6"
    onSubmit={handleSubmit}
  >




        {/* Tab Content */}
          {/* Upload Image */}
    <div className="col-span-2 md:col-span-1">
      <label className="block text-blue-600 font-medium mb-2">
        Upload Image
      </label>
      <input
  type="file"
  accept="image/*"
  onChange={async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageLoading(true); // Optional: Show a loading indicator
      const uploadedImageId = await uploadImage(file); // Trigger upload immediately
      if (uploadedImageId) {
        setFormData({ ...formData, image: uploadedImageId }); // Update formData with the image ID or URL
      }
      setImageLoading(false); // Turn off the loading indicator
    }
  }}
  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
  disabled={imageLoading}
/>

      {imageLoading && (
        <p className="text-blue-500 mt-2">Uploading...</p>
      )}
      {image && (
        <div className="mt-4">
          <img
            src={image}
            alt="Uploaded"
            className="max-w-full h-32 object-cover rounded-md"
          />
        </div>
      )}
    </div>
  
    {/* Campaign Title */}
    <div className="col-span-2 md:col-span-1">
      <label className="block text-blue-600 font-medium mb-2">
        Campaign Title
      </label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="button"
          onClick={() => handleEnhanceContent("title")}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          💡
        </button>
      </div>
    </div>

    {/* Campaign Description */}
    <div className="col-span-2">
      <label className="block text-blue-600 font-medium mb-2">
        Campaign Description
      </label>
      <div className="flex items-center gap-2">
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Optional"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="button"
          onClick={() => handleEnhanceContent("description")}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          💡
        </button>
      </div>
    </div>

    {/* Target Amount */}
    <div className="col-span-2 md:col-span-1">
      <label className="block text-blue-600 font-medium mb-2">
        Amount (₦)
      </label>
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleInputChange}
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 no-arrows"
      />
    </div>


    

    {/* Due Date */}
    <div className="col-span-2 md:col-span-1">
      <label className="block text-blue-600 font-medium mb-2">
        Due Date
      </label>
      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleInputChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      />
    </div>

    {/* Add Custom Field Button */}
    <div className="col-span-2 md:col-span-1 text-right flex justify-start">
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
      >
        + Add Custom Field
      </button>
    </div>

    {/* Submit & Cancel Buttons */}
    <div className="col-span-2 flex flex-row-reverse justify-between items-center">
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Creating Link..." : "Create Link"}
      </button>
      <button
        type="button"
        className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition"
        onClick={() => navigate("/dashboard")}
      >
        Cancel
      </button>
    </div>
  </form>
)}
  {/* Add Custom Field Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-1/2 max-w-md">
              <h3 className="text-xl font-bold text-blue-600 mb-4">
                Add Custom Field
              </h3>
              <div className="mb-4">
                <label className="block text-blue-600 font-medium mb-2">
                  Field Label
                </label>
                <input
                  type="text"
                  value={newField.label}
                  onChange={(e) =>
                    setNewField({ ...newField, label: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-blue-600 font-medium mb-2">
                  Field Type
                </label>
                <select
                  value={newField.type}
                  onChange={(e) =>
                    setNewField({ ...newField, type: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="email">Email</option>
                  <option value="date">Date</option>
                </select>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={addCustomField}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Add Field
                </button>
              </div>
            </div>
          </div>
        )}


        {/* Add Custom Field Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-1/2 max-w-md">
              <h3 className="text-xl font-bold text-blue-600 mb-4">
                Add Custom Field
              </h3>
              <div className="mb-4">
                <label className="block text-blue-600 font-medium mb-2">
                  Field Label
                </label>
                <input
                  type="text"
                  value={newField.label}
                  onChange={(e) =>
                    setNewField({ ...newField, label: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-blue-600 font-medium mb-2">
                  Field Type
                </label>
                <select
                  value={newField.type}
                  onChange={(e) =>
                    setNewField({ ...newField, type: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="email">Email</option>
                  <option value="date">Date</option>
                </select>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={addCustomField}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Add Field
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Custom Fields Display */}

        {activeTab === "flexible" && (
  <form
    className="grid grid-cols-1 md:grid-cols-2 items-center gap-6"
    onSubmit={handleSubmit}
  >
    {/* Upload Image */}
    <div className="col-span-2 md:col-span-1">
      <label className="block text-blue-600 font-medium mb-2">
        Upload Image
      </label>
      <input
  type="file"
  accept="image/*"
  onChange={async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageLoading(true); // Optional: Show a loading indicator
      const uploadedImageId = await uploadImage(file); // Trigger upload immediately
      if (uploadedImageId) {
        setFormData({ ...formData, image: uploadedImageId }); // Update formData with the image ID or URL
      }
      setImageLoading(false); // Turn off the loading indicator
    }
  }}
  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
  disabled={imageLoading}
/> {imageLoading && (
        <p className="text-blue-500 mt-2">Uploading...</p>
      )}
      {image && (
        <div className="mt-4">
          <img
            src={image}
            alt="Uploaded"
            className="max-w-full h-32 object-cover rounded-md"
          />
        </div>
      )}
    </div>

    {/* Campaign Title */}
    <div className="col-span-2 md:col-span-1">
      <label className="block text-blue-600 font-medium mb-2">
        Campaign Title
      </label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="button"
          onClick={() => handleEnhanceContent("title")}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          💡
        </button>
      </div>
    </div>

    {/* Campaign Description */}
    <div className="col-span-2">
      <label className="block text-blue-600 font-medium mb-2">
        Campaign Description
      </label>
      <div className="flex items-center gap-2">
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Optional"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="button"
          onClick={() => handleEnhanceContent("description")}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          💡
        </button>
      </div>
    </div>

    {/* Target Amount */}
    <div className="col-span-2 md:col-span-1">
      <label className="block text-blue-600 font-medium mb-2">
        Target Amount (₦)
      </label>
      <input
        type="number"
        name="goal"
        value={formData.goal}
        onChange={handleInputChange}
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 no-arrows"
      />
    </div>

    {/* Due Date */}
    <div className="col-span-2 md:col-span-1">
      <label className="block text-blue-600 font-medium mb-2">
        Due Date
      </label>
      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleInputChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      />
    </div>

    {/* Add Custom Field Button */}
    <div className="col-span-2 md:col-span-1 text-right flex justify-start">
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
      >
        + Add Custom Field
      </button>
    </div>

    {/* Submit & Cancel Buttons */}
    <div className="col-span-2 flex flex-row-reverse justify-between items-center">
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Creating Link..." : "Create Link"}
      </button>
      <button
        type="button"
        className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition"
        onClick={() => navigate("/dashboard")}
      >
        Cancel
      </button>
    </div>
  </form>
)}
  {/* Add Custom Field Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-1/2 max-w-md">
              <h3 className="text-xl font-bold text-blue-600 mb-4">
                Add Custom Field
              </h3>
              <div className="mb-4">
                <label className="block text-blue-600 font-medium mb-2">
                  Field Label
                </label>
                <input
                  type="text"
                  value={newField.label}
                  onChange={(e) =>
                    setNewField({ ...newField, label: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-blue-600 font-medium mb-2">
                  Field Type
                </label>
                <select
                  value={newField.type}
                  onChange={(e) =>
                    setNewField({ ...newField, type: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="email">Email</option>
                  <option value="date">Date</option>
                </select>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={addCustomField}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Add Field
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Custom Fields Display */}
        {customFields.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">
              Custom Fields:
            </h3>
            <ul className="space-y-2">
              {customFields.map((field, index) => (
                <li
                  key={index}
                  className="p-3 border border-gray-300 rounded-lg flex justify-between items-center"
                >
                  <span>
                    {field.label} ({field.type})
                  </span>
                  <button
                    onClick={() =>
                      setCustomFields(
                        customFields.filter((_, i) => i !== index)
                      )
                    }
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Payment Link */}
        {paymentLink && (
          <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">
              Payment Link:
            </h3>
            <div className="flex flex-wrap items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                type="text"
                value={paymentLink}
                readOnly
                className="flex-grow p-3 border border-gray-300 rounded-lg w-full sm:w-auto"
              />
              <button
                onClick={handleCopyLink}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition w-full sm:w-auto"
              >
                Copy Link
              </button>
            </div>

            {showNotification && (
              <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg shadow-md transition-opacity duration-500 ease-out">
                Link copied to clipboard!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePaymentLink;
