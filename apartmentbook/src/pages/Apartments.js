import React, {useEffect} from 'react'
import { connect } from 'react-redux';
import ApartmentActions from '../actions/apartment';
import ApartmentContainer from '../components/ApartmentContainer';
import Loading from '../components/Loading';
import { equals } from 'ramda';

function Apartments({
    getApartments,
    apartmentList,
    isDone
}) {
    useEffect(() => {
        getApartments()
    }, [])
    return (
        <>
            {isDone ? <ApartmentContainer apartments={apartmentList} /> : <Loading title="apartments data loading..." />}
        </>
    )
}
const mapStateToProps = state => ({
    apartmentList: state.apartment.data.data,
    isDone: equals(state.apartment.status, 'done')
})

const mapDispatchToProps = dispatch => ({
    getApartments: () => dispatch(ApartmentActions.getApartmentsRequest())
})
  
export default connect(mapStateToProps, mapDispatchToProps)(Apartments);
