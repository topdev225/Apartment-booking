import Login from './Login';
import { Provider } from 'react-redux';
import { store, history } from '../reducers';

it("Login renders correctly", () => {
    const wrapper = shallow(
        <Provider store={store}>
            <Login />
        </Provider>
    );
    expect(wrapper).toMatchSnapshot();
})

it("Login formats temp correctly", () => {
    const wrapper = mount(
        <Provider store={store}>
            <Router>
                <Login />
            </Router>
        </Provider>
    );
    const button = wrapper.find("button").text();

    expect(button).toEqual("Login");
})

it("Login Button Test click Event", () => {
    const spy = sinon.spy();
    const wrapper = mount(
        <Provider store={store}>
            <Router>
                <button onClick={spy}>Login</button>
            </Router>
        </Provider>
    );
    wrapper
        .find("button")
        .simulate("click");
    expect(spy.calledOnce).toBe(true);
})

it("Login Input onChange", () => {
    const spy = sinon.spy();
    const wrapper = mount(
        <Provider store={store}>
            <Router>
                <input 
                    name="email" 
                    type="email" 
                    placeholder="Email"
                    onChange={spy}
                />
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Email"
                    onChange={spy}
                />
            </Router>
        </Provider>
    );
    wrapper.update();
    wrapper
        .find("input")
        .first()
        .simulate("change", {target:{name: "email", value:"test@gmail.com"}})
        .find("input")
        .last()
        .simulate("change", {target:{name: "password", value:"testpassword"}})
    expect(spy.calledTwice).toBe(true);
})