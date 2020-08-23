import Vue from 'vue'
import Vuex from 'vuex'
import { AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js'

const POOL_DATA = {
  UserPoolId: 'us-east-2_gi2UXA7ny',
  ClientId: '1n2vrkblsp00jpk9fnfa5mnjiu'
}
const USER_POOL = new CognitoUserPool(POOL_DATA)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: null
  },
  getters: {},
  /* mutations must be synchronous */
  mutations: {
    setUserAuth (state, auth) {
      state.auth = auth
    }
  },
  /* actions can be asynchronous but can only commit the state change after the async task is completed */
  actions: {
    // signup ({ commit }, userData: User) {
    //
    // },
    signin ({ commit }, payload) {
      const authData = {
        Username: payload.email,
        Password: payload.password
      }
      const authDetails = new AuthenticationDetails(authData)
      const userData = {
        Username: authData.Username,
        Pool: USER_POOL
      }
      const cognitoUser = new CognitoUser(userData)
      cognitoUser.authenticateUser(authDetails, {
        onSuccess (result: CognitoUserSession) {
          console.log(result)
          commit('setUserAuth', result)
        },
        onFailure (err) {
          console.log(err)
        }
      })
    }
  },
  modules: {}
})
