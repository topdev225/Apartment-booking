import {
  put,
  call
} from 'redux-saga/effects'
import ApartmentActions from '../actions/apartment'
import {
  history
} from '../reducers'
import {
  logout
} from './auth';

//get Aparments
export function* getApartmentsRequest(api, action) {
  const response = yield api.getApartments();
  if (response.ok) {
    yield put(ApartmentActions.getApartmentsSuccess(response.data))
  } else {
    if (response.status === 403) {
      yield call(logout);
    }
    yield put(ApartmentActions.getApartmentsFailure())
  }
}

//update Aparment
export function* updateApartmentRequest(api, action) {
  const {
    payload
  } = action;
  const response = yield api.updateApartment(payload);
  yield call(history.push, "/manageapartments");

  if (response.ok) {
    yield put(ApartmentActions.updateApartmentSuccess(response.data))
  } else {
    if (response.status === 403) {
      yield call(logout);
    }
    yield put(ApartmentActions.updateApartmentFailure())
  }
}


//remove Aparment
export function* removeApartmentRequest(api, action) {
  const {
    payload
  } = action;
  const response = yield api.removeApartment(payload);
  if (response.ok) {
    yield put(ApartmentActions.removeApartmentSuccess(response.data))
  } else {
    if (response.status === 403) {
      yield call(logout);
    }
    yield put(ApartmentActions.removeApartmentFailure())
  }
}

//create Aparment
export function* createApartmentRequest(api, action) {
  const {
    payload
  } = action;
  const response = yield api.createApartment(payload);
  if (response.ok) {
    yield call(history.push, "/manageapartments");
    yield put(ApartmentActions.createApartmentSuccess(response.data))
  } else {
    if (response.status === 403) {
      yield call(logout);
    }
    yield put(ApartmentActions.createApartmentFailure())
  }
}