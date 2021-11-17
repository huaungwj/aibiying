import React from "react";
import ReactDOM from "react-dom";
import App from "./router/index";
// import User from "./views/User/index";
import "antd/dist/antd.min.css";
import "./index.css";

ReactDOM.render(
    <React.Fragment>
        <App />
    </React.Fragment>,
    document.getElementById("root")
);
