import React from 'react';
import './App.css';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { store, history } from './reducers';
import { Provider } from 'react-redux';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Layout from './components/Layout';
import Apartments from './pages/Apartments';
import EditApartment from './pages/EditApartment';
import EditUsers from './pages/EditUsers';
import EditRealtors from './pages/EditRealtors';
import { MUsers, MRealtors, MApartments } from './pages/Manage'

const renderWithLayout = (Component) => <Layout isAuthenticated={localStorage.getItem("token")}>{Component}</Layout>;
const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route
            path="/"
            exact
            render={() => renderWithLayout(<Login />)}
          />
          <Route
            path="/signup"
            exact
            render={() => renderWithLayout(<Signup />)}
          />
          <PrivateRoute
            path="/apartments"
            exact
            role={[0, 1, 2]}
            render={() => renderWithLayout(<Apartments />)}
          />
          <PrivateRoute
            path="/editapartment/:slug"
            exact
            role={[0, 1, 2]}
            render={() => renderWithLayout(<EditApartment />)}
          />
          <PrivateRoute
            path="/users"
            exact
            role={[0]}
            render={() => renderWithLayout(<MUsers />)}
          />
          <PrivateRoute
            path="/editusers/:id"
            exact
            role={[0]}
            render={() => renderWithLayout(<EditUsers />)}
          />
          <PrivateRoute
            path="/realtors"
            exact
            role={[0]}
            render={() => renderWithLayout(<MRealtors />)}
          />
          <PrivateRoute
            path="/editrealtors/:id"
            exact
            role={[0]}
            render={() => renderWithLayout(<EditRealtors />)}
          />
          <PrivateRoute
            path="/manageapartments"
            exact
            role={[0]}
            render={() => renderWithLayout(<MApartments />)}
          />
        </Switch>
      </Router>
    </Provider>
  );
}
const PrivateRoute = ({ role, ...rest }) => {
  console.log("role", role)
  const isAuthenticated = localStorage.getItem("token");
  if (isAuthenticated) {
    if (role.includes(parseInt(localStorage.getItem('role')))) {
      return (<Route {...rest} />)
    } else {
      return (<Redirect to={{
        pathname: '/apartments',
        state: { from: rest.location }
      }} />)
    }
  } else {
    return (<Redirect to={{
      pathname: '/',
      state: { from: rest.location }
    }} />)
  }
}

export default App;
