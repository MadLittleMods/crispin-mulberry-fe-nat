require(['jquery', './lib/jquery-carouselss-standalone', 'global'], function($, CarouselSS, global_script) {
	$(document).ready(function() {

		var $carousel = $('.carousel').carouselss({
			'interval': 2000
		});

		// Change the thumbnail list to be centered instead of justified if less than 4 thumbs
		var thumb_list = $carousel.find('.carousel-thumbnail');
		//console.log(thumb_list.length);
		if(thumb_list.length < 4) {
			$carousel.find('.thumbnail-holder').css({
				'text-align': 'center',
				'text-justify': 'auto'
			});
		}



		// List toggle blocks
		$('.js-toggle-block-handle').on('click keydown', function(e) {
			// If click or spacebar, or enter is pressed
			if(e.type === 'click' || (e.type === 'keydown' && (e.keyCode === 32 || e.keyCode === 13))) {
				var $block = $(this).parents('.toggle-block');
				$block.toggleClass('is-collapsed');
				
				// Asume the content was already expaned if they forgot the `aria-expanded` attribute
				var isCurrentlyExpanded = $(this).attr('aria-expanded') || 'true';

				$(this).attr({
					// `aria-expanded` goes on the button and the controlled content
					'aria-expanded': isCurrentlyExpanded === 'true' ? 'false' : 'true'
				});

				var $content = $block.find('.toggle-block-content');

				// Toggle the content. We normally would do this in CSS reacting to the `.is-collapsed` class but
				// since we used a `max-height` transition. The focus still gets to items in the collapsed box
				// `aria-hidden` doesn't stop focus on child items
				$content.slideToggle(200);

				$content.attr({
					// We want to toggle, so do the opposite
					// `aria-expanded` goes on the button and the controlled content
					'aria-expanded': isCurrentlyExpanded === 'true' ? 'false' : 'true',
					// We set hidden when it is not expanded.
					'aria-hidden': isCurrentlyExpanded === 'true' ? 'true' : 'false'
				});

				// Stop the page from scrolling down when we push space bar
				if(e.type === 'keydown' && e.keyCode === 32) {
					e.preventDefault();
				}
			}
		});

		
	});

});