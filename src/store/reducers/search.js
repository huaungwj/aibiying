import * as Type from "../types";

const searchInitData = {
    searchParam: {
        startDate: "",
        endDate: "",
        bedroomsNumber: 0,
        price: 0,
        scoreNumber: 0,
        keyword: "",
    },
};

export default function SearchReducers(state = searchInitData, action) {
    const newState = {};
    const { type, payload } = action;
    switch (type) {
    case Type.SetSearchParams:
        newState.searchParam = { ...state.searchParam, ...payload }
        break;
    default:
        break;
    }
    return Object.assign({}, state, newState);
}
