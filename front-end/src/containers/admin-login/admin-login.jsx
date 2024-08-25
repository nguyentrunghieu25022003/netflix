import classNames from "classnames/bind";
import styles from "./admin-login.module.scss";
import axios from "axios";
import { useState } from "react";

const cx = classNames.bind(styles);

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        email: email,
        password: password,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/auth/login`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("Success!");
        setTimeout(() => {
          window.location.href = "/admin/dashboard";
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={cx("admin-login")}>
      <form onSubmit={handleSubmit}>
        <h3>Sign In</h3>
        <input
          type="email"
          name="email"
          value={email}
          className={cx("form-input")}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          value={password}
          className={cx("form-input")}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default AdminLogin;
