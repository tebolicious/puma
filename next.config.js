
const { withUnoCSS } = require('unocss/next')

module.exports = withUnoCSS({
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com']
  }
})
