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
                files: ['*.html'],
                tasks: ['newer:htmlmin']
            },
            images: {
                files: ['images/**/*.{png,jpg,gif,svg}'],
                tasks: ['newer:imagemin']
            }, // watch images added to src

            deleting: {
                files: ['images/**/*.{png,jpg,gif}'],
                tasks: ['delete_sync']
            }, // end of delete sync

            scripts: {
                files: ['js/libs/*.js', 'js/custom/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                }
            }, //end of watch scripts

            css: {
                files: ['sass/**/*.scss'],
                tasks: ['sass', 'postcss'],
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
                    src: ['*.html'], // Actual pattern(s) to match.
                    dest: '_site', // Destination path prefix.
                    ext: '.html', // Dest filepaths will have this extension.
                    extDot: 'first' // Extensions in filenames begin after the first dot
                }]
            }
        },

        delete_sync: {
            dist: {
                cwd: '_site/images',
                src: ['**'],
                syncWith: 'images'
            }
        }, // end of delete sync

        imagemin: {
            dynamic: {
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: 'images/', // source images (not compressed)
                    src: ['**/*.{png,jpg,gif,svg}'], // Actual patterns to match
                    dest: '_site/images/' // Destination of compressed files
                }]
            }
        }, //end imagemin

        concat: {
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
                    '_site/css/main.css': 'sass/main.scss'
                }
            }
        }, //end of sass

        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        browsers: 'last 2 version, IE 9'
                    }), // add vendor prefixes. for more: https://github.com/ai/browserslist
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: '_site/css/main.css'
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: ['_site/**']
                },
                options: {
                    server: {
                        baseDir: "_site/"
                    },
                    ghostMode: false, // don't sync scrolling across devices
                    watchTask: true
                }
            }
        },

        ftpush: {
            build: {
                auth: {
                    host: 'ftp.valeriopierbattista.com',
                    port: 21,
                    authKey: 'key1' //ftp login is in the .ftppass file, remember adding it to the exclusions in .gitignore if you are publishing the repo on github
                },
                src: '_site', //root
                dest: '/www/test', //destination folder
                exclusions: ['**/.DS_Store'], 
                // keep : ['blog','cv','projects'], // SUPER IMPORTANT! check what resources should STAY on the server, for example your wordpress installation or other subfolders you use for other projects. else they'll get wiped out
                simple: false,
                useList: false
            }
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
    grunt.loadNpmTasks('grunt-delete-sync');
    grunt.loadNpmTasks('grunt-ftpush');

    // default for development: type grunt
    grunt.registerTask('default', ['browserSync', 'watch']);
    // rebuild the _site folder: type grunt rebuild
    grunt.registerTask('rebuild', ['htmlmin', 'sass', 'concat', 'uglify', 'postcss', 'imagemin', 'delete_sync']);
};