# tacer [![CircleCI](https://circleci.com/gh/IdanLoo/tacer.svg?style=svg)](https://circleci.com/gh/IdanLoo/tacer)

Create your own template and hide all bundling details.

## Intro

'Tacer' means 'to be silent' in Interlingua. What `tacer` does is making bundling process silent or invisible.

If you've used `create-react-app`, you must be suprised by its bundling process. You don't need install `babel`, `webpack` or `rollup` mannually. The only thing you should do you run `npm start`

Now, use `tacer` to create your own scaffold. All the bundling configures should be written once and used anywhere. Your project folder becomes simple and clear if `webpack.config.js`, `rollup.config.js` or `jest.config.js` are not in the folder.

## How To Use

### Install globally

```sh
npm install -g tacer
tacer react path/to/project
tacer https://github.com/IdanLoo/tacer-template-react path/to/project
```

### Via npx

```sh
npx tacer react path/to/project
npx tacer https://github.com/IdanLoo/tacer-template-react path/to/project
```

### Usage

```sh
tacer <template> [path]
```

- template: `required`, a package name or a git repository url.

  `tacer` always assume template is named with prefix `tacer-template-`, so it tries to download `tacer-template-react` if a `react` given.

  There are some out-of-box templates now.

  - [react](https://github.com/IdanLoo/tacer-template-react): React + TypeScript + Jest + styled-components
  - [koa](https://github.com/IdanLoo/tacer-template-koa): Koa + TypeScript + Jest
  - [lib](https://github.com/IdanLoo/tacer-template-lib): A library template for published to npmjs
  - [bin](https://github.com/IdanLoo/tacer-template-bin): A binary template

- path: `optional`

  default: `process.cwd()`

  The path of the new project located.

## How To Create Template

Althought I have provided some templates, they may not satisfy you. If you'd like to create one, go ahead.

Let's say we are going to create a template for Electron.

### Seed

The template of templates is alse a template whick called `tacer-template-seed`. So you can create like this

```sh
tacer seed /path/to/tacer-template-electron
```

Your will see a folder on the given path.

NOTICE: `tacer` always assume the package is named with prefix `tacer-template-`. So if you want to create an Electron template, you need name it as `tacer-template-electron`.

### Template

Create a folder named `template` in `/path/to/tacer-template-electron` and put some things (`package.json`, `index.js`, `.gitignore`, etc.) into it. You can just copy an existing project and rename as `template`.

### Handle Bundling

You may notice there is a `scripts` folder in `/path/to/tacer-template-electron`. Each script in this folder exports one function which can be called by tacer-script.

Add `"start": "tacer-script start"` and `"build": "tacer-script build"` scripts into `template/package.json`. You can add other commands as you like which provided in the `scripts` folder.

See more details in above templates.

### Validate

How could we know if the template works? Add a devDependency to the template.

```sh
npm install --save-dev file:..
// or
yarn add -D file:..
```

So that you can try `npm start`, `npm build` or other commands provided in the `tacer-template-electron`

## Have Fun!
