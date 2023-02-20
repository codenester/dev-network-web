const basApiUrl = 'https://dev-network.up.railway.app/api'
// const basApiUrl = 'http://localhost:3030/api'
export default {
  query: {
    refresh: {
      url: `${basApiUrl}/auth/refresh`,
      name: 'refresh'
    },
    logout: {
      url: `${basApiUrl}/auth/logout`,
      name: 'logout'
    },
    me: {
      url: `${basApiUrl}/auth/me`,
      name: 'me'
    }
  },
  mutation: {
    login: {
      url: `${basApiUrl}/auth/login`,
      name: 'login'
    },
  }
}