import React from 'react';
import { Link } from 'react-router-dom';
import defaultImg from '../images/defaultImg.jpeg';
import PropTypes from 'prop-types';

export default function Apartment({ apartment }) {
    const role = localStorage.getItem("role");
    const { slug, name, price, imageUrl, roomCount, status } = apartment;
    return (
        <div className="apartment">
            <div className="img-container">
                <img src={imageUrl || defaultImg} alt="apartment option" />
                <div className="price-top">
                    <h6>${price}</h6>
                    <p>per month</p>
                </div>
                <Link to={`/editapartment/${slug}`} className="btn-primary apartment-link">{role === "0" ? 'Edit' : role === "1" ? 'Edit' : 'View'}</Link>
            </div>
            <p className="apartment-info">
                <span>Name: {name}</span>
            </p>
            <p className="apartment-info">
                <span>Number of rooms: {roomCount}</span>
            </p>
            <p className="apartment-info">
                <span>Rentable: {status ? "Rented" : "Rentable"}</span>
            </p>
        </div>
    )
}

Apartment.propTypes = {
    apartment: PropTypes.shape({
        name: PropTypes.string.isRequired,
    })
}