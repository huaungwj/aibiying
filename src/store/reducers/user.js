import * as Types from "../types";

const userInitialState = {
    visible: false,
    email: "1@qq.com",
    name: "1@qq.com",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjFAcXEuY29tIiwiaWF0IjoxNjM3MTM2MDQ0fQ.1Ared_sBOyS8ouDIiqCgnZQB3ekQECBOVGLGgWYTzk8",
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
    default:
        break;
    }
    return Object.assign({}, state, newState);
}
