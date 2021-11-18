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
        console.log(payload);
        newState.visible = payload;
        break;
    default:
        break;
    }
    return Object.assign({}, state, newState);
}
