// @flow

const fs = require('fs');
const path = require('path');
const arrify = require('arrify');
const readPkgUp = require('read-pkg-up');

const { path: packageJson, pkg } = readPkgUp.sync({
  cwd: process.env.INIT_CWD || process.cwd(),
});

const root = path.dirname(packageJson);
const resolve = path.resolve.bind(null, root);

const has = (obj, path) => {
  // Regex explained: https://regexr.com/58j0k
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);

  return !!pathArray.reduce((prevObj, key) => prevObj && prevObj[key], obj);
};

const hasFile = (f /*: string */) => fs.existsSync(resolve(f));
const hasPkgProp = (props) => arrify(props).some((prop) => has(pkg, prop));

const hasPkgSubProp = (pkgProp /*: string */) => (...props /*: string[] */) =>
  hasPkgProp(arrify(props).map((p) => `${pkgProp}.${p}`));

const hasDep = hasPkgSubProp('dependencies');
const hasDevDep = hasPkgSubProp('devDependencies');
const hasPeerDep = hasPkgSubProp('peerDependencies');
const hasScript = hasPkgSubProp('scripts');
const hasAnyDep = (...args /*: string[] */) =>
  [hasDep, hasDevDep, hasPeerDep].some((fn) => fn(...args));

const { directories = {} } = pkg;

module.exports = {
  pkg,
  root,
  dirs: directories,
  dir: (name /*: string */) /*: string */ => resolve(directories[name] || name),
  nodeModules: resolve('node_modules'),
  hasDep,
  hasDevDep,
  hasPeerDep,
  hasAnyDep,
  hasScript,
  hasPkgProp,
  hasFile,
};
