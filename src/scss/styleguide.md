# Living styleguide for Crispin & Mulberry

Generated from [KSS documentation](https://github.com/kneath/kss) in the styles. Be sure explore the other sections(sidebar on the left) of this guide.

# Project Details

 - **Gulp:** We are using Gulp as the task runner for this project. *See the "How to build" section below.*
 - **Nunjucks templating:** This project uses [Nunjucks templates](https://mozilla.github.io/nunjucks/), because they are more powerful and allow for easy page extension unlike Handlebars.
 - **Sass:** "CSS with superpowers", as the official site says.

## Cross browser Support

 - All modern browsers
 	 - Chrome
 	 - Firefox
 	 - Safari
 	 - Opera
 - IE7+


# How to build

We are using Gulp as the task runner for this project.

To build, navigate to the root of the project and run the following commands:

### Initial Setup (run once per setup):
 - `npm install`: This will install all of the dependencies needed.

### Build & Watch:
 - `gulp`: Starts running all of the tasks
 - `ctrl`+`c`: Escape out of the process or watching task.
 - You will know when the Build is fully complete when you see: `Finished 'default' after ...`
 - While developing you probably want to add the `--dev` flag to avoid some lengthy minify tasks. `gulp --dev`

When you run `gulp` it takes care of the whole build process. Check `gulpfile.js` in the root of the project for more details.

 - Cleaning out the old build `dist` for this new current build
 - Compiling Nunjucks templates for the site and styleguide
 - Compiling the Sass to CSS for the site and styleguide. Also minify the CSS.
 - Building a sprite sheet from the CSS output and updating image references. This reduces bandwidth and number of http requests per page load.
 - Linting JavaScript with JSHint.
 - Bundle JavaScript with the RequireJS optimizer. Also minify the JavaScript
 - Moving images into the distribution folder
 - Watch for changes in styles, templates, etc and automatically regenerate
 - You can also generate full-page regression analyses using `gulp regression-analysis-build`. 
 	 - This is excluded from the `default` task because it only needs to be run when the references or browser images change.
 	 - Plus this task takes several minutes to complete which would hinder development.

### Regression Testing

To regenerate the difference images and analysis reports, run `gulp regression-analysis-build`.

### Complete Build

`gulp complete-build`

The complete build will regenerate everything from the bare `src` folder and root documents.

You shouldn't be using this very often because it takes a while to complete and includes tasks that only need to be done every once and while.



# Code/Project Health

## CSS Specificity Graph

If you are new to specificity graph's or CSS specificity, [this is a great article](https://decadecity.net/blog/2014/11/26/css-specificity-graphs) that explains how to analyze the graph and what a good graph should look like.

 - Lower is better.
 - Saw tooth is expected.
 - Large spikes are not desired.
 - A gradual increase in specificity as location increases is expected and natural.
 - The Y-axis is a specificity sum(not the same as specificity) but works well.

<svg class="specificity-graph" viewBox='0 0 1000 310'></svg>



## Browser Visual Disparity

Here is a list of disparity that is out of our control and will cause a slight devation from pixel-perfection from the design. This list of factors will contribute about 6%(based off of Chrome) of difference even though the design/layout is nearly perfect. Be sure to check out the difference image maps linked to the percentage numbers in the table to understand where the difference is coming from.

 - Slight differences in font. Browsers and OS's render fonts differently from Photoshop. This could also cause different word-breaks.
 	 - In the future, we could possibly mitigate this effect by using solid blocks of the font color in place of the text.
 - Twitter feed embed widget. The current tweets will be different, avatar, etc.
 	 - The twitter feed widget does not work in IE7-8 because [Twitter deprecated support](https://blog.twitter.com/2013/tfw-ie6-ie7-support).
 - Browser differences in native checkboxes, etc

We are doing a straight pixel-to-pixel comparison with a slight pixel color tolerance to try to mitigate the difference in font aliasing. This means that there is barely any room to fudge details.

You can view the difference image maps by clicking the disparity percentages in the table.

<div class="regression-analyses-table-box"></div>

#### Internet Explorer 7

When testing the design for IE7, please use one of following environments:

 - IE11 emulated IE7 document mode in the [`localhost zone`](http://msdn.microsoft.com/en-us/library/ie/ms537183.aspx)
 - Use true IE7 in Windows XP. CSS expressions/dynamic properties are supported in every [zone](http://msdn.microsoft.com/en-us/library/ie/ms537183.aspx) in true IE7.
 - IE11 emulated IE7 document mode in the trusted zone(instructions below)
 	 - Add a site to the `trusted zone` in IE11: `Gear Icon->Internet Options->Security->Trusted sites->Sites button->Uncheck require https:// box at the bottom->Add the url`

The site in IE7 is fully functional in true IE7 and even functions without CSS expressions/dynamic properties. But CSS expressions add some nice UI features, for example icons, that we would normally use pseudo class for in modern browsers.

The reason you have to be in the localhost or trusted zone when using IE11 emulated IE7 document mode is because CSS expressions/dynamic properties are ["no longer supported for the Internet zone" in IE11+"](http://msdn.microsoft.com/en-us/library/ie/dn384050.aspx).





# Conventions

The following points are guidelines, not rules. Feel free to break them when it makes sense and helps maintainability.


### Further Reading:

You have read the conventions below, but want to learn more best practices? Check out [this list of articles, A Scalable CSS Reading List](https://github.com/davidtheclark/scalable-css-reading-list). Some of the articles may be conflicting, but they should get you further in the same mindset of this project.


## Accessibility

The site is fully keyboard navigable and tested with the [ChromeVox](http://www.chromevox.com/) screen reader.

## Guidelines when coding

 - In HTML:
 	 - Add proper aria attributes. Test with [ChromeVox](http://www.chromevox.com/) to make sure it reads the page properly
 	 - Use `-1` or `0` with `tabindex` attribute. Don't use numbers `> 0` because a number above zero will take the element focus out of the document flow.
 - In CSS:
 	 - Use `:focus` alongside of a `:hover`
 	 - Don't remove `outline` on `:focus` elements unless you replace it with another visual focus queue.
 - In JavaScript:
 	 - Bind keyboard (`space` and `enter`) events alongside `click` events
 - Use skip links for embedded feed-type widgets(like the Twitter feed). This allows keyboard users can skip over a potentially long list of focusable items


## JavaScript

 - Use camelCased variable names
 - Use `.js-` prefixed selectors for binding with only javascript when it makes sense
 	 - It is ok to bind without a `.js-` prefixed class name
 - Make sure your code runs in IE7+
 - Provide nice or'ed `||` fallbacks when something might return undefined: `(myObject.someString || '').split(...);`
 - jQuery is your friend. Use it when it makes sense.
 	 - Use jQuery `$(selector)` instead of vannilla JS `document.querySelectorAll(selector)`
 	 - `$.extend({}, defaults, options)` is great for having overridable defaults
 - Bind keyboard (`space` and `enter`) events alongside `click` events
 	 - ```
 		$(selector).on('click keydown', function(e) {
		 	// If click or spacebar, or enter is pressed
		 	if(e.type === 'click' || (e.type === 'keydown' && (e.keyCode === 32 || e.keyCode === 13))) {
		 		// Do stuff here
		 	}
		});
	 ```
 - Use the `Universal module definition` (UMD) when defining modules/components

### Synax example

```
function findMostRedColor(colors) {
	colors = (colors || []);

	var currentMostRedColor = null;
	for(var i = 0; i < colors.length; i++) {
		var color = colors[i];

		if(!currentMostRedColor || color.r > currentMostRedColor.r) {
			currentMostRedColor = color;
		}
	}

	return currentMostRedColor;
}

```


## CSS/Sass

 - Use semantic, single class names in markup for a module/component. This makes it easier to apply a certain style to any section of the page(if necessary), *see [Cargo Cult CSS](http://www.kapowaz.net/articles/cargo-cult-css)*. 
 - Use site wide variables(check `./src/scss/global/_variables.scss`), where necessary. This allows for easy modification of colors, spacing, etc.
 	 - Lowercase, Hyphen-delimited names for Sass variables. This way the variables fit in with standard CSS keywords and property names.
 - Avoid nesting and try to use the direct descendent operator, `a > b`, if you need style a nested element. This helps keep specificity down and the styles to only that module (Be mindful of possible sub-modules).
 	 - Be sure to take advantage of the `&` "at" operator when nesting and referencing itself
 - Define a `:focus` alongside a `:hover`. This allows keyboard users to see where they are at in the document.
 - Unit-less line-height is preferred. A unit-less line-height does not inherit a percentage value of its parent element, but instead is based on a multiplier of the font-size.<sub>— source [GitHub CSS Styleguide](https://github.com/styleguide/css)</sub>
 - Don't use ID's. If you *must* style with ID's(*[there are some use cases, maybe](http://www.webdirections.org/blog/in-defense-of-the-humble-id-attribute/)*), then please use the attribute selector `[id="main"]`.
 	 - Use `aria-` prefixed ID's with `aria` attributes
 	 - Use  `form-` prefixed ID's for attaching labels to form fields
 - Use lower case letters in hex color values. `#6af89b`
 - Use a leading `0` zero on decimal values. `opacity`, `rgba`, etc
 - Always provide fallbacks for property values that contain `rgba` for IE7-8
 - Do not use property/value hacks to target specific browsers. Instead use the appropriate mixin: `@include ie7 { ... }` or `@include ie8 { ... }`
 	 - Styles put inside of the `ie7`, `ie8` mixins are loaded with conditional comments.
 - Use the appropriate mixin instead of vendor prefixes. Check `./src/scss/global/_utility-mixins.scss`
 - Put states like `:hover` or `:focus` before pseudo element or nested declarations


### CSS Formatting

 - Use tabs
 - Use an expanded form where brackets and declarations are on their own lines
 - Single space after property colon: `color: #ffffff;`
 - Include `/*commented*/` out qualified selectors if a class is most semantically correct with a certain element. ex. `/*h1*/.primary-heading { ... }`
 - Extra line of whitespace after *last* nested rule or mixin
 - Use single quotes around url paths, `content` properties, etc

### Other

 - Document styles with KSS to keep the styleguide up to date (*this styleguide was generated with KSS*)
 - Use `.js-` prefixed selectors for binding with only javascript
 - Use `.is-` prefixed selectors for stateful changes like active nav item or collapsed list.

### CSS Property Order

The grouping of declarations is more important than the order of declarations within a group.


```
.selector
{
	position: relative;
	top: 0;
	float: left;

	overflow: hidden;

	display: block;
	width: 100px;
	height: 100px;

	margin: 0;
	padding: 0;

	background: #00aacc;
	border: 1px #ddff00 solid;

	color: #ffffff;
	font-family: Arial;
	font-size: 16px;
	font-weight: bold;
	white-space: nowrap;
	text-overflow: ellipsis;
	text-transform: uppercase;

	cursor: move;

	@include border-radius(4px);
	@include box-shadow(1px 1px 0 #232323);
	@include transition(all 0.3s ease);

	&:hover
	{
		color: #cccccc;
	}

	@include pseudo('before')
	{
		content: '';

		width: 10px;
		height: 10px;

		background: #ff0000;
	}
	
}
```


