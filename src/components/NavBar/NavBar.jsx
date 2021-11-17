import React, { useEffect, useState } from "react";
import NavBarStyle from "./Navbar.module.css";
import { withRouter, Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

function NavBar(props) {
    // 当前路由地址
    const [nowLocation, setNowLocation] = useState("");
    // 是否显示下拉菜单
    const [isShowSelect, setIsShowSelect] = useState(false);
    useEffect(() => {
        console.log(props);
        setNowLocation(props.location.pathname);
    }, []);

    // onchang isShowSelect status showLogin or hiddenLogin
    const onChangeSelectStatus = (status) => {
        setIsShowSelect(status);
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
                            nowLocation === "/" ? NavBarStyle.liActive : ""
                        }
                    >
                        <Link>首页</Link>
                    </li>
                    <li>
                        <Link>发布房源</Link>
                    </li>
                    <li>
                        <Link>预定管理</Link>
                    </li>
                </ul>
                {/* 个人中心 */}
                <div
                    className={NavBarStyle.personalCenter}
                    onClick={(e) => {
                        onChangeSelectStatus(!isShowSelect, e);
                    }}
                >
                    <button>
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
                        style={{ display: isShowSelect ? "flex" : "none" }}
                    >
                        <ul>
                            <li
                                className={NavBarStyle.PersonalLiFirst}
                                onClick={(e) => {
                                    e.nativeEvent.stopImmediatePropagation();
                                    console.log(123);
                                }}
                            >
                                Login
                            </li>
                            <li>sign up</li>
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
