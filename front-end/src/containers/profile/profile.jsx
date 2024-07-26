import classNames from "classnames/bind";
import styles from "./profile.module.scss";
import { getMyProfile } from "../../api";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Loading from "../../components/loading/loading";

const cx = classNames.bind(styles);

const Profile = () => {
    const [profile, setProfile] = useState({});
    const nameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const token = Cookies.get("token");
    const options = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const [isLoading, setIsLoading] = useState(true);
    const email = Cookies.get("email");
    const [state, setState] = useState({
        name: "",
        email: email,
    });

    useEffect(() => {
        setIsLoading(true);
        const getProfile = async () => {
            const response = await getMyProfile(options);
            setProfile(response);
            setState((prev) => ({...prev, name: response.name }));
            setIsLoading(false);
        }
        getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const cancelEdit = () => {
        setState(prevState => ({ ...prevState, emailClick: false, nameClick: false }));
    }

    const handleNameChange = (e) => {
        setState(prevState => ({ ...prevState, name: e.target.value }));
    };

    const handleEdit = async (event) => {
        event.preventDefault();
        try {
            const userName = nameInputRef.current.value;
            const userEmail = emailInputRef.current.value;
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/users/profile/edit`, {
                userName: userName,
                userEmail: userEmail
            }, options);
            if(response.status === 200) {
                console.log("Successfully updated !");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleImgError = (event) => {
        event.target.src = profile.avatar;
    };

    if(isLoading) {
        return <Loading />;
    }

    return (
        <div className={cx("profile")}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>My Profile</h2>
                    </div>
                </div>
                <div className="row">
                    <div className={cx("col-4 profile-custom")}>
                        <div className={cx("profile-img")}>
                            <img src={`${import.meta.env.VITE_IMG_URL}${profile.avatar}`} alt="avatar" onError={handleImgError} />
                        </div>
                        <div className={cx("profile-inf")}>
                            <span className={cx("profile-text")}>
                                <input ref={nameInputRef} type="text" value={state.name} onChange={handleNameChange} className={cx("profile-input")} />
                            </span> 
                            <span className={cx("profile-text")}>
                                <input ref={emailInputRef} type="text" value={state.email} disabled className={cx("profile-input")} />
                            </span>
                            <form className={cx("d-flex gap-4 mt-5")} onSubmit={handleEdit}>
                                <button className={cx("btn-cancel")} onClick={cancelEdit} type="button">Cancel</button>
                                <button className={cx("btn-save")} type="submit">Save</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className={cx("dragon-fly")}>
                            <img src={"/assets/imgs/dragon.gif"} alt="dragon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;