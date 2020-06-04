import axios from '../../../axios/index.js'
import router from "../../../../router";
import authConfig from '../../../../../auth_config.json'
import cookies from "../../../cookies";

function bodyOAuth (email, pwd) {
  return {
    grant_type: 'password',
    client_id: authConfig.clientId,
    client_secret: authConfig.clientSecret,
    username: email,
    password: pwd,
    scope: '*'
  }
}

function bodyRefreshToken (refreshToken = false) {
  return {
    grant_type: 'refresh_token',
    client_id: authConfig.clientId,
    client_secret: authConfig.clientSecret,
    refresh_token: refreshToken ? refreshToken : '',
    scope: ''
  }
}

export default {
  init () {
    axios.interceptors.request.use(function (request) {
        const token = cookies.getTokenByCookies();
        request.headers.Authorization = `Bearer ${token}`
        return request
    }, function (error) {
        return Promise.reject(error);
    })

    axios.interceptors.response.use((response) => {
      // Do something with response data
      return response;
    },(error) => {
      if (error.response.status === 401) {
          cookies.eraseTokenInCookie()
          router.push({ path: '/pages/login'})
      }
      return Promise.reject(error);
    });
  },
  login (email, pwd) {
    return axios.post('/oauth/token', bodyOAuth(email, pwd))
  },
  logout () {
      return axios.delete('/api/user/logout')
  },
  registerUser (name, email, pwd, pwd_confirmed) {
    return axios.post('/api/users', {
      name,
      email,
      password: pwd,
      password_confirmed: pwd_confirmed
    })
  },
  getUser () {
    return axios.get('/api/user')
  },
  refreshToken () {
    return axios.post('/oauth/token', bodyRefreshToken(cookies.getTokenByCookies(true)))
  }
}
