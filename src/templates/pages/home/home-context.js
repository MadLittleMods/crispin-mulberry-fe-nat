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
		root.homePageContext = factory(root['base-context'], root.extend);
	}
}(this, function (baseContext, extend) {

	var context = extend(true, {}, baseContext);
	context['navItems']['news']['active'] = true;

	// We use underscores so it is easy to use in the nunjucks templates
	context = extend({}, context, {
		'pageTitle': 'News & Features', // pageTitle + " | Crispin & Mulberry"

		'carouselItems': [
			{
				'title': "Downtown Baltimore",
				'description': "Check out the USS Torsk at Baltimore’s historic Maritime Museum.",
				'img_src': 'images/carousel/submarine.png'
			},
			{
				'title': "Exploring the Venetian",
				'description': "Enjoy the best gondola ride on this side of the Atlantic Ocean.",
				'img_src': 'images/carousel/venetian.png'
			},
			{
				'title': "London after Dark",
				'description': "Enjoy the pubs along the river Thames & get spectacular view from the London Eye.",
				'img_src': 'images/carousel/london.png'
			},
			{
				'title': "Mount Rushmore",
				'description': "Marvel at the majestic beauty of the Black Hills and come face to face with American history.",
				'img_src': 'images/carousel/mt-rushmore.png'
			}
		],
		'destinations': [
			"United States",
			"Europe",
			"Latin America",
			"South Pacific",
			"Caribbean",
			"Australia"
		],

		'getaways': [
			"Adventure Vacations",
			"Beach Vacations",
			"Cruise Vacations",
			"Culinary Vacations",
			"Family Vacations",
			"Luxury Vacations",
			"Romantic Vacations",
			"Ski Vacations"
		],

		'articles': [
			{
				'title': "Don’t Miss the Parades at DisneyWorld",
				'link': "#0",
				'thumbnail_img_src': "images/articles/disney-world.png",
				'content': "The parades at Disney World are a one of a kind celebration full of all your favorite Disney characters and music. The entertainment never stops as parades are scheduled throughout the entire day."
			},
			{
				'title': "Get You Kicks in Downtown Las Vegas",
				'link': "#0",
				'thumbnail_img_src': "images/articles/las-vegas.png",
				'content': "Get off the strip and check out what Old Vegas has to offer. From shark infested water slides to the nightly Fremont Street Experience it’s sure to please adventurers of all ages."
			},
			{
				'title': "Don’t Miss Deep Dish in Chicago",
				'link': "#0",
				'thumbnail_img_src': "images/articles/chicago.png",
				'content': "Deep dish pizza is as synonymous with Chicago as Thin Crust is to New York. Any way you slice it, any trip to the windy city is incomplete without an italian flavor explosion in your mouth."
			}
		],

		'videos': [
			{
				'title': "Team Mongoose",
				'link': "#0",
				'thumbnail_img_src': "images/videos/team-mongoose.png"
			},
			{
				'title': "St Paul’s Cathedral",
				'link': "#0",
				'thumbnail_img_src': "images/videos/st-paul-cathedral.png"
			},
			{
				'title': "Hollywood and Highland",
				'link': "#0",
				'thumbnail_img_src': "images/videos/hollywood-highland.png"
			},
			{
				'title': "Lake Wissota",
				'link': "#0",
				'thumbnail_img_src': "images/videos/lake-wissota.png"
			},
			{
				'title': "The Bellagio Fountains",
				'link': "#0",
				'thumbnail_img_src': "images/videos/bellagio-fountains.png"
			},
			{
				'title': "The Atlantic Coast",
				'link': "#0",
				'thumbnail_img_src': "images/videos/atlantic-coast.png"
			}
		],


		'contests': [
			{
				'content': "Win an all inclusive trip to visit the famous Yeti Shrine deep in the heart of Asia",
				'link': "#0",
				'thumbnail_img_src': "images/contests/yeti-shrine.png"
			},
			{
				'content': "Win a mystical trip to Bath that includes a guided tour of Stonehenge",
				'link': "#0",
				'thumbnail_img_src': "images/contests/stonehenge.png"
			}
		]
	});

	return context;
}));