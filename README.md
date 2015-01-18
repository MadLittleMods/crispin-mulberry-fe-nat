# Crispin & Mulberry: Nerdery Front-end (NAT)

The NAT(Nerd Assessment Test) is a code challenge and technical component of the Nerdery candidate interview process.

The [instructions given are available here](https://github.com/MadLittleMods/crispin-mulberry-fe-nat/blob/master/src/%23project/instructions.md).

## View [live Site](https://madlittlemods.github.io/crispin-mulberry-fe-nat/dist/)

## View [live Styleguide](https://madlittlemods.github.io/crispin-mulberry-fe-nat/dist/styleguide/)


# Brief Overview

Check out the [styleguide overview page](https://madlittlemods.github.io/crispin-mulberry-fe-nat/dist/styleguide/) for in depth details on the project.

 - [Gulp](http://gulpjs.com/) for running tasks and building the project.
 - [Sass SCSS](http://sass-lang.com/) styles.
 - [Nunjucks](https://mozilla.github.io/nunjucks/) templating. Similar to Django or jinja2 templates.
 - [RequireJS](http://requirejs.org/) JavaScript bundling. We use the [UMD](https://github.com/umdjs/umd) pattern to support any module types (AMD, CommonJS).
 - Source in `src` and production build in `dist`. *See the How to build section of the styleguide*.
 - IE7+ browser support.
 - Fully accessible to keyboard users and screen readers.

## Released Sub-Projects

During the development of the site, four separate projects/libraries were developed and released:

- [`gulp-css-spriter`](https://www.npmjs.com/package/gulp-css-spriter): Sprite Sheet Generation from CSS source files. The best and different approach to sprite sheets.
- [`gulp-image-diff`](https://www.npmjs.com/package/gulp-image-diff): Image diff'ing tool that compares pixel by pixel. Used for full page design regression testing
- [`gulp-kss-styleguide`](https://github.com/MadLittleMods/gulp-kss-styleguide): Generate a Styleguide from KSS comments
- [`jquery-carouselss`](https://github.com/MadLittleMods/jquery-carouselss): jQuery Carousel plugin for HTML content/images. Listens to CSS transitions/animations when switching frames. CSS class-based states.


