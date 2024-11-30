import { create } from 'zustand';
const API_URL = import.meta.env.VITE_API_BASE_URL;
import axios from 'axios';

const useDashboardStore = create((set) => ({
  dashboardData: {
    totalBalance: 0,
    accountNumber: '',
    bankName: '',
    successfulPayments: { count: 0, totalAmount: 0 },
      pendingPayments: { count: 0, totalAmount: 0 },
    },



  fetchDashboardData : async (token, userId) => {
    try {
      const response = await axios.post(
        `${API_URL}/dashboard`,
        { userid: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      const data = response.data;
  console.log(data);
      if (data.response) {
        const parsedData = {
          totalBalance: data.userdetails.original.userdetails.acc_bal,
          totalCampaigns: data.totalCampaign,
          totalPayers: data.noOfDonors,
          todaysBalance: data.totalincometoday,
          accountNumber: data.userdetails.original.userdetails.acc_number,
          bankName: data.userdetails.original.userdetails.bank_name,
          successfulPayments: {
            count: data.completed_payment.length,
            totalAmount: data.completed_payment.reduce((sum, payment) => sum + Number(payment?.amount || 0), 0),
          },
          pendingPayments: {
            count: data.pending_payment.length,
            totalAmount: data.pending_payment.reduce((sum, payment) => sum + Number(payment?.amount || 0), 0),
          },
        };
            set({ dashboardData: parsedData });
        // Update Zustand store
        // useDashboardStore.getState().setDashboardData(parsedData);
      } else {
        console.error('Failed to fetch dashboard data: Invalid response structure.');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error.message);
    }
    },
  
}));

export default useDashboardStore;
