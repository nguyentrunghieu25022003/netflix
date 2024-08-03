import { useEffect, useState } from "react";
import axios from "axios";

const useAuthToken = () => {
  const [userToken, setUserToken] = useState(false);

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/auth/check-token`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setUserToken(true);
        }
      } catch (error) {
        setUserToken(false);
      }
    };

    checkAuthToken();
  }, []);

  return { userToken };
};

export default useAuthToken;
