import {
  put,
  call
} from 'redux-saga/effects'
import UserActions from '../actions/user'
import {
  history
} from '../reducers'
import {
  logout
} from './auth'

//get Users
export function* getUsersRequest(api, action) {
  const response = yield api.getUsers();
  if (response.ok) {
    yield put(UserActions.getUsersSuccess(response.data))
  } else {
    if (response.status === 403) {
      yield call(logout);
    }
    yield put(UserActions.getUsersFailure())
  }
}

//update User
export function* updateUserRequest(api, action) {
  const {
    payload
  } = action;
  const response = yield api.updateUser(payload);
  if (response.ok) {
    yield put(UserActions.updateUserSuccess(response.data))
  } else {
    if (response.status === 403) {
      yield call(logout);
    }
    yield put(UserActions.updateUserFailure())
  }
}


//remove User
export function* removeUserRequest(api, action) {
  const {
    payload
  } = action;
  const response = yield api.removeUser(payload);
  if (response.ok) {
    yield put(UserActions.removeUserSuccess(response.data))
  } else {
    if (response.status === 403) {
      yield call(logout);
    }
    yield put(UserActions.removeUserFailure())
  }
}

//create User
export function* createUserRequest(api, action) {
  const {
    payload
  } = action;
  const response = yield api.createUser(payload);
  if (response.ok) {
    yield call(history.goBack);
    yield put(UserActions.createUserSuccess(response.data))
  } else {
    if (response.status === 403) {
      yield call(logout);
    }
    yield call(history.goBack);
    yield put(UserActions.createUserFailure())
  }
}