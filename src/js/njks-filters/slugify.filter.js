(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(factory);
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory(/*&require('extend')*/);
	} else {
		// Browser globals (root is window)
		root.nunjucksSlugifyFilter = factory();
	}
}(this, function () {
	// Concat Nunjucks custom filter
	// var slugifyFilter = require('./njks-filters/slugify.filter');
	// Object.keys(slugifyFilter).forEach(function(key) {
	//		env.addFilter(key, slugifyFilter[key]);
	// });
	return {
		'slugify': function(text) {
			return text
				.toLowerCase()
				.replace(/ /g,'-')
				.replace(/[^\w-]+/g,'');
		}
	};
}));
	
