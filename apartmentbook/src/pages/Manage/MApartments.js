import React, {useEffect} from 'react';
import Table from "../../components/Table";
import Loading from '../../components/Loading';
import { equals } from 'ramda';
import { connect } from 'react-redux';
import ApartmentActions from '../../actions/apartment';
import UserActions from '../../actions/user';

function MApartments({
    getApartments,
    getUsers,
    userList,
    apartmentList,
    removeApartment,
    isDone
}) {
    const header = [
        {
            id: 'no',
            title: 'No'
        },
        {
            id: 'name',
            title: 'Name'
        },
        {
            id: 'size',
            title: "Floor Area Size"
        },
        {
            id: 'price',
            title: "Price Per Month"
        },
        {
            id: 'roomCount',
            title: "Number of Rooms"
        },
        {
            id: 'coordinates',
            title: "Geolocation Coordinates"
        },
        {
            id: 'createdAt',
            title: "Created Date"
        },
        {
            id: 'realtor_id',
            title: "Associated Realtor"
        },
        {
            id: 'status',
            title: "Rentable"
        }
    ];
    
    const formatData = (apartmentList) => {
        let tempApartments = apartmentList;
        if(localStorage.getItem("role") == "1") tempApartments = tempApartments.filter(apartment=> apartment.userID == localStorage.getItem("userID"))
        
        return tempApartments.map(apartment=>{
            return {
                ...apartment, 
                coordinates: [apartment.latitude, apartment.longitude], 
                status: apartment.status === 0 ? "rentable" : "rented",
                realtor_id: userList && userList.find(user=>user.id === apartment.userID) && userList.find(user=>user.id === apartment.userID).email,
            }
        })
    }
    useEffect(()=> {
        getApartments();
        getUsers();
    }, [])
    return (
        <>
           {isDone ? 
            <Table 
                header={header} 
                data={formatData(apartmentList)} 
                actionType={'apartment'} 
                removeApartment={removeApartment} 
                getApartments={getApartments} 
            /> : <Loading title="apartments data loading..." />}
        </>
    )
}
const mapStateToProps = state => ({
    apartmentList: state.apartment.data.data,
    userList: state.user.data.data,
    isDone: equals(state.apartment.status, 'done')
})

const mapDispatchToProps = dispatch => ({
    getApartments: () => dispatch(ApartmentActions.getApartmentsRequest()),
    getUsers: () => dispatch(UserActions.getUsersRequest()),
    removeApartment: (id) => dispatch(ApartmentActions.removeApartmentRequest(id))
})
  
export default connect(mapStateToProps, mapDispatchToProps)(MApartments);