import axios from "./axios";

/**
 *
 * @param {object} loginInfo
 * @param {string} loginInfo.email
 * @param {string} loginInfo.password
 * @returns {Promise}
 */
export const Login = (loginInfo) => {
    return axios.post("/user/auth/login", loginInfo);
};

/**
 *
 * @param {object} registerInfo
 * @param {string} registerInfo.email
 * @param {string} registerInfo.password
 * @param {string} registerInfo.name
 * @returns {Promise}
 */
export const Register = (registerInfo) => {
    return axios.post("/user/auth/register", registerInfo);
};

export default {
    Login,
    Register,
};

export * from "./types";
