import App from "../router/index";
import { render } from "@testing-library/react"

describe("test", () => {
    it("app", () => {
        let app = render(<App />);
        // console.log(app);
    });
});
