import classNames from "classnames/bind";
import styles from "./header.module.scss";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";
import { useMovies } from "../../context/movie-provider";
import Cookies from "js-cookie";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import HistoryIcon from "@mui/icons-material/History";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNotifications } from "../socket/socket";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchAllRanking, fetchAllResult  } from "../../api/index";
import MovingIcon from '@mui/icons-material/Moving';

const cx = classNames.bind(styles);

const Header = () => {
  const { notifications, setNotifications } = useNotifications();
  const [keyword, setKeyword] = useState("");
  const [searchClick, setSearchClick] = useState(false);
  const { setMovies, setTotalPagesSearch } = useMovies();
  const [isScrolled, setIsScrolled] = useState(false);
  const [movies, setAllMovies] = useState([]);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const avatarUrl = Cookies.get("avatar");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const location = useLocation();

  const getRanking = async () => {
    try {
        const response = await fetchAllRanking();
        setAllMovies(response);
    } catch (error) {
        console.error("Failed to fetch movie details:", error);
    }
  };

  const fetchMoviesByKeyword = async (keyword) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/movies/search-films?keyword=${encodeURIComponent(keyword)}`,
        options
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching movies by keyword:", error);
      throw error;
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      if (keyword.length > 0) {
        const data = await fetchMoviesByKeyword(keyword);
        setKeyword("");
        setTotalPagesSearch(data.totalPagesSearch);
        setMovies(data.movies);
        navigate(`/search-film?keyword=${encodeURIComponent(keyword)}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/auth/logout`,
        options
      );
      if (response.status === 200) {
        console.log("Logout successful!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleNotifications = async (event, notificationSlug) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/movies/notifications/read`,
        {
          notifySlug: notificationSlug,
        },
        options
      );
      if (response.status === 200) {
        console.log("Handle successful!");
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification.slug === notificationSlug
              ? { ...notification, status: "read" }
              : notification
          )
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const clearTokenCookie = () => {
    toast(<strong className="fs-3">Logout successful!</strong> , {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setTimeout(() => {
      Cookies.remove("email", { path: "/" });
      Cookies.remove("token", { path: "/" });
      Cookies.remove("avatar", { path: "/" });
      window.location.reload();
    }, 3000)
  };

  const isActive = (path) => location.pathname.includes(path);

  const unreadNotificationsCount = notifications.filter(
    (notification) => notification.status === "unread"
  ).length;

  useEffect(() => {
    getRanking();
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 500,
      behavior: "smooth",
    });
  };

  const handleImgError = (event) => {
    event.target.src = avatarUrl;
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (keyword.length > 0) {
        try {
          setIsLoading(true);
          const response = await fetchAllResult(keyword);
          setResults(response);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setIsLoading(false);
        }
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [keyword]);

  return (
    <header
      className={cx("header")}
      style={{
        backgroundColor: isScrolled ? "var(--black-color)" : "transparent",
        transition: "background-color 0.3s",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <div onClick={scrollToTop}>
              <Link to="/">
                <svg
                  viewBox="0 0 111 30"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="default-ltr-cache-1d568uk ev1dnif2"
                  height="40px"
                >
                  <g fill="rgb(229, 9, 20)">
                    <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z" />
                  </g>
                </svg>
              </Link>
            </div>
            <ul className={cx("header-list")}>
              <li className={cx("header-item")} onClick={scrollToTop}>
                <Link
                  to="/series"
                  className={
                    isActive("/series")
                      ? cx("header-link", "active-link")
                      : cx("header-link")
                  }
                >
                  Series
                </Link>
              </li>
              <li className={cx("header-item")} onClick={scrollToTop}>
                <Link
                  to="/feature-films"
                  className={
                    isActive("/feature-films")
                      ? cx("header-link", "active-link")
                      : cx("header-link")
                  }
                >
                  Features
                </Link>
              </li>
              <li className={cx("header-item")} onClick={scrollToTop}>
                <Link
                  to="/tv-shows"
                  className={
                    isActive("/tv-shows")
                      ? cx("header-link", "active-link")
                      : cx("header-link")
                  }
                >
                  TV Shows
                </Link>
              </li>
              <li className={cx("header-item")} onClick={scrollToTop}>
                <Link
                  to="/animated"
                  className={
                    isActive("/animated")
                      ? cx("header-link", "active-link")
                      : cx("header-link")
                  }
                >
                  Animated
                </Link>
              </li>
              <li className={cx("header-item")} onClick={scrollToTop}>
                <Link
                  to="/my-list"
                  className={
                    isActive("/my-list")
                      ? cx("header-link", "active-link")
                      : cx("header-link")
                  }
                >
                  My list
                </Link>
              </li>
            </ul>
            <div className="d-flex justify-content-between align-items-center gap-4">
              <form onSubmit={handleSearch} className={cx("search-box")}>
                {searchClick && (
                  <Tippy
                    interactive={true}
                    placement="bottom"
                    trigger="click"
                    content={(<div className={cx("search-area")}>
                      <div className={cx("search-result")}>
                        {isLoading && <img src="/assets/imgs/kOnzy.gif" alt="Error" /> }
                        { results.map((item, index) => {
                          return (
                            <div key={index} className={cx("trending-item")}>
                              <h6>{item.movie.origin_name} ({item.movie.year})</h6>
                            </div>
                          );
                        }) }
                      </div>
                      <div className={cx("search-trending")}>
                        <h5>Trending <MovingIcon className={cx("icon")} /></h5>
                        {movies.map((item, index) => {
                          return (
                            <div key={index} className={cx("trending-item")}>
                              <h6>{item.movie.origin_name} ({item.movie.year})</h6>
                            </div>
                          )
                        })}
                      </div>
                    </div>)}
                    className={cx("custom-search")}
                  >
                    <input
                      type="search"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="Search..."
                    />
                  </Tippy>
                )}
                <button
                  type="submit"
                  className={cx("btn-search")}
                  onClick={() => setSearchClick(!searchClick)}
                >
                  <SearchIcon className={cx("header-icon")} />
                </button>
              </form>
              <Tippy
                interactive={true}
                placement="bottom"
                delay={500}
                duration={200}
                className={cx("custom-tippy")}
                content={
                  <div className={cx("notify-table")}>
                    <div
                      className={cx("scrollable-element")}
                      style={{ height: "320px", overflowY: "auto" }}
                    >
                      <div className={cx("notify-item-netflix")}>
                        <img
                          src="/assets/imgs/Netflix-avatar.png"
                          alt="Error"
                          className={cx("img-netflix")}
                        />
                        <p className={cx("notify-inf-netflix")}>
                          Welcome to Netflix. Wish you <br /> have fun watching
                          the movie :D
                        </p>
                      </div>
                      {notifications.map((notification) => {
                        const date = new Date(notification.timestamp);
                        const options = {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        };
                        const formattedDate = date.toLocaleDateString(
                          "en-US",
                          options
                        );
                        return (
                          <div
                            key={notification._id}
                            className={cx("notify-item")}
                          >
                            <form
                              className={cx("notify-link")}
                              onSubmit={(e) =>
                                handleNotifications(e, notification.slug)
                              }
                            >
                              <input
                                type="hidden"
                                name="notifySlug"
                                value={notification.slug}
                              />
                              <img
                                src={notification.poster_url}
                                alt={notification.slug}
                                className={cx("img")}
                              />
                              <div className={cx("notify-inf")}>
                                <strong>{notification.message}</strong>
                                <span>{formattedDate}</span>
                              </div>
                              {notification.status === "unread" ? (
                                <button
                                  type="submit"
                                  className={cx("circle")}
                                ></button>
                              ) : (
                                <span>
                                  <CheckCircleIcon
                                    className={cx("check-icon")}
                                  />
                                </span>
                              )}
                            </form>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                }
              >
                <div className={cx("notify")}>
                  <span
                    className={cx("circle-notify")}
                    style={
                      unreadNotificationsCount === 0 ? { display: "none" } : {}
                    }
                  >
                    {unreadNotificationsCount}
                  </span>
                  <div className={cx("notify-icon")}>
                    <NotificationsIcon className={cx("header-icon")} />
                  </div>
                </div>
              </Tippy>
              <div className={cx("history")}>
                <Link to="/history">
                  <HistoryIcon className={cx("icon")} />
                </Link>
              </div>
              <div className={cx("account")}>
                <Tippy
                  interactive={true}
                  placement="bottom"
                  delay={500}
                  duration={200}
                  className={cx("custom")}
                  content={
                    <div className={cx("account-setting")}>
                      <div className={cx("triangle-border")}>
                        <span className={cx("triangle")}></span>
                      </div>
                      <Link to="/profile">
                        <AccountBoxIcon className={cx("icon")} /> Profile
                      </Link>
                      <Link to="/support">
                        <HelpCenterIcon className={cx("icon")} /> Support
                      </Link>
                      <Link to="/contact">
                        <PermContactCalendarIcon className={cx("icon")} />{" "}
                        Contact
                      </Link>
                      <form
                        className={cx("form-logout")}
                        onSubmit={handleLogout}
                      >
                        <input type="hidden" name="token" value={token} />
                        <button type="submit" onClick={clearTokenCookie}>
                          <ExitToAppIcon className={cx("icon")} />
                          Log out
                        </button>
                      </form>
                    </div>
                  }
                >
                  <div className={cx("user-account")}>
                    <img
                      src={`${import.meta.env.VITE_IMG_URL}${avatarUrl}`}
                      className={cx("avatar")}
                      alt="avatar"
                      onError={handleImgError}
                    />
                    <ArrowDropDownIcon className={cx("header-icon")} />
                  </div>
                </Tippy>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </header>
  );
};

export default Header;
