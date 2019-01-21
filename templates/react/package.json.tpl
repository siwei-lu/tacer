{
  "name": "${name}",
  "version": "0.0.1",
  "description": "${description}",
  "main": "src/index.html",
  "scripts": {
    "start": "parcel index.html",
    "build": "parcel build index.html",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+${repository}"
  },
  "keywords": [
    
  ],
  "author": "${author}",
  "license": "MIT",
  "devDependencies": {
    "@babel/core": "^7.2.2",
    "parcel-bundler": "^1.11.0",
    "postcss-modules": "^1.4.1",
    "sass": "^1.16.1"
  },
  "dependencies": {
    "react": "^16.7.0",
    "react-dom": "^16.7.0",
    "react-router-dom": "^4.3.1"
  }
}
