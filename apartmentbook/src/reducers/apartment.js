import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { ApartmentTypes } from '../actions/apartment'

const initialState = Immutable({
  status: "",
  data: "",
  updateData: "",
  removeData: "",
  createData: ""
})

//get apartments
const getApartmentsRequest = (state, action) =>
    state.merge({ ...state, status: 'pending'})
const getApartmentsSuccess = (state, action) => {
  const data = action.response;
  return state.merge({
    ...state,
    status: 'done',
    data: data
  })
}
const getApartmentsFailure = (state, action) => 
    state.merge({...state, status: 'error'})

//update apartment
const updateApartmentRequest = (state, action) =>
    state.merge({ ...state, status: 'pending'})
const updateApartmentSuccess = (state, action) => {
  const updateData = action.response;
  return state.merge({
    ...state,
    status: 'done',
    updateData: updateData
  })
}
const updateApartmentFailure = (state, action) => 
    state.merge({...state, status: 'error'})
    
//remove apartment
const removeApartmentRequest = (state, action) =>
    state.merge({ ...state, status: 'pending'})
const removeApartmentSuccess = (state, action) => {
  const removeData = action.response;
  return state.merge({
    ...state,
    status: 'done',
    removeData: removeData
  })
}
const removeApartmentFailure = (state, action) => 
    state.merge({...state, status: 'error'})

//create apartment
const createApartmentRequest = (state, action) =>
    state.merge({ ...state, status: 'pending'})
const createApartmentSuccess = (state, action) => {
  const createData = action.response;
  return state.merge({
    ...state,
    status: 'done',
    createData: createData
  })
}
const createApartmentFailure = (state, action) => 
    state.merge({...state, status: 'error'})


export const reducer = createReducer(initialState, {
  //get apartments
  [ApartmentTypes.GET_APARTMENTS_REQUEST]: getApartmentsRequest,
  [ApartmentTypes.GET_APARTMENTS_SUCCESS]: getApartmentsSuccess,
  [ApartmentTypes.GET_APARTMENTS_FAILURE]: getApartmentsFailure,

  // update apartment
  [ApartmentTypes.UPDATE_APARTMENT_REQUEST]: updateApartmentRequest,
  [ApartmentTypes.UPDATE_APARTMENT_SUCCESS]: updateApartmentSuccess,
  [ApartmentTypes.UPDATE_APARTMENT_FAILURE]: updateApartmentFailure,

  // remove apartment
  [ApartmentTypes.REMOVE_APARTMENT_REQUEST]: removeApartmentRequest,
  [ApartmentTypes.REMOVE_APARTMENT_SUCCESS]: removeApartmentSuccess,
  [ApartmentTypes.REMOVE_APARTMENT_FAILURE]: removeApartmentFailure,

  // create apartment
  [ApartmentTypes.CREATE_APARTMENT_REQUEST]: createApartmentRequest,
  [ApartmentTypes.CREATE_APARTMENT_SUCCESS]: createApartmentSuccess,
  [ApartmentTypes.CREATE_APARTMENT_FAILURE]: createApartmentFailure,
})
