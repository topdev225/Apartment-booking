import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ApartmentActions from '../actions/apartment';

import { MySingleMap } from '../components/Map';
import Image from '../components/Image';
import Loading from '../components/Loading';
import { equals } from 'ramda';
import defaultImg from '../images/defaultImg.jpeg';

class EditApartment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slug: this.props.match.params.slug,
            editable: this.props.match.params.slug === "new" ? true : false,
            name: '',
            description: '',
            price: '',
            size: '',
            roomCount: 1,
            coordinates: [],
            file: "",
            status: 0 // 0: rentable, 1: rented
        }
    }
    componentDidMount() {
        this.props.getApartments();
    }

    handleDelete = (id) => {
        this.props.removeApartment(id);
        this.props.history.goBack();
    }

    handleEdit = (apartment) => {
        if (apartment) {
            const { name, description, roomCount, size, price, imageUrl, status, latitude, longitude } = apartment;
            this.setState({
                editable: true,
                name: name,
                description: description,
                price: price,
                size: size,
                roomCount: roomCount,
                coordinates: [latitude, longitude],
                file: imageUrl,
                status: status
            })
        }
    }

    handleSave = (id) => {
        if (this.state.name) {
            this.setState({
                editable: false
            });

            if (id) {
                const payload = {
                    id: id,
                    name: this.state.name,
                    slug: this.state.name.replace(" ", "-"),
                    imageUrl: this.state.file,
                    price: this.state.price,
                    size: this.state.size,
                    roomCount: this.state.roomCount,
                    description: this.state.description,
                    updatedAt: new Date(),
                    longitude: this.state.coordinates[1],
                    latitude: this.state.coordinates[0],
                    status: this.state.status,
                }
                this.props.updateApartment(payload);
            } else {
                const payload = {
                    userID: localStorage.getItem("userID"),
                    name: this.state.name,
                    slug: this.state.name.replace(" ", "-"),
                    imageUrl: this.state.file,
                    price: this.state.price,
                    size: this.state.size,
                    roomCount: this.state.roomCount,
                    description: this.state.description,
                    longitude: this.state.coordinates[1],
                    latitude: this.state.coordinates[0],
                    status: this.state.status
                }
                this.props.createApartment(payload);
                this.props.getApartments();
            }
        } else {
            alert("Please enter the name")
        }

    }

    handleChange = (e, name) => {
        this.setState({
            [name]: e.target.value
        })
    }
    handleStatusChange = (e) => {
        this.setState({
            status: e.target.checked ? 0 : 1
        })
    }

    render() {
        const { apartmentList, isDone } = this.props;
        const apartment = apartmentList && apartmentList.find(apartment => apartment.slug === this.state.slug) || this.state;
        if (!apartment && this.state.slug !== "new") {
            return <div className="error">
                <h3>apartment not found.</h3>
                <Link to='/apartments' className='btn-primary'>
                    back to apartments
                </Link>
            </div>
        }
        const { id, name, description, roomCount, size, price, imageUrl, status } = apartment;
        return (
            <>
                {isDone ? (
                    <>
                        <div className="edit-apartment-header">
                            <Link to='/apartments' className='btn-primary'>
                                back to apartments
                            </Link>
                            {localStorage.getItem("role") != "2" && <>
                                <button type="button" className="btn-primary" onClick={() => this.handleDelete(id)}>
                                    Delete
                                </button>
                                <button type="button" className="btn-primary" onClick={() => this.state.editable ? this.handleSave(id) : this.handleEdit(apartment)}>
                                    {this.state.editable ? "Save" : "Edit"}
                                </button>
                            </>}
                        </div>
                        <section className="single-apartment">
                            <div className="apartment-editable-name">
                                {!this.state.editable ?
                                    (<h2>{name}</h2>)
                                    :
                                    (<input
                                        placeholder="Name"
                                        value={this.state.name}
                                        onChange={(e) => this.handleChange(e, 'name')}
                                    />)
                                }
                            </div>
                            <div className="single-apartment-images">
                                {this.state.editable ? <Image setSelectedFile={file => this.setState({ file })} /> : <img src={imageUrl || defaultImg} alt={name} />}
                            </div>
                            <div className="single-apartment-info">
                                <article className="desc">
                                    <h3>details</h3>
                                    {!this.state.editable ?
                                        (<p>{description}</p>)
                                        :
                                        (<textarea
                                            className="apartment-editable-description"
                                            placeholder="Description"
                                            value={this.state.description}
                                            onChange={(e) => this.handleChange(e, 'description')}
                                        />)
                                    }
                                </article>
                                <article className="info">
                                    <h3>info</h3>
                                    <h6>price per month: ${!this.state.editable ?
                                        price
                                        :
                                        <input type="number" value={this.state.price} onChange={(e) => this.handleChange(e, 'price')} />
                                    }
                                    </h6>
                                    <h6>floor area size : {!this.state.editable ?
                                        size
                                        :
                                        <input type="number" value={this.state.size} onChange={(e) => this.handleChange(e, 'size')} />
                                    } SQFT
                                    </h6>
                                    <h6>
                                        Number of Rooms: {!this.state.editable ?
                                            roomCount > 1 ? `${roomCount} rooms` : `${roomCount} room`
                                            :
                                            <input type="number" value={this.state.roomCount} onChange={(e) => this.handleChange(e, 'roomCount')} />
                                        }
                                    </h6>
                                    <h6>
                                        Rentable: {!this.state.editable ?
                                            status === 0 ? 'Rentable' : 'Rented'
                                            :
                                            <input type="checkbox" checked={this.state.status === 0 ? true : false} onChange={this.handleStatusChange} />
                                        }
                                    </h6>
                                </article>
                            </div>
                        </section>
                        <section>
                            <MySingleMap apartment={apartment} editable={this.state.editable} getCoord={_coord => this.setState({ coordinates: _coord })} />
                        </section>
                    </>
                ) : <Loading title="apartments data loading..." />}

            </>
        )
    }
}
const mapStateToProps = state => ({
    apartmentList: state.apartment.data.data,
    isDone: equals(state.apartment.status, 'done')
})

const mapDispatchToProps = dispatch => ({
    getApartments: () => dispatch(ApartmentActions.getApartmentsRequest()),
    updateApartment: (payload) => dispatch(ApartmentActions.updateApartmentRequest(payload)),
    createApartment: (payload) => dispatch(ApartmentActions.createApartmentRequest(payload)),
    removeApartment: (id) => dispatch(ApartmentActions.removeApartmentRequest(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditApartment));