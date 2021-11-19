import { render, screen, cleanup } from "@testing-library/react";
import App from "../router/index";
import { Button } from "antd";

/**
 * Test whether the rendering of APP components is comprehensive, and select a logout text for verification
 */
test("The logout text should be rendered here", () => {
    render(<App />);
    const linkElement = screen.getByText(/logout/i);
    expect(linkElement).toBeInTheDocument();
});

afterEach(cleanup);

it("should take a snapshot", () => {
    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();
});

test("our first react test case", () => {
    const wrapper = render(<Button>Hello</Button>);
    const el = wrapper.queryByText("Hello");
    expect(el).toBeTruthy();
});
