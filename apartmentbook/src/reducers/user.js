import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { UserTypes } from '../actions/user'

const initialState = Immutable({
  status: "",
  data: "",
  updateData: "",
  removeData: "",
  createData: ""
})

//get users
const getUsersRequest = (state, action) =>
    state.merge({ ...state, status: 'pending'})
const getUsersSuccess = (state, action) => {
  const data = action.response;
  return state.merge({
    ...state,
    status: 'done',
    data: data
  })
}
const getUsersFailure = (state, action) => 
    state.merge({...state, status: 'error'})

//update user
const updateUserRequest = (state, action) =>
    state.merge({ ...state, status: 'pending'})
const updateUserSuccess = (state, action) => {
  const updateData = action.response;
  return state.merge({
    ...state,
    status: 'done',
    updateData: updateData
  })
}
const updateUserFailure = (state, action) => 
    state.merge({...state, status: 'error'})

//remove user
const removeUserRequest = (state, action) =>
    state.merge({ ...state, status: 'pending'})
const removeUserSuccess = (state, action) => {
  const removeData = action.response;
  return state.merge({
    ...state,
    status: 'done',
    removeData: removeData
  })
}
const removeUserFailure = (state, action) => 
    state.merge({...state, status: 'error'})

//create user
const createUserRequest = (state, action) =>
    state.merge({ ...state, status: 'pending'})
const createUserSuccess = (state, action) => {
  const createData = action.response;
  return state.merge({
    ...state,
    status: 'done',
    createData: createData
  })
}
const createUserFailure = (state, action) => 
    state.merge({...state, status: 'error'})


export const reducer = createReducer(initialState, {
  //get users
  [UserTypes.GET_USERS_REQUEST]: getUsersRequest,
  [UserTypes.GET_USERS_SUCCESS]: getUsersSuccess,
  [UserTypes.GET_USERS_FAILURE]: getUsersFailure,

  // update user
  [UserTypes.UPDATE_USER_REQUEST]: updateUserRequest,
  [UserTypes.UPDATE_USER_SUCCESS]: updateUserSuccess,
  [UserTypes.UPDATE_USER_FAILURE]: updateUserFailure,

  // remove user
  [UserTypes.REMOVE_USER_REQUEST]: removeUserRequest,
  [UserTypes.REMOVE_USER_SUCCESS]: removeUserSuccess,
  [UserTypes.REMOVE_USER_FAILURE]: removeUserFailure,

  // create user
  [UserTypes.CREATE_USER_REQUEST]: createUserRequest,
  [UserTypes.CREATE_USER_SUCCESS]: createUserSuccess,
  [UserTypes.CREATE_USER_FAILURE]: createUserFailure,
})
