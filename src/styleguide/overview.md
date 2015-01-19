# Living styleguide for Crispin & Mulberry

Generated from [KSS documentation](https://github.com/kneath/kss) in the styles. Be sure explore the other sections(sidebar on the left) of this guide.

# Project Details

 - **Gulp:** We are using Gulp as the task runner for this project. *See the "How to build" section below.*
 - **Nunjucks templating:** This project uses [Nunjucks templates](https://mozilla.github.io/nunjucks/), because they are more powerful and allow for easy page extension unlike Handlebars.
 - **Sass:** "CSS with superpowers", as the official site says.
 - Fully accessible to keyboard users and screen readers

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







