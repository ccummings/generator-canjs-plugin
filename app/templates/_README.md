<% if(githubUser && useTravis) { %>
[![Build Status](https://secure.travis-ci.org/<%= githubUser %>/<%= pluginFullName %>.png?branch=master)](https://travis-ci.org/<%= githubUser %>/<%= pluginFullName %>)
<% } %>

# <%= pluginFullName %>

<%= pluginDescription %>

## Download

- [production version](https://raw.github.com/<%= githubUser %>/<%= pluginFullName %>/master/dist/<%= pluginFullName %>.min.js)
- [development version](https://raw.github.com/<%= githubUser %>/<%= pluginFullName %>/master/dist/<%= pluginFullName %>.js)
- Install using bower:

	```bash
	$ bower install <%= pluginFullName %>
	```

## Installation

This plugin requires CanJS and can be used with any AMD compliant loader like AMD or Steal. It can also be used stand alone without any loader.

### Stand alone

Simply include CanJS and a DOM manipulation library, jQuery in this case, and the plugin in your HTML:

```html
<!-- Dependencies. -->
<script src="path/to/jquery.js"></script>
<script src="path/to/canjs.jquery.js"></script>

<!-- <%= pluginFullName %> -->
<script src="path/to/<%= pluginFullName %>.js"></script>
```

### AMD

```js
define(['can', 'path/to/<%= pluginFullName %>'], function(can){
	...
});
```

### Steal

```js
steal('can', 'path/to/<%= pluginFullName %>', function(can){
	...
});
```

## Credits

This plugin was built with [generator-canjs-plugin](https://github.com/ccummings/generator-canjs-plugin).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)