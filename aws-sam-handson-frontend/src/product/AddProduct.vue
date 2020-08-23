<template>
  <div>
    <div>
      <div>
        <label for="code">
          Code:
          <input id="code" v-model="product.code"/>
        </label>
      </div>
      <div>
        <label for="title">
          Title:
          <input id="title" v-model="product.title"/>
        </label>
      </div>
      <div>
        <label for="category">
          Category:
          <input id="category" v-model="product.category"/>
        </label>
      </div>
      <div>
        <label for="price">
          Price:
          <input id="price" v-model="product.price"/>
        </label>
      </div>
    </div>
    <div>
      <button @click="save()">Save</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { ProductModel } from '@/product/Product.model.ts'

export default Vue.extend({
  name: 'AddProduct',
  data () {
    return {
      product: new ProductModel()
    }
  },
  methods: {
    save () {
      console.log(this.product)
      this.authService.getAuthenticatedUser().getSession((err, session) => {
        if (err) {
          return
        }
        console.log('jwt token is: ')
        console.log(session.getAccessToken().getJwtToken())
        this.http.get('https://5exr5qdxh9.execute-api.us-east-1.amazonaws.com/dev/compare-yourself/', {
          headers: new Headers({ Authorization: session.getIdToken().getJwtToken() })
        })
      })
    },
    reset () {
      console.log('reset')
    }
  }
})

</script>

<style scoped>

</style>
