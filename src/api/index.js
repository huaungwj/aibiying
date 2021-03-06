import axios from "./axios";
const CancelToken = axios.CancelToken;
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
    const source = CancelToken.source();
    const request = axios.get("/listings", {
        cancelToken: source.token
    });
    request.source = source;
    return request;
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

export const ApiPublishHouse = (id) => {
    return axios.put("/listings/publish/" + id, {
        availability: {},
    });
};

export const ApiUnPublishHouse = (id) => {
    return axios.put("/listings/unpublish/" + id);
};

/**
 *
 * @param {number} listingid
 * @param {object} data
 * @param {object} data.dateRange
 * @param {string} data.dateRange.start
 * @param {string} data.dateRange.end
 * @param {number|string} data.totalPrice
 * @returns
 */
export const ApiBooking = (listingid, data) => {
    return axios.post("/bookings/new/" + listingid, data);
};

/**
 * booking
 *
 */
export const ApiGetBookings = () => {
    return axios.get("/bookings");
};

/**
 * ????????????
 */
export const ApiAcceptBooking = (bookingid) => {
    return axios.put("/bookings/accept/" + bookingid);
};

export const ApiAddComment = (listingid, bookingid, review) => {
    const url = "/listings/" + listingid + "/review/" + bookingid;
    return axios.put(url, {
        review
    });
}

export default {
    Login,
    Register,
    Logout,
};

export * from "./types";
