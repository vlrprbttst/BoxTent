module.exports = function(grunt) {

    var destFolder = "_src/";
    var fileExt = ".html";

    var tempFileList = grunt.file.expand({}, [destFolder + "*" + fileExt]
    );

    var fileList = [];
    tempFileList.forEach(function(url) {
        var pageUrl = url;
        pageUrl = pageUrl.replace(destFolder, "");
        pageUrl = pageUrl.replace(fileExt, "");
        fileList.push(pageUrl);
    })

    var min = {};
    fileList.forEach(function(name) {
        min[name] = {
            options: {
                base: './_dev',
                css: '_dev/css/main.css',
                width: 1200,
                height: 500,
                //ignore: ['@font-face',/url\(/]
            },
            src: '_dev/' + name + '.html',
            dest: '_dev/critical-css/' + name + '.css'
        };
    });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /* ====================================================================================================================================================
         * ====================================================================================================================================================

         Watch

         ====================================================================================================================================================
         ====================================================================================================================================================
         *
         */

        watch: {
            content: {
                files: ['_src/**/*.html'],
                tasks: ['newer:processhtml:dev', 'critical']
            },
            images: {
                files: ['_src/images/**/*.{png,jpg,gif,svg}'],
                tasks: ['newer:imagemin', 'copy:unoptimizedImage']
            }, // watch images added to src

            scripts: {
                files: ['_src/js/custom/**/*.js'],
                tasks: ['copy:js'],
                options: {
                    spawn: false,
                }
            },

            css: {
                files: ['_src/sass/**/*.scss'],
                tasks: ['sass', 'postcss:dev', 'critical'],
                options: {
                    spawn: false,
                }
            }, //end of sass watch

            grunt: {
                files: ['gruntfile.js']
            }
        }, //end of watch

        /* ====================================================================================================================================================
         * ====================================================================================================================================================

         Tasks

         ====================================================================================================================================================
         ====================================================================================================================================================
         *
         */



        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyJS: true,
                    minifyCSS: true
                },
                files: [{
                    expand: true, // Enable dynamic expansion.
                    cwd: '_site', // Src matches are relative to this path.
                    src: ['*.html'], // Actual pattern(s) to match.
                    dest: '_site', // Destination path prefix.
                    ext: '.html', // Dest filepaths will have this extension.
                    extDot: 'first' // Extensions in filenames begin after the first dot
                }]
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: '_src/images/', // source images (not compressed)
                    src: ['**/*.{png,jpg,gif,svg}'], // Actual patterns to match
                    dest: '_dev/images/' // Destination of compressed files
                }]
            }
        }, //end imagemin

        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: [
                    '_dev/js/libs/jquery/jquery.js',
                    '_dev/js/custom/**/*.js'
                ],
                dest: '_site/js/production.js'
            }
        }, //end concat

        uglify: {
            options: {
                mangle: false
            },
            dist: {
                src: '_site/js/production.js',
                dest: '_site/js/production.min.js'
            }
        }, //end uglify

        sass: {
            dist: {
                options: {
                    style: 'nested', //no need for config.rb
                    compass: 'true',
                    // require: 'plugins?'
                },
                files: {
                    '_dev/css/main.css': '_src/sass/main.scss'
                }
            }
        }, //end of sass

        postcss: {
            dev: {
                options: {
                    map: true,
                    processors: [
                        require('autoprefixer')({
                            browsers: 'last 2 version, IE 9'
                        }),

                    ]
                },
                src: '_dev/css/main.css'
            },
            build: {
                options: {
                    map: false,
                    processors: [
                        require('cssnano')({
                            autoprefixer: {
                                browsers: 'last 2 version, IE 9'
                            },
                            minifyFontValues: {
                                removeQuotes: false
                            },
                            discardUnused: false
                        })
                    ]
                },
                src: '_site/css/main.css'
            }
        }, //postcss

        browserSync: {
            dev: {
                bsFiles: {
                    src: ['_dev/**', '_src/!.sass-cache']
                },
                options: {
                    server: {
                        baseDir: "_dev/"
                    },
                    ghostMode: false,
                    open: false,
                    watchTask: true
                }
            }
        },

        critical: min,

        processhtml: {
            dev: {
                files: [{
                    expand: true,
                    cwd: '_src/',
                    src: ['**/*.html', '!_includes/**/*.html'],
                    dest: '_dev/',
                    ext: '.html'
                }, ],
            },
            build: {
                files: [{
                    expand: true,
                    cwd: '_dev/',
                    src: ['**/*.html'],
                    dest: '_site/',
                    ext: '.html'
                }, ],
            }
        },

        delete_sync: {
            dist: {
                cwd: '_src',
                src: ['**', '!**/*.css', '!_includes/**/*.html', '!js/**/*.js', '!sass/**/*.scss'],
                syncWith: '_dev'
            }
        },

        clean: ["_site"],

        copy: {
            the_html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '_src',
                    dest: '_dev/',
                    src: ['**/*.html']
                }]
            },
            the_fonts: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '_src/fonts',
                    dest: '_dev/fonts',
                    src: ['*.*']
                }]
            },
            bower: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'bower_components',
                    dest: '_dev/js/libs/',
                    src: ['jquery/jquery.js']
                }]
            },
            js: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '_src/js',
                    dest: '_dev/js',
                    src: ['**/*.js']
                }]
            },
            unoptimizedImage: {
                expand: true,
                cwd: '_src/images/',
                src: ['**/*.{png,jpg,gif,svg}'],
                dest: '_dev/images/',

                filter: function(filepath) {

                    var path = require('path');
                    var dest = path.join(
                        grunt.config('copy.main.dest'),
                        path.basename(filepath)
                    );
                    return !(grunt.file.exists(dest));
                },
            },
            favicons: {
                // use http://realfavicongenerator.net/ to generate them
                expand: true,
                dot: true,
                cwd: '_src/images/favicons',
                src: ['*.ico','*.json','*.xml'],
                dest: '_dev/images/favicons',
            },
            images: {
                expand: true,
                dot: true,
                cwd: '_dev/images',
                src: '**',
                dest: '_site/images',
            },
            css_build: {
                expand: true,
                dot: true,
                cwd: '_dev/css',
                src: 'main.css',
                dest: '_site/css',
            },
            fonts_build: {
                expand: true,
                dot: true,
                cwd: '_dev/fonts',
                src: '**',
                dest: '_site/fonts',
            },
        }
    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-critical');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-delete-sync');

    // default for development: type grunt
    grunt.registerTask('default', ['browserSync', 'watch']);
    // rebuild the _site folder: type grunt build
    grunt.registerTask('build', ['clean', 'delete_sync', 'processhtml:build', 'htmlmin', 'concat', 'uglify', 'copy:css_build', 'postcss:build', 'copy:images','copy:fonts_build']);

};
