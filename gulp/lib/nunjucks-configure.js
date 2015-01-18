var glob = require('glob');
var path = require('path');

function nunjucksConfigure(nunjucksInstance, filterList, nunjucksPathRoot, options) {
	options = options || {};
	var nunjucksRenderEnv = nunjucksInstance.configure(nunjucksPathRoot, options);

	/* */
	filterList.forEach(function(filterRequirePath) {

		var resultantFiles = glob.sync(filterRequirePath);
		resultantFiles.forEach(function(file) {
			var filter = require(path.join(process.cwd(), file));
			Object.keys(filter).forEach(function(key) {
				nunjucksRenderEnv.addFilter(key, filter[key]);
			});
		});
	});
	/* */

	return nunjucksRenderEnv;
}


module.exports = nunjucksConfigure;