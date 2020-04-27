import React, { Component } from 'react';
import ApartmentFilter from './ApartmentFilter';
import ApartmentList from './ApartmentList';
import MyMap from './Map';

class ApartmentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apartments: [],
            sortedApartments: [],
            loading: true,
            type: 'all',
            roomCount: 'all',
            price: 0,
            minPrice: 0,
            maxPrice: 0,
            minSize: 0,
            maxSize: 0,
            coordinates: [],
        };
    }
    componentDidMount() {
        let tempApartments = this.props.apartments;
        // filter by rentable if user
        if (localStorage.getItem("role") == "2") tempApartments = tempApartments.filter(apartment => apartment.status === 0);
        //filter by userID if realtor
        if (localStorage.getItem("role") == "1") tempApartments = tempApartments.filter(apartment => apartment.userID == localStorage.getItem("userID"))

        let apartments = this.formatData(tempApartments);
        let maxPrice = Math.max(...apartments.map(item => item.price));
        let maxSize = Math.max(...apartments.map(item => item.size));
        this.setState({
            apartments,
            sortedApartments: apartments,
            loading: false,
            price: maxPrice,
            maxPrice,
            maxSize,
        })
    }
    formatData(items) {
        let tempItems = items.map(item => {
            let coordinates = [item.latitude, item.longitude];
            let apartment = { ...item, coordinates }

            return apartment;
        });

        return tempItems;
    };

    handlechange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        }, this.filterApartments)
    };
    filterApartments = () => {
        let {
            apartments,
            roomCount,
            price,
            minSize,
            maxSize
        } = this.state;

        // all the apartments
        let tempApartments = [...apartments];

        // transform value
        roomCount = roomCount !== 'all' ? parseInt(roomCount) : roomCount;
        price = parseInt(price);
        // filter by roomCount
        tempApartments = roomCount !== 'all' ? tempApartments.filter(apartment => apartment.roomCount === roomCount) : tempApartments;

        // filter by price
        tempApartments = tempApartments.filter(apartment => apartment.price <= price);

        // filter by size
        tempApartments = tempApartments.filter(apartment => apartment.size >= minSize && apartment.size <= maxSize);

        // change state
        this.setState({
            sortedApartments: tempApartments
        })
    }
    render() {
        return (
            <>
                <div id="apartmentsWrapper">
                    <ApartmentFilter
                        apartments={this.state.apartments}
                        handleChange={this.handlechange}
                        roomCount={this.state.roomCount}
                        price={this.state.price}
                        minPrice={this.state.minPrice}
                        maxPrice={this.state.maxPrice}
                        minSize={this.state.minSize}
                        maxSize={this.state.maxSize}
                    />
                    <ApartmentList apartments={this.state.sortedApartments} />
                    <MyMap
                        apartments={this.state.sortedApartments}
                    />
                </div>
            </>
        );
    }
};

export default ApartmentContainer;