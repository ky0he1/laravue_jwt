const state = {
  token: null
}

const getters = {
  check (state) {
    return state.token ? true : false
  },
  token (state) {
    return state.token ? state.token : null
  }
}

const mutations = {
  login (state, token) {
    state.token = token
  },
  logout (state) {
    state.token = null
  }
}

const actions = {
  async setToken (context, token) {
    await context.commit('login', token)
  },
  async login (context, data) {
    const response = await axios.post('/api/login', data).catch(err => err.response)
    if (response.status === 401 || response.status === 500) {
      return response
    }
    await context.commit('login', response.data.access_token)
  },

  async logout (context, token) {
    await axios.post('/api/logout', null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    await context.commit('logout')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}