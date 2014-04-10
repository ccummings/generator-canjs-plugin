[![Build Status](https://secure.travis-ci.org/ccummings/generator-canjs-plugin.png?branch=master)](https://travis-ci.org/ccummings/generator-canjs-plugin)

# CanJS Plugin Generator

A generator for [Yeoman](http://yeoman.io/) that scaffolds a [CanJS](http://canjs.com) plugin.

For more information read the [CanJS Plugin Guide](http://canjs.com/guides/Plugins.html)

## Usage

Install Yeoman and `generator-canjs-plugin`

```bash
$ npm install -g yo generator-canjs-plugin
```

Make a new directory and `cd` into it:

```bash
mkdir my-plugin && cd my-plugin
```

Then run the generator to scaffold your plugin:

```bash
yo generator-canjs-plugin
```
## Workflow

All source files for the plugin reside in the `src` directory.

Qunit tests reside in the `test` directory.

Distributable versions of the plugin will be placed in the `dist` directory.

### Grunt tasks

The following Grunt tasks are available:

Runs jsbeautifier and JSHint:

```bash
grunt quality
```

Runs tests:

```bash
grunt test
```

Runs tests and generates distributable files:

```bash
grunt build
```

### Register with [Bower](http://bower.io/)

```bash
bower register <plugin-name> <git-endpoint>
```

Bower uses [git tags](http://git-scm.com/book/en/Git-Basics-Tagging) for versioning.

To publish a new version:

- Modify the version number in `bower.json`
- Tag a new version and push to origin

```bash
git add .
git commit -m 'Update to vX.Y.Z'
git tag -a vX.Y.Z -m 'vX.Y.Z'
git push --tags origin master
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
