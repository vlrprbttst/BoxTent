# BoxTent

![boxtent](https://cloud.githubusercontent.com/assets/4832752/15466786/8b05893e-20db-11e6-8120-9e27a922e29d.png)

> The plastic table-like item found in pizza boxes is called a box tent and was patented in 1983. Most people in the biz now call it a pizza saver.

## What is this?

BoxTent is a front-end workflow powered by [Grunt](http://gruntjs.com/ "Grunt") that gives you the infrastructure to kickstart your next HTML+CSS+JS project.
BoxTent prescribes modern web-development best practices including support for:

* browser auto-reloading
* Browser syncing across devices
* images optimization
* `.scss` compilation with Compass support
* `.js` concatenation
* `.html`, `.css` and `.js` minification
* `.css` autoprefixing
* critical above the fold `.css` management
* includes

## Requirements

You'll need to have the following items installed before continuing.

  * [Node.js](http://nodejs.org): Use the installer provided on the NodeJS website.
  * [Grunt](http://gruntjs.com/): Run `[sudo] npm install -g grunt-cli`
  * [Bower](http://bower.io/): Run `[sudo] npm install -g bower`

## Dependencies

The only gem used in this project is Compass, type this in the terminal anywhere:

`gem install compass`  

Open the terminal in the root of the project and type `npm install --save-dev`. Once finished, type `bower install` for the bower dependencies.

Once done, type `grunt`, open the browser and navigate to `http://localhost:3000/`. What you see is the `index.html` of the `_dev` folder. The website will automatically live reload every time you change and save a `.scss`, `.html` or `.js` file of the `_src` folder. No need to refresh the browser manually!

## Project Structure

The project is divided in 3 main folders:

* `_src`: **start here**, this is where you work
* `_dev`: what you see on `http://localhost:3000/`
* `_site`: your final website to upload

## Workflow Instructions: The Source Folder

The following instructions refer to the development stage of the project, you work on files in `_src` and what you see and debug are the files in `_dev`.
Here are all the automations performed while working in `_src`

#### CSS

* `.scss` files are compiled and autoprefixed in `_dev/css/main.css`

#### CRITICAL CSS

Critical (AKA Above the Fold) CSS is created in the `_dev/critical-css/` folder, it is automatically created every time you save an `.html` page. a link to it must be placed in `<head>` in special comments like this:

```
<!-- build:css inline -->
<link rel="stylesheet" href="../_dev/critical-css/index.css">
<!-- /build -->
```

The special comments will automatically inline the css in the html page. Paths of properties such as `@font-face` or `background-image:url(...)` are automatically transformed in relative paths. If your project is not hosted on a first level domain you'll get 404 errors because from those resources. To quickly solve this, uncomment the `// ignore: ['@font-face',/url\(/]` in the `gruntfile.js`.

#### FONTS

If you are using custom fonts, create a `fonts` folder in `_src`, and type `grunt copy:the_fonts` to move them in `_dev`.

#### HTML

* at this stage of development, `.html` files are automatically moved in `_dev/` thanks to `processhtml:dev` processing includes. You will find includes in the `_includes` folder. If you don't use includes, the workflow breaks so you must use includes.

#### IMAGES

* Save images files in `images/`: they will be compressed, optimized and copied in `_dev/images/`.

#### FAVICONS

To generate your favicons I highly recommend using [http://realfavicongenerator.net/](http://realfavicongenerator.net/). Put them in `images/favicons`, the supported file formats will be automatically moved in `_dev` by `imagemin`. To move the rest of the files, type `grunt copy:favicons`

#### JAVASCRIPT

* javascript libraries are managed via bower, if you need to add any, please do it via bower
* if you install a new js library with bower, be sure to include its path in the `copy:bower` and the `concat:dist` tasks of the gruntfile. Once done, type `grunt copy:bower` from the shell to move them in your project. Don't forget to reference them at the bottom of your `.html` files including them inside the `processhtml` special comments like this:

```
<!-- build:js js/production.min.js -->
// here
<!-- /build -->
```
* if you need a js library which cannot be installed via bower, save it in `_src/js/custom/` and **be sure grunt is running**, so the watch task can copy the files in `_dev`
* if you need to write custom javascript, you can do it in the `_src/js/custom/main.js` file

## Workflow Instructions: Building the final website

Once you're done, there's a new layer of automations to build the final website folder. Run `grunt build` to (re)create the `_site` folder. Here's what happens:

#### CLEAN

The `_site` folder is wiped out and cleaned completely, ready to be rebuilt.

#### SYNC

The task `delete_sync` checks for extra files between `_dev` and `_src` (html and images only), if they do not exist in the `_dev` directory, they are removed from `_src` to keep the folders clean of extra files. ** This is a dangerous task ** as this may delete important files, be sure to check the task and modify it if needed.

#### CSS

* `main.css` file is minified and optimized with cssnano

#### HTML

* `.html` files are minified

#### IMAGES

* Optimized images are automatically copied from `_dev`

#### JAVASCRIPT
* all of your javascript files are concatenated and minified in a single file called `production.min.js` and all the single `<script src=""></script>` lines you previously had on `_dev` are transformed into a single line: `<script src="js/production.min.js"></script>`.
