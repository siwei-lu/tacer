# tacer [![CircleCI](https://circleci.com/gh/IdanLoo/tacer.svg?style=svg)](https://circleci.com/gh/IdanLoo/tacer)

A easier way to create a Javascript project. You can create a project template and reuse it.

## How to use

### Install globally

```sh
npm install -g tacer
```

### Via npx

```sh
npx tacer react path/to/project
```

### Usage

```sh
tacer <template> [path]
```

- template: `required`

  There are some out-of-box templates now.

  - [react](https://github.com/IdanLoo/tacer-template-react): React + TypeScript + Jest + styled-components
  - [koa](https://github.com/IdanLoo/tacer-template-koa): Koa + TypeScript + Jest
  - [lib](https://github.com/IdanLoo/tacer-template-lib): A library template for published to npmjs
  - [bin](https://github.com/IdanLoo/tacer-template-bin): A binary template

- path: `optional`

  default: `process.cwd()`

  The path of the new project located.

## Release

### v0.5.1

#### Feats:

- bootstrap itself.

- rewrite almost every things, make it dependent from templates.

### v0.3.3

#### Fixes:

- uncompress error

### v0.3.1

#### Chores:

- update readme

- rewrite copyDir function

### v0.3.0

#### Feats:

- rewrite by Typescript

- add user template

### v0.2.0

#### Feats:

- wx-component template

#### Fixes:

- `--version` bug

### v0.1.1

#### Fixes:

- Cannot find module '@babel/runtime/regenerator'

### v0.1.0

#### Feats:

- default value for inputing
- multi-template support
- node template

#### Chores:

- export some functions
- use rollup for bundling instead of webpack

### v0.0.2

#### Feats:

- create project with template

#### Fixes:

- error usage doc

## Have Fun!
