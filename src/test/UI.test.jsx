
import { render, fireEvent, cleanup } from "@testing-library/react";

import App from "../router";

const email = new Date().getTime() + "@qq.com";
const Pwd = "userpwd";
const houseTitleText = new Date().getTime() + "newHouseTitle";

afterEach(cleanup);

it("UI test", async() => {
    const app = render(<App />);
    fireEvent.click(app.getByTestId("user-avater"));

    fireEvent.click(app.getByText("Login"));

    fireEvent.click(app.getByTestId("continue-btn"));

    // expect(app.getByPlaceholderText("Name")).toBeInTheDocument();
    fireEvent.change(app.getByPlaceholderText("Name"), {
        target: {
            value: "user1"
        }
    })

    expect(app.getByPlaceholderText("Name").value).toEqual("user1");

    // expect(app.getByPlaceholderText("Email")).toBeInTheDocument();
    fireEvent.change(app.getByPlaceholderText("Email"), {
        target: {
            value: email
        }
    })

    expect(app.getByPlaceholderText("Email").value).toEqual(email);

    fireEvent.change(app.getByPlaceholderText("Password"), {
        target: {
            value: Pwd
        }
    })

    expect(app.getByPlaceholderText("Password").value).toEqual(Pwd);

    fireEvent.change(app.getByPlaceholderText("Confirm Password"), {
        target: {
            value: Pwd
        }
    })

    expect(app.getByPlaceholderText("Confirm Password").value).toEqual(Pwd);

    fireEvent.click(app.getByText("Continue"));

    const userEmail = await app.findByText(email);

    expect(userEmail.innerHTML).toEqual(email);

    // House Add
    fireEvent.click(app.getByTestId("House"));

    expect(app.getByText("Add House")).toBeInTheDocument();
    fireEvent.click(app.getByText("Add House"));

    const HouseTitle = app.getByPlaceholderText("Title");
    const HouseType = app.getByPlaceholderText("House Type");
    const HouseAddress = app.getByPlaceholderText("House Address");
    const Price = app.getByPlaceholderText("Price");
    const HouseBathrooms = app.getByPlaceholderText("Bathrooms");
    const HouseBedrooms = app.getByPlaceholderText("Bedrooms");
    const HouseBeds = app.getByPlaceholderText("Beds");
    const HouseBedtypes = app.getByPlaceholderText("Bedtypes");
    const HouseAmenities = app.getByPlaceholderText("Amenities");
    expect(HouseTitle).toBeInTheDocument();

    fireEvent.change(HouseTitle, {
        target: {
            value: houseTitleText,
        }
    });

    ([HouseType, HouseAddress, Price, HouseBathrooms, HouseBedrooms, HouseBeds, HouseAmenities, HouseBedtypes]).forEach(item => {
        fireEvent.change(item, {
            target: {
                value: "1"
            }
        })
    });

    fireEvent.click(app.getByText("Save"));

    // to house list
    fireEvent.click(app.getByTestId("House"));

    expect(await app.findByText(houseTitleText)).toBeInTheDocument();
    // return;

    fireEvent.click(app.getByText("Publish"))

    fireEvent.click(await app.findByText("Unpiblish"));
    fireEvent.click(app.getByText("Confirm"));

    expect(await app.getByText("Publish")).toBeInTheDocument();

    // logout
    fireEvent.click(app.getByTestId("user-avater"));
    fireEvent.click(app.getByText("logout"));

    // login
    fireEvent.click(await app.getByText("login"));

    fireEvent.change(app.getByPlaceholderText("Email"), {
        target: {
            value: email,
        }
    });

    fireEvent.change(app.getByPlaceholderText("Password"), {
        target: {
            value: Pwd,
        }
    });

    // go house list look at the data
    fireEvent.click(app.getByTestId("House"));

    await app.findByText(houseTitleText);
});
