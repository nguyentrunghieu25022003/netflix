import PropTypes from "prop-types";
import Header from "../components/header-admin/header-admin";

const AdminLayoutNoLogin = ({ children }) => {
  return (
    <div style={{ backgroundColor: "var(--black-color)" }}>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12">{children}</div>
        </div>
      </div>
    </div>
  );
};

AdminLayoutNoLogin.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminLayoutNoLogin;