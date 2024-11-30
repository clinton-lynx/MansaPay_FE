// /* eslint-disable react/prop-types */
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import LandingPage from "./pages/LandingPage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import DashboardPage from "./pages/DashboardPage";
// import EmailVerificationPage from "./pages/EmailVerification";
// import CreatePaymentLinkPage from "./pages/CreatePaymentLink";
// import PaymentDetails from "./pages/PaymentDetails";
// import PaymentPage from "./pages/PaymentPage";
// import PaymentLinkManagementPage from "./pages/PaymentLinkManagementPage";
// import PayoutDetails from "./pages/PayoutDetails";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// function App() {
//   const isAuthenticated = true; // Replace with actual authentication logic

//   const ProtectedRoute = ({ children }) => {
//     return isAuthenticated ? children : <Navigate to="/login" />;
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/pay/:id" element={<PaymentPage />} />
//         <Route path="/sign-up" element={<SignupPage />} />
//         <Route path="/verify-email" element={<EmailVerificationPage />} />
  
//         <Route
//           path="/dashboard/create-payment-link"
//           element={ 
//             <ProtectedRoute>
//               <CreatePaymentLinkPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard/overview"
//           element={
//             <ProtectedRoute>
//               <DashboardPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="dashboard/payment-details/:id"
//           element={
//             <ProtectedRoute>
//           <PaymentDetails />
//                   </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard/payment-links"
//           element={
//             <ProtectedRoute>
//               <PaymentLinkManagementPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/pay/:id"
//           element={
//             <ProtectedRoute>
//               <PaymentPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard/payout-details"
//           element={
//             <ProtectedRoute>
//               <PayoutDetails />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <DashboardPage />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//       <ToastContainer position="top-right" autoClose={3000} />
//     </Router>
//   );
// }

// export default App;



import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./stores/authStore";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import EmailVerificationPage from "./pages/EmailVerification";
import CreatePaymentLinkPage from "./pages/CreatePaymentLink";
import PaymentDetails from "./pages/PaymentDetails";
import PaymentPage from "./pages/PaymentPage";
import PaymentLinkManagementPage from "./pages/PaymentLinkManagementPage";
import PayoutDetails from "./pages/PayoutDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PropTypes from 'prop-types';

function App() {
  const { isAuthenticated } = useAuthStore();

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const AuthRoute = ({ children }) => {
    AuthRoute.propTypes = {
      children: PropTypes.node.isRequired,
    };
    return isAuthenticated ? <Navigate to="/dashboard" /> : children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <AuthRoute>
              <SignupPage />
            </AuthRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <AuthRoute>
              <EmailVerificationPage />
            </AuthRoute>
          }
        />
        <Route
          path="/dashboard/create-payment-link"
          element={
            <ProtectedRoute>
              <CreatePaymentLinkPage />
            </ProtectedRoute>
          }
        />
             <Route
          path="/dashboard/payment-details/:formid"
          element={
            <ProtectedRoute>
              <PaymentDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/campaigns"
          element={
            <ProtectedRoute>
              <PaymentLinkManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pay/:formid"
          element={
     
              <PaymentPage />

          }
        />
        <Route
          path="/dashboard/payout-details"
          element={
            <ProtectedRoute>
              <PayoutDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
