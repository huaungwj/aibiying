import * as Types from "../types";

const userInitialState = {
    visible: false,
    email: "1835773652@qq.com",
    name: "1835773652@qq.com",
    // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjFAcXEuY29tIiwiaWF0IjoxNjM3MTM2MDQ0fQ.1Ared_sBOyS8ouDIiqCgnZQB3ekQECBOVGLGgWYTzk8",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjE4MzU3NzM2NTJAcXEuY29tIiwiaWF0IjoxNjM3MjM2OTA5fQ.JaaA7eu7ZtKmosYcTfL4i_mmM9klBm7OnLoEgoEb_kU",
};

export default function UserReducers(state = userInitialState, action) {
    let newState = {};
    const { type, payload } = action;
    switch (type) {
    case Types.UserLogin:
        newState = { ...payload };
        break;
    case Types.UserVisiable:
        newState.visible = payload;
        break;
    case Types.UserInfoClearn:
        newState.email = ""
        break;
    default:
        break;
    }
    return Object.assign({}, state, newState);
}
