// Include gulp
var gulp = require('gulp');
var gutil = require('gulp-util');

var runSequence = require('run-sequence');
var del = require('del');

// These are paths to the necessary src we need to "transform"
// This is not for task configuration!
var config = {
	paths: {
		'templates': ['./src/templates/**/*'],
		'templates-root-reference': './src/templates/',
		'sass': ['./src/scss/**/*'],
		'top-level-sass': ['./src/scss/all.scss', './src/scss/all-ie7.scss', './src/scss/all-ie8.scss', './src/scss/all-styleguide.scss', './src/scss/styleguide-styles.scss'],
		'images': ['./src/images/**/*'],
		'javascript': ['./src/js/**/*', '!./src/js/lib/**/*'],
		'regression-analysis-files': ['./src/regression-testing/**/*']
	},
	styleguidePaths: {
		'templates-root-reference': './src/styleguide/templates/',
		'overview-template': ['./src/styleguide/templates/overview.html'],
		'section-template': ['./src/styleguide/templates/section-view.html']
	},
	requireJSConfig: require('./src/js/require.conf'),
	// All of the custom filters for the templating
	nunjucksFilterList: ['./src/js/njks-filters/**/*.js'],

	// Define the paths and context we should use to compile the pages
	pages: {
		// template: context
		'./src/templates/pages/home/home.page.html': {
			'name': 'index', // name of the file
			'context': require('./src/templates/pages/home/home-context'),
		},
		'./src/templates/pages/extended/extended.page.html': {
			'name': 'extended', // name of the file
			'context': require('./src/templates/pages/extended/extended-context')
		}
	}
};


// `gulp --dev`
// When the `dev` flag is added
if(gutil.env.dev === true) {
	// Can be used with `gulp-if`
	config.isDev = true;
}



// Include the groups of tasks
var templateTasks = require('./gulp/tasks/template-tasks')(gulp, config);
var sassTasks = require('./gulp/tasks/sass-tasks')(gulp, config);
var scriptTasks = require('./gulp/tasks/script-tasks')(gulp, config);
var imageTasks = require('./gulp/tasks/image-tasks')(gulp, config);
var styleguideTasks = require('./gulp/tasks/styleguide-tasks')(gulp, config);
var regressionDiffTasks = require('./gulp/tasks/regression-diff-tasks')(gulp, config);





// Clears the distribution folder before running the other tasks
gulp.task('build-clean', function(done) {
	del(['./dist'], done);
});

// Rerun tasks when a file changes
gulp.task('watch', function() {
	gulp.watch(config.paths['sass'], ['sass']);
	gulp.watch(config.paths['templates'], ['compile-njks-templates']);
});



// `gulp regression-test`
// Generate the diff images and analysis reports
gulp.task('regression-analysis-build', function(callback) {
	runSequence(
		['regression-analysis-build-clean'],
		['diff-images-to-psd', 'diff-images-to-chrome']
	);
});

// `gulp complete-build`
// Complete build that will regenerate everything from the bare `src` folder and root documents
gulp.task('complete-build', function(callback) {
	runSequence(
		// We need to run the regression build first so that the diff images and reports are available
		// We could run multiple things in parallel on this first sequence
		// but `move-regression-analyses-files` needs the regression build to be done first on a complete build and that task is bundled into the `default` task.
		['regression-analysis-build'],
		['build-clean'],
		['default'],
		callback
	);
});

// Default Task
gulp.task('default', function(callback) {
	runSequence(
		['build-clean'],
		['sass', 'lint-scripts', 'build-scripts', 'compile-njks-templates', 'move-scripts', 'move-images', 'move-regression-analyses-files', 'styleguide', 'watch'],
		callback
	);
});

