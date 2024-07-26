import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useAuthToken = () => {
  const [userToken, setUserToken] = useState(Cookies.get("token"));
  const [adminToken, setAdminToken] = useState(Cookies.get("adminToken"));

  useEffect(() => {
    const handleCookieChange = () => {
      setUserToken(Cookies.get("token"));
      setAdminToken(Cookies.get("adminToken"));
    };

    window.addEventListener("storage", handleCookieChange);
    
    return () => {
      window.removeEventListener("storage", handleCookieChange);
    };
  }, []);

  return { userToken, adminToken };
};

export default useAuthToken;
