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
		root.nunjucksConcatFilter = factory();
	}
}(this, function () {
	// Slugify Nunjucks custom filter
	// var concatFilter = require('./njks-filters/concat.filter');
	// Object.keys(concatFilter).forEach(function(key) {
	//		env.addFilter(key, concatFilter[key]);
	// });
	return {
		'concat': function(listArray) {
			return listArray.concat(Array.prototype.slice.call(arguments, 1, arguments.length));
		}
	};
}));