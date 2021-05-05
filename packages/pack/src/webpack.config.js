const path = require('path')

console.log('Packaging with Phala-pack...')
console.log('Entry point: ', path.resolve('./src/index.tsx'))

module.exports = {
  entry: path.resolve('./src/index.tsx'),
  mode: 'development',
  output: {
    filename: 'main.js',
    libraryTarget: 'commonjs',
    path: path.resolve('./public/')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  externals: [
    '@phala/nng-router',
    '@phala/react-hooks',
    'next/link',
    'next/router',
    'nextjs-redirect',
    'react',
    'baseui',
    /^baseui\/.*/,
    'styletron-engine-atomic',
    'styletron-react'
  ]
}
