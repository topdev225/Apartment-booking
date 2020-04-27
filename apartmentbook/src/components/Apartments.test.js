import Apartment from "./Apartments";
import {
    Link
} from 'react-router-dom';
const apartment = {
    id: 4,
    userID: 9,
    name: "Test Apartment",
    slug: "test-apartment",
    price: 33,
    size: 34,
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/apartmentbook-6fc13.appspot.com/o/images%2F1585157227557room-12.jpeg?alt=media&token=fa90e908-510c-46de-8cd8-c66b26b54880",
    roomCount: 1343,
    description: "This is a test apartment description...",
    createdAt: "2020-03-25T16:15:58.078Z",
    updatedAt: "2020-03-25T17:27:14.373Z",
    longitude: -97.74239156154394,
    latitude: 30.268516388692344,
    status: 0,
    coordinates: [30.268516388692344, -97.74239156154394]
}

it("Apartments renders correctly", () => {
    const wrapper = shallow(
        <Apartment apartment={
            apartment
        }
        />
    );
    expect(wrapper).toMatchSnapshot();
})

it("Apartments formats temp correctly", () => {
    const wrapper = mount(
        <Router>
            <Apartment apartment={
                apartment
            }
            />
        </Router >
    );
    const price = wrapper.find("h6").text();
    const name = wrapper.find(".apartment-info").text();

    expect(price).toEqual("$33");
    expect(name).toEqual("Test Apartment");
})

it("Apartments calls apartment edit/view link click", () => {
    const spy = sinon.spy();
    const wrapper = mount(
        <Router>
            <Link to={
                spy
            } > View
        </Link>
        </Router >
    );
    wrapper
        .find("Link")
        .simulate("click");
    expect(spy.calledOnce).toBe(true);
})