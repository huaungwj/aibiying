import * as Types from "../types";

/**
 * @param {*} params
 */
export const setSearchParams = (params) => {
    return {
        type: Types.SetSearchParams,
        payload: params,
    };
};
