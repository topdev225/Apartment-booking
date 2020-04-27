import { takeLatest, all } from 'redux-saga/effects'
import API from '../services/api'

import { AuthTypes } from '../actions/auth'
import { ApartmentTypes } from '../actions/apartment'
import { UserTypes } from '../actions/user'

import {
  signinRequest,
  signupRequest,
} from './auth'

import {
  getApartmentsRequest,
  updateApartmentRequest,
  removeApartmentRequest,
  createApartmentRequest
} from './apartment'

import {
  getUsersRequest,
  updateUserRequest,
  removeUserRequest,
  createUserRequest
} from './user';

const api = API.create();

export default function* root() {
  yield all([
    // ------------------------- App Sagas
    
    // ------------------------- Auth Sagas
    takeLatest(AuthTypes.SIGNIN_REQUEST, signinRequest, api),
    takeLatest(AuthTypes.SIGNUP_REQUEST, signupRequest, api),

    // ------------------------- Apartment Sagas
    takeLatest(ApartmentTypes.GET_APARTMENTS_REQUEST, getApartmentsRequest, api),
    takeLatest(ApartmentTypes.UPDATE_APARTMENT_REQUEST, updateApartmentRequest, api),
    takeLatest(ApartmentTypes.REMOVE_APARTMENT_REQUEST, removeApartmentRequest, api),
    takeLatest(ApartmentTypes.CREATE_APARTMENT_REQUEST, createApartmentRequest, api),

    // ------------------------- User Sagas
    takeLatest(UserTypes.GET_USERS_REQUEST, getUsersRequest, api),
    takeLatest(UserTypes.UPDATE_USER_REQUEST, updateUserRequest, api),
    takeLatest(UserTypes.REMOVE_USER_REQUEST, removeUserRequest, api),
    takeLatest(UserTypes.CREATE_USER_REQUEST, createUserRequest, api),
  ])
}
