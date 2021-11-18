import * as Types from "../types";

const userInitialState = {
    visible: false,
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
