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

/**
 *
 * @param {*} houseInfo
 * @returns
 */
export const Logout = () => {
    return axios.post("/user/auth/logout");
};
/**
 * @param {object} houseInfo
 * @param {string} houseInfo.address
 * @param {string} houseInfo.amenities
 * @param {number} houseInfo.bathrooms
 * @param {number} houseInfo.bedrooms
 * @param {number} houseInfo.beds
 * @param {string} houseInfo.bedtypes
 * @param {string} houseInfo.title
 * @param {number} houseInfo.price
 * @param {imagebase64} houseInfo.thumbnail
 */
function transformHouseData(houseInfo) {
    return {
        title: houseInfo.title,
        price: houseInfo.price,
        thumbnail: houseInfo.thumbnail,
        address: {
            amenities: houseInfo.amenities,
            bathrooms: houseInfo.bathrooms,
            bedrooms: houseInfo.bedrooms,
            bedtypes: houseInfo.bedtypes,
            beds: houseInfo.beds,
            address: houseInfo.address,
            houseType: houseInfo.houseType,
        },
        metadata: {},
    };
}

/**
 * @param {object} houseInfo
 * @param {string} houseInfo.address
 * @param {string} houseInfo.amenities
 * @param {number} houseInfo.bathrooms
 * @param {number} houseInfo.bedrooms
 * @param {number} houseInfo.beds
 * @param {string} houseInfo.bedtypes
 * @param {string} houseInfo.title
 * @param {number} houseInfo.price
 * @param {imagebase64} houseInfo.thumbnail
 */
export const ApiHouseAdd = (houseInfo) => {
    return axios.post("/listings/new", transformHouseData(houseInfo));
};

export const ApiGetHouses = () => {
    return axios.get("/listings");
};

export const ApiHousesDel = (id) => {
    return axios.delete("/listings/" + id);
};

export const ApiGetHouse = (id) => {
    return axios.get("/listings/" + id);
};

export const ApiUpdateHouse = (id, data) => {
    return axios.put("/listings/" + id, transformHouseData(data));
};

export default {
    Login,
    Register,
    Logout
};

export * from "./types";
