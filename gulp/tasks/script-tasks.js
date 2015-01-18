
var extend = require('extend');

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var rjs = require('gulp-requirejs');


module.exports = function(gulp, config) {
	
	// Move any scripts that can't be bundled
	gulp.task('lint-scripts', function() {
		return gulp.src(config.paths['javascript'])
			.pipe(jshint({
				es3: true // http://jshint.com/docs/options/#es3
			}))
			.pipe(jshint.reporter('default'));
	});

	// Move any scripts that can't be bundled
	gulp.task('move-scripts', function() {
		return gulp.src(['./src/js/lib/require.js'])
			.pipe(gulp.dest('./dist/js/lib'));
	});

	// Make the javascript bundle for our page
	gulp.task('build-scripts', function() {
		var rjsConfig = extend({}, config.requireJSConfig, {
			baseUrl: './src/js', // The base directory from the builder which the modules are relative to
			name: './page', // which module to optimize
			out: 'main.js' // Where to save the compiled file
		});

		rjs(rjsConfig)
			// Minify the output
			.pipe(gulpif(!config.isDev, uglify()))
			.pipe(gulp.dest('./dist/js'));
	});

};