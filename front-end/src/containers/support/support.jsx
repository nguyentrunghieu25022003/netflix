import classNames from "classnames/bind";
import styles from "./support.module.scss";

const cx = classNames.bind(styles);

const Support = () => {
    return (
        <div className={cx("support")}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>Support</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className={cx("question-list")}>
                            <div className={cx("question-item")}>
                                <h4>What is Netflix?</h4>
                                <p>Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.</p>
                            </div>
                            <div className={cx("question-item")}>
                                <h4>How much does Netflix cost?</h4>
                                <p>Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from 70,000 ₫ to 260,000 ₫ a month. No extra costs, no contracts.</p>
                            </div>
                            <div className={cx("question-item")}>
                                <h4>Is Netflix good for kids?</h4>
                                <p>The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.</p>
                            </div>
                            <div className={cx("question-item")}>
                                <h4>What is Netflix?</h4>
                                <p>Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.</p>
                            </div>
                            <div className={cx("question-item")}>
                                <h4>How much does Netflix cost?</h4>
                                <p>Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from 70,000 ₫ to 260,000 ₫ a month. No extra costs, no contracts.</p>
                            </div>
                            <div className={cx("question-item")}>
                                <h4>Is Netflix good for kids?</h4>
                                <p>The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Support;