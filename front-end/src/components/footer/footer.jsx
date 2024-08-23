/* eslint-disable react/jsx-key */
import { Link } from "react-router-dom";
import styles from "./footer.module.scss";
import Languages from "../../components/language/language";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row">
          {[["Questions? Contact us.", "FAQ", "Investor Relations", "Privacy", "Speed Test", <Languages />, "Netflix Vietnam"],
           ["Help Center", "Jobs", "Cookie Preferences", "Legal Notices"],
           ["Account", "Ways to Watch", "Corporate Information", "Only on Netflix"],
           ["Media Center", "Terms of Use", "Contact Us"]].map((column, index) => (
            <div key={index} className="col-sm-6 col-md-3">
              {index === 0 ? (
                <p><Link to="">{column.shift()}</Link></p>
              ) : null}
              <ul className={styles['footer-list']}>
                {column.map((item, idx) => (
                  <li key={idx}>{typeof item === "string" ? <Link to="">{item}</Link> : item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
