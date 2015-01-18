(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['../../base-context', 'jquery'], (function($) {
			return factory($.extend);
		})($));
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory(require('../../base-context'), require('extend'));
	} else {
		// Browser globals (root is window)
		root.extendedPageContext = factory(root['base-context'], root.extend);
	}
}(this, function (baseContext, extend) {

	var context = extend(true, {}, baseContext);
	context['navItems']['contact']['active'] = true;

	context = extend({}, context, {
		'pageTitle': 'Extended' // pageTitle + " | Crispin & Mulberry"
	});

	return context;
}));