import axios from "axios";
import Cookies from "js-cookie";

axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        return axios.get('/api/refresh-token')
          .then(res => {
            const { accessToken } = res.data;
            Cookies.set('token', accessToken, { expires: 7 });
            error.response.config.headers['Authorization'] = `Bearer ${accessToken}`;
            return axios(error.response.config);
          })
          .catch(refreshError => {
            console.log('Unable to refresh token:', refreshError);
            return Promise.reject(refreshError);
          });
      }
      return Promise.reject(error);
    }
  );
  