
  import { create } from "zustand";
  import axios from "axios";
import { toast } from "react-toastify";

  const API_URL = import.meta.env.VITE_API_BASE_URL;


  axios.defaults.withCredentials = true;

  export const usePaymentStore = create((set) => ({
    formId: null,
    loading: false,
    campaignDetails: null, // Store campaign details here
    error: null,
    paymentLinks: [], // Store the list of payment links
    transactionDetails: null,
    confirmationMessage: "",
    balance: 5000, // initial balance for display
    amountReceived: 3000,
    amountSent: 2000,
    transactions: [],
    currentCampaign:null,
    // Payout function to send amount to the server
    payout: async (token, amount) => {
      try {
        const response = await axios.post(
          `${API_URL}/withdraw`,
          { amount },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        
        if (response.data.success) {
          set((state) => ({
            balance: state.balance - amount,
            amountSent: state.amountSent + amount,
          }));
          console.log("Payout successful", response.data);
          return response.data;
        } else {
          console.error("Payout failed:", response.data.message);
        }
      } catch (error) {
        console.error("Error in payout:", error);
      }
    },
    
    // Function to create a payment link
    createPaymentLink: async (paymentData) => {
      set({ loading: true, error: null });

      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${API_URL}/addcampaign`,
          {
            userid: paymentData.userid,
            title: paymentData.title,
            description: paymentData.description,
            price: paymentData.price,
            duedate: paymentData.dueDate,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.response) {
          set({ formId: response.data.formid, loading: false });
        } else {
          set({ error: "Failed to create payment link", loading: false });
        }
      } catch (error) {
        set({ error: error.response?.data?.message || error.message, loading: false });
      }
    },


    fetchCampaignStatus: async (campaignId) => {
      const token = localStorage.getItem("token");
    
      try {
        const response = await axios.post(`${API_URL}/getcampaignstatus`,{ formid: campaignId }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    console.log(response);
    
        if (response.data.response) {
          const { campaign, paymentmade } = response.data;
          const formattedCampaign = {
            id: campaign.id,
            name: campaign.title,
            description: campaign.description,
            price: campaign.price,
            dueDate: campaign.duedate,
            totalAmountReceived: paymentmade.reduce((acc, payment) => acc + payment.amount, 0),
            payers: paymentmade.map((payment) => ({
              id: payment.id,
              name: payment.beneficiary,
              amount: payment.amount,
              paymentTime: payment.created_at,
              status: payment.status,
            })),
          };
    
          set({ currentCampaign: formattedCampaign });
        } else {
          console.error("Failed to fetch campaign status.");
        }
      } catch (error) {
        console.error("Error fetching campaign status:", error);
      }
    },
    

    // Function to fetch payment details
    fetchPaymentDetails: async (userid, formid) => {
      set({ loading: true, error: null });
      console.log("Fetching payment details for userid: ", userid, " and formId: ", formid);

      try {
            const response = await axios.post(`${API_URL}/getcampaignbyid`, {
              formid: formid,
          });

          console.log("Payment details response: ", response.data);
          set({ loading: false });

          // Check if the response contains the expected data
          if (response.data.response) {
              return response.data.campaigns; // Return the campaigns object directly
          } else {
              throw new Error("Failed to fetch payment details");
          }
      } catch (error) {
          console.error("Error fetching payment details: ", error);
          set({ error: error.response?.data?.message || error.message, loading: false });
          throw error; // Rethrow the error for further handling
      }
  },

  fetchTransactions: async () => {
    const token = localStorage.getItem("token");
    const userid = localStorage.getItem("userid");
    console.log(token);
    try {
      const response = await axios.post(`${API_URL}/gettransactionhistory`,{userid}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.response) {
        set({ transactions: response.data.data }); // Set transactions in store
      } else {
        console.error("Failed to fetch transaction history.");
      }
    } catch (error) {
      console.error("Error fetching transaction history:", error);
    }
  },
    // Function to fetch all campaigns
    fetchCampaigns: async () => {
      set({ loading: true, error: null });
      
      try {
        const token = localStorage.getItem("token");
        const userid = localStorage.getItem("userid");
        console.log(token);
        const response = await axios.post(`${API_URL}/getcampaigns`,{userid}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  console.log(response);

        if (response.data && response.data.response) {
          set({ paymentLinks: response.data.campaigns, loading: false });
        } else {
          set({ error: "Failed to fetch campaigns", loading: false });
        }
      } catch (error) {
        set({ error: error.response?.data?.message || error.message, loading: false });
      }
    },

    // Function to delete a campaign by ID
    deleteCampaign: async (userId,formId) => {
      set({ loading: true, error: null });

      try {
        const token = localStorage.getItem("token");
        await axios.post(`${API_URL}/deletecampaign`,{userid: userId, formid:formId}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Remove the deleted campaign from state
        set((state) => ({
          // eslint-disable-next-line no-undef
          paymentLinks: state.paymentLinks.filter((link) => link.id !== campaignId),
          loading: false,
        }));
      } catch (error) {
        set({ error: error.response?.data?.message || error.message, loading: false });
      }
    },

    getCampaignDetails: async (formId) => {
      set({ loading: true, error: null });
  
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token is missing. Please log in again.");
        }
  
        // Fetch campaign details from the API
        const response = await axios.post(`${API_URL}/getcampaignstatus`,{ formid: formId}, {
          headers: {
            Authorization: `Bearer ${token}`
                    },
        });
  
        const data = response.data;
  console.log(data);
        // Process and store the campaign details
        const campaignData = {
          response: data.response,
          paymentmade: data.paymentmade,
          campaign: data.campaign,
          totalcampaignamountreceived: data.totalamountreceived,
        };
  return campaignData;
        // Set the campaign details in the store
        set({
          campaignDetails: campaignData,
          loading: false,
        });
  
        // Pass data to another function for further use
         } catch (error) {
        console.error("Error fetching campaign details:", error);
        set({
          error: error.response?.data?.message || error.message,
          loading: false,
        });
      }
    },

    // Function to initiate bank transfer
    initiateBankTransfer: async (transferData) => {
      set({ loading: true, error: null });
      try {
        const token = localStorage.getItem("token");

        const response = await axios.post(
          `${API_URL}/initiatebanktransfer`,
          {
            formid: transferData.formid,
            firstname: transferData.firstname,
            lastname: transferData.lastname,
            email: transferData.email,
            phone: transferData.phone,
            price: transferData.price,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token to the header
            },
          }
        );

        console.log("Bank Transfer Response: ", response.data);

        // Store transaction details if response is successful
        if (response.data && response.data.response) {
          set({ transactionDetails: response.data.data.response_content, loading: false });
        } else {
          console.error("Failed response: ", response.data);
          set({ error: "Failed to initiate bank transfer", loading: false });
        }
      } catch (error) {
        console.error("Error initiating bank transfer: ", error);
        set({ error: error.response?.data?.message || error.message, loading: false });
      }
    },

    confirmPayment: async (reference) => {
      set({ loading: false, confirmationMessage: "" });
      try {
          const response = await axios.post(
              `${API_URL}/confirmbanktransfer`,
              { reference },
              {
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
              }
          );
          console.log("Confirm payment response: ", response.data);
          if (response.data.response && response.data.data.success) {
              set({
                  confirmationMessage: response.data.data.data.status_reason || response.data.message,
                  loading: false,
              });
          } else {
              set({
                  confirmationMessage: response.data.message || "Payment confirmation failed. Please try again.",
                  loading: false,
              });
          }
      } catch (error) {
      console.error("Confirm payment error:", error);
      set({
          confirmationMessage: "An error occurred while confirming the payment. Please try again.",
          loading: false,
      });
  }
  },
  submitPayment: async (paymentData) => {
    console.log(paymentData);
    
    // Split expiry date into month and year
    const { expiryDate, ...rest } = paymentData;
    const [expiryMonth, expiryYear] = expiryDate.split('/');

    const formattedData = {
        ...rest,
        expiryMonth,
        expiryYear,
    };
  console.log(formattedData);

    try {
        const response = await axios.post(`${API_URL}/cardpayment`, formattedData);
        console.log(response);
        
        if (response.data.response) {
            toast.success('Payment successful!');
        } else {
            console.error("Payment failed:", response.data);
            alert(`Payment failed: ${response.data.data.message}`);
        }
    } catch (error) {
        console.error("Payment error: ", error);
        alert("An error occurred. Please try again.");
    }
  },

    // Action to request payout
    requestPayout: async () => {
      // const { token } = get(); // Assumes token is already stored in the state
      const userid = localStorage.getItem('userid');
      const token = localStorage.getItem('token');

      try {
        const response = await axios.post(
          `${API_URL}/withdraw`,
          { userid }, // Body payload
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        // Log response data to see the payout result
        console.log('Payout response:', response.data);

        // Update state based on the response if needed
        set({ payoutResponse: response.data });

      } catch (error) {
        console.error('Payout request failed:', error);
        // Optional: Store the error message in the state if needed
        set({ payoutError: error.response?.data?.message || error.message });
      }
    },
    // Function to reset state
    resetPaymentState: () => set({ formId: null, error: null, paymentLinks: [] }),
  }));

  export default usePaymentStore;
