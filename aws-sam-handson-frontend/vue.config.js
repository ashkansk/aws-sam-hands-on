// vue.config.js
module.exports = {
  devServer: {
    port: 9000,
    proxy: 'http://localhost:8080'
  }
  // other Vue config options ...
}
