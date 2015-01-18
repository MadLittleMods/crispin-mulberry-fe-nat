
var fs = require('fs');
var extend = require('extend');

var marked = require('marked');
var markedRenderer = new marked.Renderer();

var rename = require('gulp-rename');
var kssStyleguide = require('gulp-kss-styleguide');
var nunjucksRender = require('gulp-nunjucks-render');
var sass = require('gulp-sass');
var rjs = require('gulp-requirejs');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');

var nunjucksConfigure = require('../lib/nunjucks-configure');



// Setup any custom markdown rendering
markedRenderer.heading = function (text, level) {
	var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

	return '<h' + level + '>' +
		'<a href="#' + escapedText + '" id="' + escapedText + '" class="heading-permalink" aria-hidden="true"></a>' +
		text +
	'</h' + level + '>';
};


module.exports = function(gulp, config) {

	// Generate the styleguide pages
	gulp.task('styleguide', function() {

		return gulp.src(config.paths['sass'])
			.pipe(kssStyleguide({
				sectionBuildCallback: function(context) {

					// We need to do this before each compile
					// to make sure no one else configured something in between each build
					nunjucksConfigure(
						nunjucksRender.nunjucks,
						config.nunjucksFilterList,
						config.styleguidePaths['templates-root-reference'],
						{
							'watch': false
						}
					);

					// Compile the template for the page
					return gulp.src(config.styleguidePaths['section-template'])
						.pipe(nunjucksRender(context))
						.pipe(rename({
							// dirname: 
							basename: 'section-' + context.currentRootReference
							//extname: ".html"
						}))
						.pipe(gulp.dest('./dist/styleguide'));
						
						
				},
				allSectionsBuiltCallback: function(context) {

					var overviewPageMarkdown = fs.readFileSync('./src/scss/styleguide.md').toString();
					var overviewPageContext = extend({}, context, {
						pageContent: marked(overviewPageMarkdown, {
							gfm: true,
							renderer: markedRenderer
						}),
						isOverview: true
					});

					var rjsConfig = extend({}, config.requireJSConfig, {
						baseUrl: './src/js', // The base directory from the builder which the modules are relative to
						name: './styleguide-page', // which module to optimize
						out: 'styleguide-main.js' // Where to save the compiled file
					});


					return [
						// Generate the overview page
						gulp.src(config.styleguidePaths['overview-template'])
							.pipe(nunjucksRender(overviewPageContext))
							.pipe(rename({
								// dirname: 
								basename: 'index'
								//extname: ".html"
							}))
							.pipe(gulp.dest('./dist/styleguide')),

						// Bundle the javascript for the styleguide
						rjs(rjsConfig)
							// Minify the output
							.pipe(gulpif(!config.isDev, uglify()))
							.pipe(gulp.dest('./dist/js'))
					];
				}
			}));
	});

};