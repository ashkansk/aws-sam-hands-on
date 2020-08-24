<template>
  <div id="app">
    <div id="nav">
      <span v-if="$store.state.auth.isAuthenticated">
        <router-link to="/">Home</router-link>
        |
        <router-link to="/about">About</router-link>
        |
        <router-link to="/products">Products</router-link>
        |
        <a href="#" @click="$store.dispatch('signout')">Sign Out</a>
      </span>
      <span v-if="!$store.state.auth.isAuthenticated">
        <router-link to="/signin">Sign In</router-link>
        |
        <router-link to="/signup">Sign Up</router-link>
        |
        <router-link to="/confirm">Confirm</router-link>
      </span>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Signin',
  created() {
    this.$store.dispatch('initAuth')
  }
})

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
