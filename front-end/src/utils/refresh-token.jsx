import axios from "axios";

const refreshAccessToken = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/auth/refresh-token`, {
        withCredentials: true
    });
    if (response.status === 200) {
      console.log("Access token updated !");
    }
  } catch (error) {
    console.error("Error refreshing access token:", error);
  }
};

const setupAutoRefresh = (interval = 14 * 60 * 1000) => {
  refreshAccessToken();
  
  setInterval(() => {
    refreshAccessToken();
  }, interval); 
};

export default setupAutoRefresh;