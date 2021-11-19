import { render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import HouseListComp from "../components/HouseLists/HouseLists";
import HouseViewList from "../views/House/List";
// import HouseAdd from "../views/House/Add";
import { setUserInfo } from "../store/actions/user";

afterEach(cleanup);

it("test HouseList Comp", () => {
    const data = {
        title: "title1",
        owner: "1@qq.com",
        address: {
            amenities: "1",
            bathrooms: "1",
            bedrooms: "1",
            bedtypes: "1",
            beds: "1",
            address: "1",
            houseType: "1"
        },
        price: "1",
        thumbnail: "",
        metadata: {},
        reviews: [
            {
                comment: "123123123123",
                stars: 5,
                email: "2@qq.com",
                time: "2021-11-18"
            },
            {
                comment: "1231231231233214124312",
                stars: 5,
                email: "2@qq.com",
                time: "2021-11-18"
            },
            {
                comment: "123123123",
                stars: 5,
                email: "2@qq.com",
                time: "2021-11-18"
            }
        ],
        availability: {},
        published: true,
        postedOn: "2021-11-18T15:06:03.132Z"
    };
    const app = render(<HouseListComp
        dataSource={[data]}
    />);
    expect(app.getByText(/title1/)).toBeInTheDocument();
    expect(app.getByText(/View/)).toBeInTheDocument();
    expect(app.getByText(/Edit/)).toBeInTheDocument();
    expect(app.getByText(/Delete/)).toBeInTheDocument();
});

it("test HouseList View", async() => {
    store.dispatch(setUserInfo({
        email: "1@qq.com",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjFAcXEuY29tIiwiaWF0IjoxNjM3Mjg0OTAyfQ.yCp_UII8Kqo-oGmZNZX5JE0iu3yXxWpa3Bpy-mRbxt8",
    }));
    const app = render(<BrowserRouter>
        <Provider store={store}>
            <HouseViewList />
        </Provider>
    </BrowserRouter>);
    expect(app.getByText(/Add\sHouse/)).toBeInTheDocument();
    expect(app.getByText(/No\sData/)).toBeInTheDocument();

    const unpublish = await app.findByText("Unpublish");
    expect(unpublish).toBeInTheDocument();
});
