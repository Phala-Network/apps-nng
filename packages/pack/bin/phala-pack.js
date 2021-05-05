const config = require('../src/webpack.config.js')
const webpack = require('webpack')

const compiler = webpack({ ...config })

const main = async () => {
  await new Promise((resolve, reject) => {
    compiler.run((err, res) => {
      if (err) {
        return reject(err)
      }
      resolve(res)
    })
  })
}

main()
