import { combineReducers } from "redux";

import user from "./user";
import search from "./search";

const reducer = combineReducers({
    user,
    search,
});

export default reducer;
