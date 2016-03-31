module.exports = function(grunt) {

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
                tasks: ['copy:the_html']
            },
            images: {
                files: ['_src/images/**/*.{png,jpg,gif,svg}'],
                tasks: ['newer:imagemin', 'newer:responsive_images']
            }, // watch images added to src

            /* serve in dist scripts: {
                files: ['js/libs/*.js', 'js/custom/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                }
            }, //end of watch scripts */

            css: {
                files: ['_src/sass/**/*.scss'],
                tasks: ['sass', 'postcss:dev'],
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
                    cwd: './', // Src matches are relative to this path.
                    src: ['_site/*.html'], // Actual pattern(s) to match.
                    dest: '', // Destination path prefix.
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
                    'bower_components/jquery/jquery.js',
                    'js/libs/*.js',
                    'js/custom/*.js'
                ],
                dest: 'js/build/production.js'
            }
        }, //end concat

        uglify: {
            options: {
                mangle: false
            },
            dist: {
                src: 'js/build/production.js',
                dest: '_site/js/production.min.js'
            }
        }, //end uglify

        sass: {
            dist: {
                options: {
                    style: 'nested', //no need for config.rb
                    compass: 'true'
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
                        require('autoprefixer')({
                            browsers: 'last 2 version, IE 9'
                        }),
                        require('cssnano')()
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
                    ghostMode: false, // don't sync scrolling across devices
                    watchTask: true
                }
            }
        },

        penthouse: {
            extract: {
                outfile: '_src/critical-css/critical.css',
                css: '_dev/css/main.css',
                url: '_src/index.html',
                width: 1200,
                height: 500
            },
        },

        processhtml: {
            build: {
                files: {
                    '_dev/index.html': ['_src/index.html']
                }
            }
        },

        responsive_images: {
            myTask: {
                options: {
                    newFilesOnly: true,
                    sizes: [{
                        name: 'small',
                        width: 320
                    }, {
                        name: 'large',
                        width: 640
                    }, {
                        name: "large",
                        width: 1024,
                        suffix: "_x2",
                        quality: 60
                    }]
                },
                files: [{
                    expand: true,
                    src: ['**/*.{jpg,gif,png}'],
                    cwd: '_src/images',
                    dest: '_dev/images'
                }]
            }
        },

        clean: ["_site"],

        copy: {
            the_css: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'css',
                    dest: '../_site/css/',
                    src: ['**/*.css']
                }]
            },
            the_html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '_src',
                    dest: '_dev/',
                    src: ['**/*.html']
                }]
            },
            the_bower_components: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    dest: '_dev/js/libs',
                    src: ['bower_components/jquery/jquery.js','bower_components/FitText.js/jquery.fittext.js']
                }]
            },
            the_js: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '_src',
                    dest: '_dev/',
                    src: ['js/**/*.js']
                }]
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
    grunt.loadNpmTasks('grunt-penthouse');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // default for development: type grunt
    grunt.registerTask('default', ['browserSync', 'watch']);
    // rebuild the _site folder: type grunt rebuild
    grunt.registerTask('build', ['clean', 'sass', 'postcss', 'processhtml', 'penthouse', 'htmlmin', 'concat', 'uglify', 'imagemin', 'responsive_images']);
};
