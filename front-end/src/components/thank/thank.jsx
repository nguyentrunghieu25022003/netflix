import classNames from "classnames/bind";
import styles from "./thank.module.scss";

const cx = classNames.bind(styles);

const Thank = () => {
  return (
    <div className={cx("thank")}>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <h4>Thank you for&nbsp;choosing Netflix</h4>
          </div>
        </div>
        <div className="row pt-5">
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <img src={"/assets/imgs/Netflix-PPT-Template.jpg"} alt="error" />
          </div>
          <div className={cx("col-xl-6 desc")}>
            <p>
              We provide free and high quality movie watching services for you.
              We appreciate your ability to choose us and hope our services have
              been helpful.
            </p>
            <p>
              As a new website, we rely on your support to grow, so please help
              us by sharing our site with your friends and colleagues.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thank;
