# Grunt boilerplate v2

## Requirements
You'll need to have the following items installed before continuing.

  * [Node.js](http://nodejs.org): Use the installer provided on the NodeJS website.
  * [Grunt](http://gruntjs.com/): Run `[sudo] npm install -g grunt-cli`
  * [Bower](http://bower.io/): Run `[sudo] npm install -g bower`

## Dependencies

The gems used in this project are Sass and Compass, type these in the terminal anywhere:

`gem install sass` 

`gem install compass`  

Open the terminal in the root of the project and type `npm install`. Once finished, type `bower install` for the bower dependencies.

Once done, type `grunt`, a browser window will open with your website running and will watch for changes and live reload accordingly. If you get an error for postcss or autoprefixer, run ```npm install grunt-postcss autoprefixer cssnano``` to re-install postcss and its plugins.

If something looks wrong on the first launch, stop grunt with `ctrl+c` and type `grunt rebuild`. Wait till it finishes rebuilding the `_site` folder, and then type `grunt` again. You should be good to go now! The page opened by BrowserSync is the `index.html` in the `_site` folder.

## Instructions

The build folder is `_site`, that's the folder to upload on your server. All the source files are in the root of the project. Paths are relative to the `_site` folder. The website will automatically live reload everytime you change and save a `.scss`, `.html` or `.js` file. No need to refresh the browser manually!

#### CSS

* `.scss` files are compiled, autoprefixed and minified in `_site/css/main.css`

#### HTML

* `.html` files are are minified in `_site/`

#### IMAGES

* Save images files in `images/`: they will be compressed, optimized and copied in `_site/images/`. **Only** use images from `_site/images/` in the project. if you create new subfolders for images and they don't automatically get detected and compressed, stop grunt and type `grunt imagemin`: this is needed only once for newly created image folders.
* image folders are synced: if you delete an image from the source folder, it will be deleted automatically in the `_site/images/` folder as well.

#### JAVASCRIPT

* javascript libraries are managed via bower, if you need to add any, please do it via bower
* if you install a new js library with bower, be sure to include its path in the `concat` task of the gruntfile
* if you need a js library which cannot be installed via bower, save it in the `js/libs/` folder
* if you need to write custom javascript, you can do it in the `js/custom/main.js` file
* all javascript are concatenated in a single production file `js/production.js` and then minified in `_site/js/production.min.js`


#### DEPLOY

edit the `ftpush` task in the gruntfile (usually just edit the host name, the default port is 21), open the .ftppass file in the root of the project and fill it with real data. From now on, if you type `grunt ftpush`, the `_site` folder will be automatically uploaded on your server

**DANGER!!!! DANGER!!!! DANGER!!!! DANGER!!!!**

There are some very important things to know before using ftpush!!!!

* I have set `simple: false`: if set to true, task will upload modified files and quit, it will NOT remove redundant files and directories at the server side. If set to false (as I've set it), it **will remove redundant files and directories**, so uncomment the `// keep :` line in the gruntfile and list all the folders to keep along with your website (a wordpress installation for example). If you don't edit the `keep` option, anything different from your local folder will be wiped out. **USE WITH CAUTION**.
* remember to update the .gitignore with .ftppass if you are publishing to a public repo!
* it may not work on windows: [github issue](https://github.com/inossidabile/grunt-ftpush/issues/40)