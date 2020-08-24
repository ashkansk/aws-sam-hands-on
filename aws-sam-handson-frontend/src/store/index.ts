import Vue from 'vue'
import Vuex from 'vuex'
import { AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js'
import router from '@/router';

const POOL_DATA = {
  UserPoolId: 'us-east-2_gi2UXA7ny',
  ClientId: '1n2vrkblsp00jpk9fnfa5mnjiu'
}
const USER_POOL = new CognitoUserPool(POOL_DATA)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      isAuthenticated: false,
      jwtToken: '',
      username: ''
    }
  },
  getters: {},
  /* mutations must be synchronous */
  mutations: {
    authenticateUser(state, userData) {
      state.auth.isAuthenticated = true
      state.auth.jwtToken = userData.jwtToken
      state.auth.username = USER_POOL.getCurrentUser()?.getUsername() ?? ''
    },
    signoutUser(state) {
      state.auth.isAuthenticated = false
      state.auth.jwtToken = ''
      state.auth.username = ''
    }
  },
  /* actions can be asynchronous but can only commit the state change after the async task is completed */
  actions: {
    // setSignoutTimer({ commit }, expirationTime) {
    //   setTimeout(() => {
    //     commit('signoutUser');
    //   }, expirationTime);
    // },
    signup({ commit }, payload) {

    },
    signin({ commit }, payload) {
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
        onSuccess(result: CognitoUserSession) {
          console.log(result)
          commit('authenticateUser', {
            jwtToken: result.getIdToken().getJwtToken()
          });

          router.replace('/');
        },
        onFailure(err) {
          console.log(err);
        }
      })
    },
    initAuth({ commit }) {
      // initialize the auth data (put jwt token in store if the user is logged in previously)
      // TODO also the code below should be changed to check the validity of the token and refresh the token if it's expired
      const currentUser = USER_POOL.getCurrentUser()
      if (currentUser) {
        currentUser.getSession(function (err: any, session: any) {
          if (err || !session || !session.isValid()) {
            return;
          }
          commit('authenticateUser', { jwtToken: session.getIdToken().getJwtToken() });
        })
      }
    },
    confirm({ commit }, payload) {
      console.log(payload);
    },
    signout({ commit }) {
      const currentUser = USER_POOL.getCurrentUser()
      if (currentUser) {
        currentUser.signOut();
        commit('signoutUser');
        router.replace('/signin')
      }
    }
  },
  modules: {}
})
