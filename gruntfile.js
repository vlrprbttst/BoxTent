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
                tasks: ['newer:imagemin']
            }, // watch images added to src

            scripts: {
                files: ['_src/js/custom/*.js'],
                tasks: ['copy:js'],
                options: {
                    spawn: false,
                }
            },

            css: {
                files: ['_src/sass/**/*.scss'],
                tasks: ['sass', 'postcss:dev', 'penthouse', 'copy:critical_css'],
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
                    '_dev/js/libs/FitText.js/jquery.fittext.js',
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
                    ghostMode: false,
                    open: false,
                    watchTask: true
                }
            }
        },

        penthouse: {
            extract: {
                outfile: '_src/critical-css/critical.css',
                css: '_dev/css/main.css',
                url: '_dev/index.html',
                width: 1200,
                height: 500
            },
        },

        processhtml: {
            build: {
                files: {
                    '_site/index.html': ['_dev/index.html']
                }
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
            critical_css: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '_src',
                    dest: '_dev/',
                    src: ['critical-css/*.css']
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
            bower: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'bower_components',
                    dest: '_dev/js/libs/',
                    src: ['jquery/jquery.js', 'FitText.js/jquery.fittext.js']
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

            /* for build **/
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
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // default for development: type grunt
    grunt.registerTask('default', ['browserSync', 'watch']);
    // rebuild the _site folder: type grunt rebuild
    grunt.registerTask('build', ['clean', 'processhtml', 'htmlmin', 'concat', 'uglify', 'copy:css_build', 'postcss:build', 'copy:images']);
};
