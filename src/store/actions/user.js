import * as Types from "../types";

/**
 *
 * @param {object} userInfo
 * @param {string} userInfo.email
 * @param {string} userInfo.name
 * @param {string} userInfo.token
 * @returns
 */
export const setUserInfo = (userInfo) => {
    return {
        type: Types.UserLogin,
        payload: userInfo,
    }
}

/**
 *
 * @param {boolean} visiable
 * @returns
 */
export const setUserVisiable = (visiable) => {
    return {
        type: Types.UserVisiable,
        payload: visiable
    }
}
