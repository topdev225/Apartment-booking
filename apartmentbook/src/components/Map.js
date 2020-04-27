import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { Link } from 'react-router-dom';
import defaultImg from '../images/defaultImg.jpeg';

const role = localStorage.getItem("role");

function Map({
    filteredApartments
}) {
    const [selectedApartment, setSelectedApartment] = useState(null);
    return (
        <GoogleMap
            defaultZoom={13}
            defaultCenter={{ lat: 30.2672, lng: -97.7431 }}
        >
            {filteredApartments.map((apartment, index) => {
                return (
                    <Marker
                        key={index}
                        position={
                            apartment.latitude && apartment.longitude ?
                                { lat: apartment.latitude, lng: apartment.longitude } :
                                null
                        }
                        onClick={() => {
                            setSelectedApartment(apartment);
                        }}
                    />)
            })}

            {selectedApartment && (
                < InfoWindow
                    position={{
                        lat: selectedApartment.latitude, lng: selectedApartment.longitude
                    }}
                    onCloseClick={() => {
                        setSelectedApartment(null);
                    }}
                >
                    <article className="info-apartment">
                        <div className="info-img-container">
                            <img src={selectedApartment.imageUrl || defaultImg} alt="apartment option" className="info-image" />
                            <div className="info-price-top">
                                <h6>${selectedApartment.price}</h6>
                                <p>per month</p>
                            </div>
                            <Link to={`/editapartment/${selectedApartment.slug}`} className="btn-primary info-apartment-link">{role == "0" ? 'Edit' : role == "1" ? 'Edit' : 'View'}</Link>
                        </div>
                        <h4 className="info-apartment-info center">
                            {selectedApartment.name}
                        </h4>
                    </article>

                </InfoWindow>
            )}
        </GoogleMap >
    )
};

function SingleMap({
    getCoord,
    myCurrentApartment,
    editable
}) {
    let currentCoords = myCurrentApartment.slug !== "new" && myCurrentApartment.latitude && myCurrentApartment.longitude ? {
        lat: myCurrentApartment.latitude,
        lng: myCurrentApartment.longitude
    } : null;

    const [marker, setMarker] = useState(
        {
            position: currentCoords
        }
    )
    const onClick = (event) => {
        if (!editable) return;
        const lat = parseFloat(event.latLng.lat());
        const lng = parseFloat(event.latLng.lng());
        setMarker(
            {
                position: { lat, lng }
            }
        )
        getCoord(
            [
                lat, lng
            ]
        );
    }

    return (
        <GoogleMap
            defaultZoom={13}
            defaultCenter={{
                lat: 30.2672,
                lng: -97.7431
            }}
            onClick={onClick}
        >
            <Marker
                position={marker.position}
            />
        </GoogleMap>
    )
};

const WrappedMap = withScriptjs(withGoogleMap(Map))

const SingleWrappedMap = withScriptjs(withGoogleMap(SingleMap))

export default function MyMap({ apartments }) {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", padding: "20px 0" }}>
            <div style={{ width: "100%", height: "100%" }}>
                <WrappedMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCCoZpMrGdo6v9g9roPbPqhAJW1FyEBSSs`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div className="mapContainer" />}
                    mapElement={<div style={{ height: `100%` }} />}
                    filteredApartments={apartments}
                />
            </div>
        </div>
    )
};

export function MySingleMap({ apartment, editable, getCoord }) {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: "80%", height: "100%" }}>
                <SingleWrappedMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCCoZpMrGdo6v9g9roPbPqhAJW1FyEBSSs`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div className="singleMapContainer" style={{ height: "400px", marginBottom: "40px" }} />}
                    mapElement={
                        <div style={{ height: `100%` }}
                            apartment={apartment} />
                    }
                    getCoord={getCoord}
                    myCurrentApartment={apartment}
                    editable={editable}
                />
            </div>
        </div>
    )
}
