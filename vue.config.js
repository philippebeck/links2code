const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "./node_modules/animadio/src/animadio.scss";`
      }
    }
  }
}

