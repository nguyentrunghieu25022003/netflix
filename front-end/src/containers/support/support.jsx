import classNames from "classnames/bind";
import styles from "./support.module.scss";

const cx = classNames.bind(styles);

const Support = () => {
    return (
        <div className={cx("support")}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <img src={"/assets/imgs/1_hFwwQAW45673VGKrMPE2qQ.png"} alt="Error" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Support;