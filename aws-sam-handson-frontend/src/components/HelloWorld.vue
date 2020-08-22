<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Environment specific value: {{ value }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: () => {
    return {
      value: process.env.VUE_APP_SOME_NAME
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
