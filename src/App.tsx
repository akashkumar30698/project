import  { useEffect, useState } from "react";
import { AuthLayout } from "./components/AuthLayout";
import { Dashboard } from "./components/Dashboard";

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null while loading

  useEffect(() => {
    // Call backend to check cookie
    const checkLogin = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/check`, {
          credentials: "include", // important to send cookies
        });
        const data = await res.json();
        setIsLoggedIn(data.loggedIn);
      } catch (err) {
        console.error("Failed to check login:", err);
        setIsLoggedIn(false);
      }
    };
    
    checkLogin();
  }, []);

  // Show nothing while loading
  if (isLoggedIn === null) return <div>Loading...</div>;

  return isLoggedIn ? <Dashboard /> : <AuthLayout />;
}

function App() {
  return <AppContent />;
}

export default App;
