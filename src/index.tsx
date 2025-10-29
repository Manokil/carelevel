import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { PrivyProvider } from "@privy-io/react-auth";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ModalProvider } from "./contexts/ModalContext";
import { Modal } from "./components/ui/modal";
import { LandingPage } from "./screens/LandingPage";
import { Login } from "./screens/Login";
import { Signup } from "./screens/Signup";
import { Dashboard } from "./screens/Dashboard";
import { BuyCarelevel } from "./screens/BuyCarelevel";
import { Donation } from "./screens/Donation";
import { Profile } from "./screens/Profile";
import { EditProfile } from "./screens/EditProfile";
import { TransactionSuccess } from "./screens/TransactionSuccess";

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine which modal to show based on the current route
  const getModalType = () => {
    switch (location.pathname) {
      case '/login': return 'login';
      case '/signup': return 'signup';
      case '/buy': return 'buy';
      case '/donate': return 'donate';
      case '/edit-profile': return 'edit-profile';
      case '/transaction-success': return 'transaction-success';
      default: return null;
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'login': return 'Login';
      case 'signup': return 'Sign Up';
      case 'buy': return 'Buy';
      case 'donate': return 'Donate';
      case 'edit-profile': return 'Edit Profile';
      case 'transaction-success': return 'Transaction Success';
      default: return undefined;
    }
  };

  const modalType = getModalType();
  const isModalOpen = modalType !== null;

  const renderModalContent = () => {
    switch (modalType) {
      case 'login': return <Login />;
      case 'signup': return <Signup />;
      case 'buy': return <BuyCarelevel />;
      case 'donate': return <Donation />;
      case 'edit-profile': return <EditProfile />;
      case 'transaction-success': return <TransactionSuccess />;
      default: return null;
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LandingPage />} />
        <Route path="/signup" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/buy" element={<LandingPage />} />
        <Route path="/donate" element={<LandingPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<Profile />} />
        <Route path="/transaction-success" element={<LandingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => {
          console.log('Modal onClose called, navigating based on modal type:', modalType);
          // Navigate to different pages based on which modal is being closed
          if (modalType === 'edit-profile') {
            navigate('/profile');
          } else {
            navigate('/');
          }
        }}
        title={getModalTitle()}
        className="max-w-6xl"
      >
        {renderModalContent()}
      </Modal>
    </>
  );
};

const privyAppId = (((import.meta as any).env?.VITE_PRIVY_APP_ID) || '') as string;
const privyEnabled = Boolean(privyAppId);

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      {privyEnabled ? (
        <PrivyProvider
          appId={privyAppId}
          config={{
            loginMethods: ["wallet", "email", "google", "twitter"],
            appearance: {
              theme: "dark",
              accentColor: "#29A140",
            },
          }}
        >
          <ThemeProvider>
            <AuthProvider>
              <ModalProvider>
                <AppContent />
              </ModalProvider>
            </AuthProvider>
          </ThemeProvider>
        </PrivyProvider>
      ) : (
        <ThemeProvider>
          <AuthProvider>
            <ModalProvider>
              <AppContent />
            </ModalProvider>
          </AuthProvider>
        </ThemeProvider>
      )}
    </BrowserRouter>
  </StrictMode>,
);
