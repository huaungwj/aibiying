import * as Types from "../types";

const userInitialState = {
    visiable: true,
};

export default function UserReducers(state = userInitialState, action) {
    let newState = {};
    const { type, payload } = action;
    switch (type) {
    case Types.UserLogin:
        newState = { ...payload };
        break;
    case Types.UserVisiable:
        newState.visiable = payload.visiable;
        break;
    default:
        break;
    }
    return Object.assign({}, newState, state);
}
