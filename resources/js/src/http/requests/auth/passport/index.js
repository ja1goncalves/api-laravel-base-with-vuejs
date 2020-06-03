import axios from '../../../axios/index.js'
import store from '../../../../store/store.js'
import authConfig from '../../../../../auth_config.json'

// Token Refresh
let isAlreadyFetchingAccessToken = false
let subscribers = []

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

function bodyRefreshToken (refreshToken) {
  return {
    grand_type: 'refresh_token',
    client_id: authConfig.clientId,
    client_secret: authConfig.clientSecret,
    refresh_token: refreshToken,
    scope: ''
  }
}

function onAccessTokenFetched (access_token) {
  subscribers = subscribers.filter(callback => callback(access_token))
}

function addSubscriber (callback) {
  subscribers.push(callback)
}

export default {
  init () {
    axios.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      // const { config, response: { status } } = error
      const { config, response } = error
      const originalRequest = config

      // if (status === 401) {
      if (response && response.status === 401) {
        if (!isAlreadyFetchingAccessToken) {
          isAlreadyFetchingAccessToken = true
          store.dispatch('auth/fetchAccessTokenPassport')
            .then((response) => {
              const accessToken = response.access_token
              isAlreadyFetchingAccessToken = false
              onAccessTokenFetched(accessToken)
            })
        }

        const retryOriginalRequest = new Promise((resolve) => {
          addSubscriber(accessToken => {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`
            resolve(axios(originalRequest))
          })
        })
        return retryOriginalRequest
      }
      return Promise.reject(error)
    })
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
    return axios.post('/oauth/token', bodyRefreshToken(localStorage.getItem('refreshToken')))
  }
}
