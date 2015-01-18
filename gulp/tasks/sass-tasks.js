
var sass = require('gulp-sass');
var spriter = require('gulp-css-spriter');
var minifyCSS = require('gulp-minify-css');


module.exports = function(gulp, config) {

	// Compile our Sass
	gulp.task('sass', function() {
		return gulp.src(config.paths['top-level-sass'])
			.pipe(sass({
				//outputStyle: 'compressed'
			}))
			.pipe(spriter({
				'spriteSheet': './dist/images/spritesheet.png',
				'pathToSpriteSheetFromCSS': '../images/spritesheet.png'
			}))
			.pipe(minifyCSS({
				// Stop the property merging. 
				// The property merging affects color declarations in IE7
				// where we have to split up the hex and rgba fallbacks in separate selectors
				advanced: false
			}))
			// Save out our compiled sass for the site
			.pipe(gulp.dest('./dist/css'));
	});


};