<template>
  <div>
    <router-link to="/add-product" tag="button">+ Add</router-link>
    <div class="row" v-for="(p, i) in products" :key="p.code">
      {{ i }}. {{p.code}} - {{ p.title }} - {{p.price}}
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'ProductList',
  data () {
    return {
      value: process.env.VUE_APP_SOME_NAME,
      products: [
        { code: 'SP-63478', title: 'Apple Airpods', price: '1000', category: 'Electronics', createdBy: 'Ashkan' },
        { code: 'SP-69439', title: 'Apple TV', price: '3000', category: 'Electronics', createdBy: 'Ashkan' },
        { code: 'SP-10385', title: 'Nike Shoes', price: '1000', category: 'Clothes', createdBy: 'Ashkan' },
        { code: 'SP-83658', title: 'Nike T-Shirt', price: '50', category: 'Clothes', createdBy: 'Ashkan' },
        { code: 'SP-80234', title: 'Sunglasses', price: '900', category: 'Beauty', createdBy: 'Ashkan' }
      ]
    }
  },
  beforeCreate () {
    // sdf sdf
  },
  created () {
    // sdf sdf
  }
})
</script>

<style scoped>

.row {
  margin: 10px 10px;
}
</style>
