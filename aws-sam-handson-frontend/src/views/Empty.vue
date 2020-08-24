<template>
  <div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

/**
 * This component is an initializer component which is meant to initialize the auth data
 * and after that navigate the user to a suitable route (for now we use 'home' for all,
 * but in a real world application may route admin user to an admin dashboard page).
 * NOTE that the empty route should be set to this component with no route guard.
 * Otherwise the route guard would trigger before this component is reached so the
 * auth data is not initialized, hence router cannot know the user is authenticated or not.
 */
export default Vue.extend({
  name: 'Empty',
  created() {
    this.$store.dispatch('initAuth').then(() =>
      // after the auth is initialized, we navigate to home, so that the router auth guard
      // knows all about the auth.
      // we can navigate to whichever route we want, based on any data,
      // for example based on whether user is admin or not.
      this.$router.replace('/home'));
  }
})
</script>
