
module.exports = function(gulp, config) {
	
	// Move the images into dist
	gulp.task('move-images', function() {
		return gulp.src(config.paths['images'])
			.pipe(gulp.dest('./dist/images'));
	});

};