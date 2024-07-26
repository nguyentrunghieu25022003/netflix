import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginSuccess = () => {
  const { token, email, avatar } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && email && avatar) {
      Cookies.set("token", token, { expires: 1 / 12 });
      Cookies.set("email", email, { expires: 1 / 12 });
      Cookies.set("avatar", avatar, { expires: 1 / 12 });
      window.location.href = "/";
    } else {
      navigate("/auth/login");
    }
  }, [token, email, avatar, navigate]);

  return null;
};

export default LoginSuccess;
