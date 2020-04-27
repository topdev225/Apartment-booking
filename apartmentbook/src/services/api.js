import apisauce from 'apisauce'

const Config = {
  API_URL: 'http://localhost:8080/api'
};

const authenticated = (api) => {
  api.setHeader('Authorization', localStorage.getItem('token'))
  return api
}

const create = (baseURL = Config.API_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    // 50 second timeout...
    timeout: 50000,
  })

  // auth
  const postSignin = payload => api.post('/auth/authenticate', payload);
  const postSingup = payload => api.post('/auth/register', payload);

  // apartments
  const getApartments = () => authenticated(api).get('/apartments');
  const updateApartment = (payload) => authenticated(api).put(`/apartments/${payload.id}`, payload);
  const removeApartment = (id) => authenticated(api).delete(`/apartments/${id}`);
  const createApartment = (payload) => authenticated(api).post(`/apartments`, payload);

  // users
  const getUsers = () => authenticated(api).get('/users');
  const updateUser = (payload) => authenticated(api).put(`/users/${payload.id}`, payload);
  const removeUser = (id) => authenticated(api).delete(`/users/${id}`);
  const createUser = (payload) => authenticated(api).post(`/users`, payload);

  return {
    postSignin,
    postSingup,

    getApartments,
    updateApartment,
    removeApartment,
    createApartment,

    getUsers,
    updateUser,
    removeUser,
    createUser
  }
}

export default {
  create
}