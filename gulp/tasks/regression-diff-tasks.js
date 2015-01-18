
var path = require('path');

var imageDiff = require('gulp-image-diff');
var del = require('del');




function generateDiffImagePath(referencePath, comparePath) {
	var referenceInfo = parseImagePathWithDashFormat(referencePath);
	var compareInfo = parseImagePathWithDashFormat(comparePath);

	var fileNameParts = [
		referenceInfo.page,
		compareInfo.date,
		compareInfo.browser,
		compareInfo.os,
		referenceInfo.browser,
		referenceInfo.os,
		'diff.png'
	];

	var fileName = '';
	fileNameParts.forEach(function(part) {
		fileName += (fileName === '' ? '' : '--') + (part || 'unspecified');
	});

	var savePath = './src/regression-testing/diffs/';
	return path.join(savePath, fileName);
}

function parseImagePathWithDashFormat(path) {
	if(path) {
		var pathPieces = path.split(/\\|\//);
		var fileName = pathPieces[pathPieces.length-1];
		var fileNamePieces = fileName.split('--');

		// The browser or OS could be at the end, so strip the extension
		var browserMatches = (fileNamePieces[2] || '').match(/(.*?)(?:.png)?$/);
		var osMatches = (fileNamePieces[3] || '').match(/(.*?)(?:.png)?$/);

		return {
			'page': fileNamePieces[0] || undefined,
			'date': fileNamePieces[1] || undefined,
			'browser': browserMatches ? browserMatches[1] : undefined,
			'os': osMatches ? osMatches[1] : undefined
		};
	}

	return {};
}





module.exports = function(gulp, config) {


	// Move the regression json reports and diff images into the dist folder
	gulp.task('move-regression-analyses-files', function() {
		return gulp.src(config.paths['regression-analysis-files'])
			.pipe(gulp.dest('./dist/regression-testing'));
	});
	

	// Clears the regression diffs folder
	// to get rid of any old diffs because we don't want stragglers if the filenames aren't the same anymore
	gulp.task('regression-analysis-build-clean', function(done) {
		del(['./src/regression-testing/diffs/'], done);
	});

	// Diff the full-page browser screenshots to the PSD design.
	// This is to make sure we stayed true to the design.
	// Be aware that these numbers might be worse than the comparing to Chrome numbers
	// because of the differences in font rendering, etc. 
	// Please see the overview page in the style guide for more info.
	gulp.task('diff-images-to-psd', function() {
		return gulp.src(['./src/regression-testing/crispin-mulberry-news/*.png', '!./src/regression-testing/crispin-mulberry-news/crispin-mulberry-news--2015-1-18--psd.png'])
			.pipe(imageDiff({
				pixelColorTolerance: 0.27,
				referenceImage: './src/regression-testing/crispin-mulberry-news/crispin-mulberry-news--2015-1-18--psd.png',
				differenceMapImage: generateDiffImagePath,
				logProgress: true
			}))
			.pipe(imageDiff.jsonReporter())
			.pipe(gulp.dest('./src/regression-testing/diff-analysis-report-psd.json'));
	});

	// Diff the full-page browser screenshots to Chrome.
	// This is to test/ensure a consistent look across all browsers.
	gulp.task('diff-images-to-chrome', function() {
		return gulp.src(['./src/regression-testing/crispin-mulberry-news/*.png', '!./src/regression-testing/crispin-mulberry-news/crispin-mulberry-news--2015-1-18--psd.png'])
			.pipe(imageDiff({
				pixelColorTolerance: 0.27,
				referenceImage: './src/regression-testing/crispin-mulberry-news/crispin-mulberry-news--2015-1-18--chrome-39.0.2171.99--win-8.1.png',
				differenceMapImage: generateDiffImagePath,
				logProgress: true
			}))
			.pipe(imageDiff.jsonReporter())
			.pipe(gulp.dest('./src/regression-testing/diff-analysis-report-chrome.json'));
	});


};