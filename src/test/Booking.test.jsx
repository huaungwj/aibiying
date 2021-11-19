import "@testing-library/jest-dom/extend-expect";
import { render, cleanup } from "@testing-library/react";
import TestBooking from "../views/Booking/Booking";
import { Provider } from "react-redux";
import store from "../store";
import { setUserInfo } from "../store/actions/user";
import { BrowserRouter as Router } from "react-router-dom";
afterEach(cleanup);
/**
 * Test whether the elements at the beginning and end of the component render normally
 */

it("There should be mybookings text", () => {
    const { getByTestId } = render(
        <Provider store={store}>
            <Router>
                <TestBooking />
            </Router>
        </Provider>
    );
    expect(getByTestId("page-desc")).toHaveTextContent(
        "Please manage your listing information!"
    );
});

it("should take a snapshot", async() => {
    store.dispatch(
        setUserInfo({
            email: "1835773652@qq.com",
            name: "1835773652@qq.com",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjE4MzU3NzM2NTJAcXEuY29tIiwiaWF0IjoxNjM3Mjg2MzA3fQ.EzptCDGTS5b3XTUg03t-uQqPTpKZOiJgkpk8zYBwhNE",
        })
    );
    const app = render(
        <Provider store={store}>
            <Router>
                <TestBooking />
            </Router>
        </Provider>
    );

    await app.findByText("My Bookings");
    // expect(app).toBeInTheDocument();
    expect(app.asFragment()).toMatchSnapshot();
});
