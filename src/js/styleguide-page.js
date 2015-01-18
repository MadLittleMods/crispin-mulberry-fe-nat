require(['jquery', './lib/specificity-graph-standalone'], function($, specificityGraph) {
	$(document).ready(function() {
		
		$.when($.get('../css/all.css')).done(function(response) {
			// initialize the specificity graph
			specificityGraph.create(response, {
				svgSelector: '.specificity-graph',
				width: 1000,
				height: 300,
				showTicks: true
			});
		});




		function getNestedProperty(obj /*, level1, level2, ... levelN*/) {
			var args = Array.prototype.slice.call(arguments);

			obj = args.shift();

			for (var i = 0; i < args.length; i++) {
				if (!obj || !obj.hasOwnProperty(args[i])) {
					return undefined;
				}
				obj = obj[args[i]];
			}
			return obj;
		}


		// Generate the disparity table
		$.when(
			$.get('../regression-testing/diff-analysis-report-psd.json'),
			$.get('../regression-testing/diff-analysis-report-chrome.json')
		).done(function(psdReportResponse, chromeReportResponse) {
			var psdReportJson = psdReportResponse[0];
			var chromeReportJson = chromeReportResponse[0];

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

			function addReportToMap(map, reportJson, key) {
				function getPathToDiffImage(path) {
					var pathPieces = path.split(/\\|\//);
					var fileName = pathPieces[pathPieces.length-1];

					var pathInDist = '../regression-testing/diffs/';
					return pathInDist + fileName;
				}

				return reportJson.map(function(analysis) {
					if(!map[analysis.compareImage]) {
						map[analysis.compareImage] = {};
					}
					
					analysis.compareInfo = parseImagePathWithDashFormat(analysis.compareImage);

					// The path to the difference map image in the dist build
					analysis.distDifferenceMap = getPathToDiffImage(analysis.differenceMap);


					map[analysis.compareImage][key] = analysis;
				});
			}

			// The `key` in the map is the compare image
			// Combine the data together so it easy to reference the analysis for a image against multiple references
			var compiledAnalysesMap = {};
			addReportToMap(compiledAnalysesMap, psdReportJson, 'psd');
			addReportToMap(compiledAnalysesMap, chromeReportJson, 'chrome');

			var tableMap = [
				{
					'heading': 'Browser',
					'cellContent': function(analyses) {
						return getNestedProperty(analyses, 'psd', 'compareInfo', 'browser');
					}
				},
				{
					'heading': 'OS',
					'cellContent': function(analyses) {
						return getNestedProperty(analyses, 'psd', 'compareInfo', 'os');
					}
				},
				{
					'heading': 'Date',
					'cellContent': function(analyses) {
						return getNestedProperty(analyses, 'psd', 'compareInfo', 'date');
					}
				},
				{
					'heading': 'Disparity from PSD',
					'cellStyle': 'text-align: right;',
					'cellContent': function(analyses) {
						var percentDisparity = (getNestedProperty(analyses, 'psd', 'disparity')*100).toFixed(4) + '%';
						var linkMarkup = '<a href="' + getNestedProperty(analyses, 'psd', 'distDifferenceMap') + '">' + percentDisparity + '</a>';
						return linkMarkup;
					}
				},
				{
					'heading': 'Disparity from Chrome',
					'cellStyle': 'text-align: right;',
					'cellContent': function(analyses) {
						var percentDisparity = (getNestedProperty(analyses, 'chrome', 'disparity')*100).toFixed(4) + '%';
						var linkMarkup = '<a href="' + getNestedProperty(analyses, 'chrome', 'distDifferenceMap') + '">' + percentDisparity + '</a>';
						return linkMarkup;
					}
				}
			];


			var headingCellList = tableMap.map(function(cellData) {
				return '<th>' + cellData.heading + '</th>';
			});
			var bodyRowList = Object.keys(compiledAnalysesMap).map(function(key) {
				var analyses = compiledAnalysesMap[key];
				var rowCellList = tableMap.map(function(cellData) {
					// The reason we use inline style is because that is what markdown does.
					var cellStyle = cellData.cellStyle ? (' style="' +  cellData.cellStyle + '"') : '';
					return '<td' + cellStyle + '>' + cellData.cellContent(analyses) + '</td>';
				});

				return '<tr>' + rowCellList.join('') + '</tr>';
			});

			var tableHeadMarkup = '<thead><tr>' + headingCellList.join('') + '</tr></thead>';
			var tableBodyMarkup = '<tbody>' + bodyRowList.join('') + '</tbody>';

			// Make the full table markup
			var tableMarkup = '<table>' + tableHeadMarkup + tableBodyMarkup + '</table>';

			// Add it to the page
			$(tableMarkup).appendTo('.regression-analyses-table-box');
		});



	});
});