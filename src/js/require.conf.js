(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(factory);
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	} else {
		// Browser globals (root is window)
		root.requireConfig = factory();
	}
}(this, function() {

	"use strict";

	var config = {
		paths: {
			'html5shiv': './lib/html5shiv',

			'jquery': './lib/jquery-1.11.1',

			'amd-loader': 'lib/amd-loader',
			'hbs': 'lib/require-hbs'
		}
	};

	// If in amd environment
	if (typeof define === 'function' && define.amd) {
		require.config(config);
	}

	return config;

}));