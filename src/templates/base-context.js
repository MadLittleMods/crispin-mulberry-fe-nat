(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([/*'b'*/], factory);
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory(/*require('b')*/);
	} else {
		// Browser globals (root is window)
		root.basePageContext = factory();
	}
}(this, function (/* Dependencies */) {

	// We use underscores so it is easy to use in the nunjucks templates
	var context = {
		'pageTitle': '', // pageTitle + " | Crispin & Mulberry"

		// If you are adding/removing items, make sure to update the CSS percentages
		// We use an object so you can extend then reference an item to set it active
		'navItems': {
			'destinations': {
				'title': "Destinations",
				'link': "#0",
				'active': false
			},
			'getaways': {
				'title': "Getaways",
				'link': "#0",
				'active': false
			},
			'travelTips': {
				'title': "Travel Tips",
				'link': "#0",
				'active': false
			},
			'news': {
				'title': "News & Features",
				'link': "#0",
				'active': false
			},
			'contests': {
				'title': "Contests",
				'link': "#0",
				'active': false
			},
			'contact': {
				'title': "Contact Us",
				'link': "#0",
				'active': false
			}
		},
	};

	return context;
}));