import "@testing-library/jest-dom/extend-expect";
import { render, cleanup } from "@testing-library/react";
import TestBookingManage from "../components/BookingManage/BookingManage";
// import {} from "enzy"

afterEach(cleanup);

it("should render the bookings page", () => {
    const { container, getByTestId } = render(<TestBookingManage />);
    const bookingBox = getByTestId("bookingBox");
    const pageTitle = getByTestId("page-title");

    expect(container.innerHTML).toMatch(
        "Please manage your listing information!"
    );
    expect(bookingBox).toContainElement(pageTitle);
});

it("There should be mybookings text", () => {
    const { getByTestId } = render(<TestBookingManage />);
    expect(getByTestId("page-title")).toHaveTextContent("My Bookings");
});

it("should take a snapshot", () => {
    const { asFragment } = render(<TestBookingManage />);
    expect(asFragment()).toMatchSnapshot();
});
