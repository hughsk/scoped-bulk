# scoped-bulk [![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Run a command from every installed npm package under a certain scope. Useful
in combination with [district](http://github.com/hughsk/district).

## CLI Usage

[![NPM](https://nodei.co/npm/scoped-bulk.png)](https://nodei.co/npm/scoped-bulk/)

``` bash
Usage:
  scoped-bulk <namespace> <command...>
```

Where `<namespace>` is the package namespace to use, and `<command...>` is a
command to run from your shell in each scoped package.

For example, running the following in your project root might yield something
like this:

``` bash
scoped-bulk scoped ls -A
```

``` bash
node_modules/@scoped/1
> ls -A

.gitkeep

node_modules/@scoped/2
> ls -A

.gitkeep

node_modules/@scoped/3
> ls -A

.gitkeep

node_modules/@scoped/4
> ls -A

.gitkeep
```

You can use this, for example, to install the dependencies of locally scoped
modules:

``` bash
scoped-bulk scoped npm install --production
```

## License

MIT. See [LICENSE.md](http://github.com/hughsk/scoped-bulk/blob/master/LICENSE.md) for details.
