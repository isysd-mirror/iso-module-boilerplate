# iso-module-boilerplate

Isomorphic (ES6 + NodeJS) module boilerplate, with test framework integration.

 + Module written in ES6, but also available in NodeJS.
 + Install and build source code from git, not [npm, bower, centralized package manager].
 + Support a flat directory structure.
 + Also support `node_modules` folders for backwards compatability.
 + Run the same unit tests in NodeJS as well as the browser of your choice.

### ES6 + NodeJS Module

This package is available as both an ES6 module, as well as a NodeJS (CommonJS) module, thanks to the [esm](https://github.com/standard-things/esm) lib. To quote the esm README:

> Use `esm` to load the main ES module and export it as CommonJS.
> 
> main.js__
> ```js
> // Set options as a parameter, environment variable, or rc file.
> require = require("esm")(module/*, options*/)
> module.exports = require("./index.js")
> ```
> ____index.js__
> ```js
> // ESM syntax is supported.
> export {}
> ```
> :bulb: These files are automagically created with `npm init esm` or `yarn create esm`.

The only difference with this package and the esm boilerplate is we've renamed 'main.js' to 'index.node.js' for immediate recognition.

### Git Distribution

This package uses [gpm](https://github.com/isysd-mirror/gpm) to install packages from git source code instead of a centralized package manager. This eliminates middle men from the code distribution channel, and ensures the latest code is available.

Note that gpm is a peer dependency of this package, and must be installed globally to install this package. The following command will do the trick.

```
npm i -g https://github.com/isysd-mirror/gpm#isysd
```

After this, npm can be used as normal, since gpm is set in the `preinstall` hook in package.json.

```
gpm -n .. -t .. -u https -e -i .
```

This `preinstall` hook will install dependencies and devDendencies to the parent directory (..), preferring https to ssh as a git protocol.

A `postinstall` hook is currently required to ensure that the esm package is built, since the git branch does not include the build directory. The script is prettified here for your convenience.

``` node
try {
  require('../esm/esm.js')(module);
} catch (e) {
  require('child_process').execSync('npm i',
  {
    cwd: require('path').join('..', 'esm')
  })
}
```

This script will check if esm is built, and run `npm i` in ../esm if it is not.

### Flat + node_modules

This module is compatible with `node_modules` folders, as well as flat, deployable folders (i.e. every dependency in a single folder, side by side). The goal is for you to be able to deploy your isomorphic module to a browser environment as-is, without any bundling or mapping of package names.

It's easiest to understand by following an example installation.

##### Step 1 create JS source directory

```
mkdir js
cd js
```

##### Step 2 clone this module (and/or fork your own)

```
git clone https://github.com/isysd-mirror/iso-module-boilerplate.git
cd iso-module-boilerplate
$ ls
index.js  index.node.js  package.json  package-lock.json  README.md  test.js
$ ls ..
iso-module-boilerplate
```

##### Step 3 npm install

```shell
$ npm install

# List of files in parent (/js) directory no includes esm and iso-test repositories from git, as well as their dependencies
$ ls ..
esm  iso-module-boilerplate  iso-test  is-wsl  open  tree-kill

# Node_modules contains symbolic links to modules in parent directory
$ ls -l node_modules/
total 0
lrwxrwxrwx 1 isysd isysd  9 Apr 14 00:34 esm -> ../../esm
lrwxrwxrwx 1 isysd isysd 14 Apr 14 00:34 iso-test -> ../../iso-test
```

### Test Everywhere

Finally, this module imports [iso-test](https://github.com/isysd-mirror/iso-test) to run the same test code in both NodeJS as well as the browser of your choice. Write your unit test in test.js and call `finishTest` with the result. Anything beginning with "pass" will pass, everything else will fail, including uncaught errors.

Since iso-test is a devDependency, gpm does not install it automatically. Before testing, install it with:

```
gpm -n .. -t .. -u https -i . iso-test
```

[Travis CI](https://travis-ci.org/isysd-mirror/iso-module-boilerplate) is integrated to test your code using chromium, chrome, firefox, and safari, on linux, osx, and windows.
