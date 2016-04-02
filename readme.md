# Grunt boilerplate v2

## Requirements
You'll need to have the following items installed before continuing.

  * [Node.js](http://nodejs.org): Use the installer provided on the NodeJS website.
  * [Grunt](http://gruntjs.com/): Run `[sudo] npm install -g grunt-cli`
  * [Bower](http://bower.io/): Run `[sudo] npm install -g bower`

## Dependencies

The only gem used in this project is Compass, type this in the terminal anywhere:

`gem install compass`  

Open the terminal in the root of the project and type `npm install --save-dev`. Once finished, type `bower install` for the bower dependencies.

Once done, type `grunt`, open the browser and navigate to `http://localhost:3000/`. What you see is the `index.html` of the `_dev` folder. The website will automatically live reload everytime you change and save a `.scss`, `.html` or `.js` file. No need to refresh the browser manually!

## Project Structure

The project is divided in 3 main folders:

* `_src`: **start here**, this is where you work
* `_dev`: what you see on `http://localhost:3000/` and where you debug
* `_site`: your final website to upload

## Workflow Instructions: The Source Folder

The following instructions refer to the development stage of the project, you work on files in `_src` and what you see and debug are the files in `_dev`.
Here are all the automations performed while working in `_src`

#### CSS

* `.scss` files are compiled and autoprefixed in `_dev/css/main.css`

#### CRITICAL CSS

Critical (AKA Above the Fold) CSS is created in the `_dev/critical-css/critical.css`

#### HTML

* `.html` files are automatically moved in `_dev/`

#### IMAGES

* Save images files in `images/`: they will be compressed, optimized and copied in `_dev/images/`.

#### JAVASCRIPT

* javascript libraries are managed via bower, if you need to add any, please do it via bower
* if you install a new js library with bower, be sure to include its path in the `copy:bower` and the `concat:dist` tasks of the gruntfile. Once done, type `copy:bower` from the shell to move them in your project. Don't forget to reference them at the bottom of your `.html` files including them inside the `processhtml` special comments like this:
```
<!-- build:js js/production.min.js -->
// here
<!-- /build -->
```
* if you need a js library which cannot be installed via bower, save it in `_src/js/custom/` and **be sure grunt is running**, so the watch task can copy the files in `_dev`
* if you need to write custom javascript, you can do it in the `_src/js/custom/main.js` file

## Workflow Instructions: Building the final website

Once you're done, there's a new layer of automations to build the perfect final website folder. Run `grunt build` to create (or re-create) the `_site` folder. Here's what happens:

#### CSS

* `main.css` file is minified with cssnano (a postcss plugin)

#### CRITICAL CSS

Critical (AKA Above the Fold) CSS is automatically inlined on top of index.html file with the `processhtml` task

#### HTML

* `.html` files are minifed

#### IMAGES

* Images are automatically moved

#### JAVASCRIPT
* all of your javascript files are concatenated and minified in a single file called `production.min.js` and all the single `<script src=""></script>` lines you previously had on `_dev` are transformed.
