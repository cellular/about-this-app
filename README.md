# about-this-app

[![Greenkeeper badge](https://badges.greenkeeper.io/cellular/about-this-app.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/cellular/about-this-app.svg?branch=master)](https://travis-ci.org/cellular/about-this-app)

Utility functions to query a project's package.json file.

```js
const app = require('about-this-app');
````

## Properties

### `root`

The app's root directory (where package.json is located)

### `pkg`
The parsed package.json

### `dirs`
The `directories` field (or an empty object)

## Methods

### `dir(name)`
The resolved path to a named directory. If the name is not found in `app.dirs` the absolute path to `<app.root>/<name>` is returned.

### `hasPkgProp(name)`
Returns whether `package.json` has a property with the given name
.
### `hasDep(name /*, name2, ... */)`
Returns whether `dependencies` contains any of the names.

### `hasDevDep(name /*, name2, ... */)`
Returns whether `devDependencies` contains any of the names.

### `hasPeerDep(name /*, name2, ... */)`
Returns whether `peerDependencies` contains any of the names.

### `hasAnyDep(name /*, name2, ... */)`
Returns whether any of the names is listed as any kind of dependency.

### `hasScript(name /*, name2, ... */)`
Returns whether `scripts` contains any of the names.

### `hasFile(name)`
Returns whether a file with the given name exists relative to `app.root`.

# License

MIT