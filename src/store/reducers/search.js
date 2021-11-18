import * as Type from "../types";

const searchInitData = {
    searchParam: {},
};

export default function SearchReducers(state = searchInitData, action) {
    const newState = {};
    const { type, payload } = action;
    switch (type) {
    case Type.SetSearchParams:
        console.log(payload);
        newState.searchParam = { ...payload }
        break;
    default:
        break;
    }
    return Object.assign({}, state, newState);
}
