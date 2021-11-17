import React from "react";
import ReactDOM from "react-dom";

import User from "./views/User/index";
import "antd/dist/antd.min.css";
import "./index.css";

ReactDOM.render(
    <React.Fragment>
        <User />
    </React.Fragment>,
    document.getElementById("root"),
);
