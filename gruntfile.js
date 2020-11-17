module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //path variables
        source: '_src',
        dev: '_dev',
        scss: 'scss',
        css: 'css',
        js: 'js',
        images: 'images',
        fonts: 'fonts',
        favicons: 'favicons',

        /* ====================================================================================================================================================
         * ====================================================================================================================================================

         Watch

         ====================================================================================================================================================
         ====================================================================================================================================================
         *
         */

        watch: {
            content: {
                files: ['<%= source %>/**/*.html'],
                tasks: ['newer:processhtml:dev']
            },
            images: {
                files: ['<%= source %>/<%= images %>/**/*.{png,jpg,gif,svg}'],
                tasks: ['newer:imagemin', 'copy:unoptimizedImage']
            }, // watch images added to src

            scripts: {
                files: ['<%= source %>/<%= js %>/**/*.js'],
                tasks: ['copy:js'],
                options: {
                    spawn: false,
                }
            },

            scss: {
                files: ['<%= source %>/<%= scss %>/**/*.scss'],
                tasks: ['newer:sass:dist', 'postcss:dev'],
                options: {
                    spawn: false,
                }
            }, //end of sass watch

            partial_scss: {
                files: ['<%= source %>/<%= scss %>/**/_*.scss'],
                tasks: ['sass:partials', 'postcss:dev'],
                options: {
                    spawn: true,
                }
            }, //end of sass partials watch

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



        
        imagemin: {
            dynamic: {
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: '<%= source %>/<%= images %>/', // source images (not compressed)
                    src: ['**/*.{png,jpg,gif,svg}'], // Actual patterns to match
                    dest: '<%= dev %>/<%= images %>/' // Destination of compressed files
                }]
            }
        }, //end imagemin
        
        // concat: {
        //     options: {
        //         separator: ';',
        //     },
        //     dist: {
        //         src: [
        //             '<%= dev %>/<%= js %>/libs/jquery/dist/jquery.js',
        //             '<%= dev %>/<%= js %>/custom/**/*.js'
        //         ],
        //         dest: '<%= site %>/<%= js %>/production.js'
        //     }
        // }, //end concat

        // uglify: {
        //     options: {
        //         mangle: false
        //     },
        //     dist: {
        //         src: '<%= site %>/<%= js %>/production.js',
        //         dest: '<%= site %>/<%= js %>/production.min.js'
        //     }
        // }, //end uglify

        sass: {
            dist: {
                options: {
                    // require: 'plugins?'
                },
                files: {
                    '<%= dev %>/<%= css %>/main.css': '<%= source %>/<%= scss %>/main.scss'
                }
            }, //dist

            partials: {
                options: {
                    // require: 'plugins?'
                },
                files: {
                    '<%= dev %>/<%= css %>/main.css': '<%= source %>/<%= scss %>/main.scss'
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
                src: '<%= dev %>/<%= css %>/main.css'
            }
        }, //postcss

        browserSync: {
            dev: {
                bsFiles: {
                    src: ['<%= dev %>/**', '<%= source %>/!.sass-cache']
                },
                options: {
                    server: {
                        baseDir: "<%= dev %>/"
                    },
                    ghostMode: false,
                    open: false,
                    watchTask: true
                }
            }
        },

        processhtml: {
            dev: {
                files: [{
                    expand: true,
                    cwd: '<%= source %>/',
                    src: ['**/*.html', '!_includes/**/*.html'],
                    dest: '<%= dev %>/',
                    ext: '.html'
                }]
            }
        },
        copy: {
            the_html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= source %>',
                    dest: '<%= dev %>/',
                    src: ['**/*.html']
                }]
            },
            the_fonts: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= source %>/<%= fonts %>',
                    dest: '<%= dev %>/<%= fonts %>',
                    src: ['*.*']
                }]
            },
            js: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= source %>/<%= js %>',
                    dest: '<%= dev %>/<%= js %>',
                    src: ['**/*.js']
                }]
            },
            unoptimizedImage: {
                expand: true,
                cwd: '<%= source %>/<%= images %>/',
                src: ['**/*.{png,jpg,gif,svg}'],
                dest: '<%= dev %>/<%= images %>/',

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
                cwd: '<%= source %>/<%= images %>/<%= favicons %>',
                src: ['*.ico','*.json','*.xml'],
                dest: '<%= dev %>/<%= images %>/<%= favicons %>',
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-copy');


    // default for development: type grunt
    grunt.registerTask('default', ['browserSync', 'watch']);
    // rebuild the _site folder: type grunt build
    grunt.registerTask('build', ['concat', 'uglify']);

};
