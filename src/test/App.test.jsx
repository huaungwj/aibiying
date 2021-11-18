import { render, screen,cleanup  } from "@testing-library/react";
import App from "../router/index";

// test("renders learn react link", () => {
//     render(<App />);
//     const linkElement = screen.getByText(/Location/i);
//     expect(linkElement).toBeInTheDocument();
// });

afterEach(cleanup)

it('should take a snapshot', () => {
    const { asFragment } = render(<App />)
    
    expect(asFragment()).toMatchSnapshot()
})



// test('our first react test case', ()=>{
//   const wrapper = render(<Button>Hello</Button>)
//   const el = wrapper.queryByText('Hello')
//   expect(el).toBeTruthy()
// })