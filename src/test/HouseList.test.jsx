import { shallow } from "enzyme";
import HouseList from "../components/HouseLists/HouseLists";

let data = {
    "title": "1",
    "owner": "1@qq.com",
    "address": {
        "amenities": "1",
        "bathrooms": "1",
        "bedrooms": "1",
        "bedtypes": "1",
        "beds": "1",
        "address": "1",
        "houseType": "1"
    },
    "price": "1",
    "thumbnail": "",
    "metadata": {},
    "reviews": [
        {
            "comment": "123123123123",
            "stars": 5,
            "email": "2@qq.com",
            "time": "2021-11-18"
        },
        {
            "comment": "1231231231233214124312",
            "stars": 5,
            "email": "2@qq.com",
            "time": "2021-11-18"
        },
        {
            "comment": "123123123",
            "stars": 5,
            "email": "2@qq.com",
            "time": "2021-11-18"
        }
    ],
    "availability": {},
    "published": true,
    "postedOn": "2021-11-18T15:06:03.132Z"
};


it("test houseList", () => {
    const app = shallow(<HouseList dataSource={[data]}/>);
    console.log(app.find(".ant-list-item"));;
});