# tacer

A easier way to create a Javascript project. You can create a project template and reuse it.


## How to use

### Install globally

```sh
npm install -g tacer
```

### Create and Use

```sh
# make the current directory to a tacer template named react
tacer add react
# create a new project using the react template
tacer react /path/to/project
```

## Template

Tacer supports two types of templates.

### .tpl

A file which named ends by .tpl will be parsed as ES6 template strings. So you can use `${...}` in this file.

```javascript
// package.json.tpl
{
    "name": "${name}",
    "version": "${version}
}
```

The `${name}` will be replaced with the project name, and the `${version}` will be replaced the project version, and the filename `package.json.tpl` will be replaced with `package.json`.

### .ejs

A file which named ends by .ejs will be parsed as ejs template. You can refer to [the tutorial](https://ejs.co) for more information.

```javascript
// package.json.ejs
{
    "name": "<%= name %>",
    "version": "<%= version %>"
}
```

### Params

Tacer provided some paramters to the template.

- name: `string`
- description: `string`
- repository: `string`
- author: `string`
- license: `string`
- version: `string`

## Release

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