import {
  put,
  call
} from 'redux-saga/effects'
import AuthActions from '../actions/auth'
import {
  history
} from '../reducers'
//signin
export function* signinRequest(api, action) {
  const {
    payload
  } = action;
  const response = yield api.postSignin(payload);
  if (response.ok) {
    localStorage.setItem("token", response.data.access_token)
    localStorage.setItem("role", response.data.role)
    localStorage.setItem("userID", response.data.userID)
    yield call(history.push, "/apartments")
    yield put(AuthActions.signinSuccess(response.data))
  } else {
    yield put(AuthActions.signinFailure(response.data))
  }
}

//signup
export function* signupRequest(api, action) {
  const {
    payload
  } = action;
  const response = yield api.postSingup(payload);
  if (response.ok) {
    localStorage.setItem("token", response.data.access_token)
    localStorage.setItem("role", response.data.role)
    localStorage.setItem("userID", response.data.userID)
    yield call(history.push, "/apartments")
    yield put(AuthActions.signupSuccess(response.data))
  } else {
    yield put(AuthActions.signupFailure(response.data))
  }
}


export function* logout() {
  console.log("ok")
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userID");
  yield call(history.push, "/");
}