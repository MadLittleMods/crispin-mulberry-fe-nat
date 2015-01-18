(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['html5shiv', 'jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory(null, require('jquery'));
	} else {
		// Browser globals (root is window)
		root.requireConfig = factory(null, root.$);
	}
}(this, function(shiv, $) {

	"use strict";


	$(document).ready(function() {

		// Cross-browser Input placeholder
		$('[placeholder]').focus(function() { // Clear on focus
			var input = $(this);
			// Ift the placeholder text is inside
			// Remove the placeholder text, so that the user can type what they wanted
			if (input.val() === input.attr('placeholder')) {
				input.val('');
				input.removeClass('placeholder');
			}
		}).blur(function() { // Put placeholder back on blur
			var input = $(this);
			// If there is no text in the field or the text is the same as the placeholder,
			// when the text field is blurred, put the placeholder back in
			if (!input.val().length || input.val() === input.attr('placeholder')) {
				input.addClass('placeholder');
				input.val(input.attr('placeholder'));
			}
		}).blur();
		// Clear input on submit if it has the placeholder text
		$('[placeholder]').parents('form').submit(function() {
			$(this).find('[placeholder]').each(function() {
				var input = $(this);
				if (input.val() === input.attr('placeholder')) {
					input.val('');
				}
			});
		});


	});

}));