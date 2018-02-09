const path = require('path');
const app = require('./index');

test('root', () => {
  expect(app.root).toEqual(__dirname);
});

test('dir', () => {
  expect(app.dirs.src).toEqual('.');
  expect(app.dir('src')).toEqual(__dirname);
  expect(app.dir('foo')).toEqual(path.join(__dirname, 'foo'));
});

test('pkg', () => {
  expect(app.pkg.name).toEqual('about-this-app');
});

test('hasDevDep', () => {
  expect(app.hasDevDep('jest')).toBeTruthy();
  expect(app.hasDevDep('lodash')).toBeFalsy();
});

test('hasDep', () => {
  expect(app.hasDep('lodash')).toBeTruthy();
  expect(app.hasDep('jest')).toBeFalsy();
  expect(app.hasDep('foobar')).toBeFalsy();
  expect(app.hasDep('foobar', 'lodash')).toBeTruthy();
});

test('hasAnyDep', () => {
  expect(app.hasAnyDep('lodash')).toBeTruthy();
  expect(app.hasAnyDep('jest')).toBeTruthy();
  expect(app.hasAnyDep('foobar')).toBeFalsy();
  expect(app.hasAnyDep('foobar', 'lodash')).toBeTruthy();
  expect(app.hasAnyDep('foobar', 'jest')).toBeTruthy();
});

test('hasScript', () => {
  expect(app.hasScript('test')).toBeTruthy();
  expect(app.hasScript('foobar')).toBeFalsy();
  expect(app.hasScript('foobar', 'test')).toBeTruthy();
});

test('hasFile', () => {
  expect(app.hasFile('README.md')).toBeTruthy();
  expect(app.hasFile('MEMEME.md')).toBeFalsy();
});

test('hasPkgProp', () => {
  expect(app.hasPkgProp('license')).toBeTruthy();
  expect(app.hasPkgProp('foobar')).toBeFalsy();
});
