import  { useEffect, useState } from "react";
import { AuthLayout } from "./components/AuthLayout";
import { Dashboard } from "./components/Dashboard";
import Cookies from "js-cookie";

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null while loading

  useEffect(() => {
    // Call backend to check cookie
    const checkLogin = async () => {
      try {
        const res = await fetch(`https://backend-note-ltfp.onrender.com/auth/check`, {
          credentials: "include", // important to send cookies
        });
        const data = await res.json();
        setIsLoggedIn(data.loggedIn);
      } catch (err) {
        console.error("Failed to check login:", err);
        setIsLoggedIn(false);
      }
    };

    if(Cookies.get("accessToken")){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }

//    checkLogin();
  }, []);

  // Show nothing while loading
  if (isLoggedIn === null) return <div>Loading...</div>;

  return isLoggedIn ? <Dashboard /> : <AuthLayout />;
}

function App() {
  return <AppContent />;
}

export default App;
