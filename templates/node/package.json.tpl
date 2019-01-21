{
  "name": "${name}",
  "version": "0.0.1",
  "description": "${description}",
  "main": "dist/index.js",
  "scripts": {
    "start": "npm run build && node index.js",
    "build": "rollup -c",
    "test": "mocha --recursive -r @babel/register test"
  },
  "repository": {
    "type": "git",
    "url": "git+${repository}"
  },
  "author": "${author}",
  "license": "MIT",
  "keywords": [

  ],
  "bugs": {
    "url": "${repository}/issues"
  },
  "homepage": "${repository}#readme",
  "devDependencies": {
    "@babel/core": "^7.2.2",
    "@babel/plugin-transform-runtime": "^7.2.0",
    "@babel/preset-env": "^7.2.3",
    "@babel/preset-flow": "^7.0.0",
    "@babel/register": "^7.0.0",
    "@babel/runtime": "^7.2.0",
    "chai": "^4.2.0",
    "mocha": "^5.2.0",
    "rollup": "^1.1.1",
    "rollup-plugin-babel": "^4.3.2",
    "rollup-plugin-terser": "^4.0.2"
  }
}
