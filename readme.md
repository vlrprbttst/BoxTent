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

Once done, type `grunt rebuild` to build the `_site` folder and then type `grunt`, a browser window will open with your website running and will watch for changes and live reload accordingly. The page opened by BrowserSync is the `index.html` in the `_site` folder.

## Instructions

The build folder is `_site`, that's the folder to upload on your server. All the source files are in the root of the project. Paths are relative to the `_site` folder. The website will automatically live reload everytime you change and save a `.scss`, `.html` or `.js` file. No need to refresh the browser manually!

#### CSS

* `.scss` files are compiled, autoprefixed and minified in `_site/css/main.css`

#### CRITICAL CSS

Critical (AKA Above the Fold) CSS is created in the `critical-css` folder and automatically inlined in `_site/index.html` via `grunt-processhtml`

#### HTML

* `.html` files are are minified in `_site/`

#### IMAGES

* Save images files in `images/`: they will be compressed, optimized and copied in `_site/images/`. **Only** use images from `_site/images/` in the project. if you create new subfolders for images and they don't automatically get detected and compressed, stop grunt and type `grunt imagemin`: this is needed only once for newly created image folders.
* image folders are synced: if you delete an image from the source folder, it will be deleted automatically in the `_site/images/` folder as well. Deleting a whole folder won't work, you will have to delete it manually from both `images` and `_site/images`.

#### JAVASCRIPT

* javascript libraries are managed via bower, if you need to add any, please do it via bower
* if you install a new js library with bower, be sure to include its path in the `concat` task of the gruntfile
* if you need a js library which cannot be installed via bower, save it in the `js/libs/` folder
* if you need to write custom javascript, you can do it in the `js/custom/main.js` file
* all javascript are concatenated in a single production file `js/production.js` and then minified in `_site/js/production.min.js`
