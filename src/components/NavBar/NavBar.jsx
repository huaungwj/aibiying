import { useState } from "react";
import NavBarStyle from "./Navbar.module.css";
import { withRouter, Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setUserVisiable, clearnUserInfo } from "../../store/actions/user";
import { setSearchParams } from "../../store/actions/search";
import { message } from "antd";
import Api from "../../api";

function NavBar(props) {
    const [isShowSelect, setIsShowSelect] = useState(false);
    const [keyword, setKeyWord] = useState("");
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const onChangeSelectStatus = (status) => {
        setIsShowSelect(status);
    };

    // logout
    const logout = () => {
        console.log("123");
        // 清除localstorage 和 redux
        Api.Logout()
            .then(() => {
                message.success("Logout succeeded");
                dispatch(clearnUserInfo());
                localStorage.removeItem("AirbnbAuthUserInfo");
            })
            .catch((err) => {
                message.error(`${err.response.data.error}.`);
            });
    };
    // input change
    const changeKeyWord = (e) => {
        console.log(e.target.value);
        dispatch(setSearchParams({ keyword }));
        setKeyWord(e.target.value);
    };

    return (
        <div className={NavBarStyle.navBarContainer}>
            {/* logo */}
            <div className={NavBarStyle.navBarLogo}>
                <Link to="/">
                    <img src={logo} />
                </Link>
            </div>
            {/* 搜索框 */}
            <div className={NavBarStyle.navBarSearchBox}>
                <button className={NavBarStyle.navBarSearchButton}>
                    <input
                        className={NavBarStyle.navBarSearchInput}
                        placeholder={"start your search"}
                        value={keyword}
                        onChange={changeKeyWord}
                    />
                    <div className={NavBarStyle.navBarSearchSubmit}>
                        <SearchOutlined />
                    </div>
                </button>
            </div>
            {/* 右部分 */}
            <div className={NavBarStyle.navBarRightNav}>
                <ul>
                    <li
                        className={
                            props.location.pathname === "/"
                                ? NavBarStyle.liActive
                                : ""
                        }
                    >
                        <Link to="/">Home</Link>
                    </li>
                    <li
                        className={
                            /^\/house/.test(props.location.pathname)
                                ? NavBarStyle.liActive
                                : ""
                        }
                    >
                        <Link to="/house" data-testid="House">House</Link>
                    </li>
                    <li
                        className={
                            /^\/booking/.test(props.location.pathname)
                                ? NavBarStyle.liActive
                                : ""
                        }
                    >
                        <Link to="/booking">Booking</Link>
                    </li>
                </ul>
                {/* 个人中心 */}
                <div
                    className={NavBarStyle.personalCenter}
                    onClick={(e) => {
                        onChangeSelectStatus(!isShowSelect, e);
                    }}
                >
                    <button data-testid="user-avater">
                        <MenuOutlined />
                        <svg
                            className={NavBarStyle.personalSvg}
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            style={{
                                display: "block",
                                height: "100%",
                                width: "100%",
                                fill: "currentcolor",
                            }}
                        >
                            <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
                        </svg>
                    </button>

                    {/* 下拉列表 */}
                    <div
                        className={NavBarStyle.personalSelect}
                        style={{
                            display: isShowSelect ? "flex" : "none",
                        }}
                    >
                        <ul>
                            <li
                                className={NavBarStyle.PersonalLiFirst}
                                onClick={(e) => {
                                    e.nativeEvent.stopImmediatePropagation();
                                    if (user.email) return;
                                    dispatch(setUserVisiable(true));
                                    console.log(123);
                                }}
                            >
                                {user.email ? user.email : "Login"}
                            </li>
                            <li onClick={logout}>logout</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

NavBar.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }),
};

export default withRouter(NavBar);
