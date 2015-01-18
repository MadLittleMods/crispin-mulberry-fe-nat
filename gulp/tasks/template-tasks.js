var es = require('event-stream');
var rename = require('gulp-rename');
var nunjucksRender = require('gulp-nunjucks-render');

var nunjucksConfigure = require('../lib/nunjucks-configure');


module.exports = function(gulp, config) {

	// Compile and move the templates into dist
	// We are using the dummy data provided in the PSD for the context of each page
	// In reality, we would probably grab from a CMS/database, cache the compile template, and serve it up
	gulp.task('compile-njks-templates', function() {

		nunjucksConfigure(
			nunjucksRender.nunjucks,
			config.nunjucksFilterList,
			config.paths['templates-root-reference'],
			{
				'watch': false
			}
		);

		function compilePage(page, pageName, pageContext) {
			return gulp.src(page)
				.pipe(nunjucksRender(pageContext))
				.pipe(rename({
					basename: pageName,
					//extname: ".html"
				}))
				.pipe(gulp.dest('./dist'));
		}


		var mergedStream = null;
		Object.keys(config.pages).forEach(function(page) {

			var pageName = config.pages[page].name;
			var pageContext = config.pages[page].context || {};
			var stream = compilePage(page, pageName, pageContext);

			// Merge the streams, if there is already one
			if(mergedStream) {
				mergedStream = es.merge(mergedStream, stream);
			}
			// Otherwise, just make it this one
			else {
				mergedStream = stream;
			}
		});
		return mergedStream;
	});

};