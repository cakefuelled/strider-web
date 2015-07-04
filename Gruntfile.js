module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-bower-requirejs');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-ng-constant');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.initConfig({
    bowerRequirejs: {
      target: {
        rjsConfig: './app/config.js'
      }
    },
    clean: {
      build: {
        src: ["build", 'assets/css']
      }
    },
    ngconstant: {
      options: {
        name: 'constants',
        dest: 'app/constants.js',
        wrap: 'define(["angular"], function(angular) {\n"use strict"; \n return {%= __ngModule %} \n\n});',
        constants: {
          version: grunt.file.readJSON('package.json').version,
          apiUrl: 'http://localhost:3000/'
        }
      },
      build: {},
      deploy: {
        constants: {
          apiUrl: 'http://getstrider.com/'
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "app",
          mainConfigFile: "app/config.js",
          include: "app",
          name: "../bower_components/almond/almond",
          out: "build/optimized.js",
          done: function(done, output) {
            var duplicates = require('rjs-build-analysis').duplicates(output);

            if (Object.keys(duplicates).length > 0) {
              grunt.log.subhead('Duplicates found in requirejs build:');
              for (var key in duplicates) {
                grunt.log.error(duplicates[key] + ": " + key);
              }
              return done(new Error('r.js built duplicate modules, please check the excludes option.'));
            } else {
              grunt.log.success("No duplicates found!");
            }

            done();
          }
        }
      }
    },
    'string-replace': {
      dist: {
        src: './index.html',
        dest: './build/',
        options: {
          replacements: [{
            pattern: 'bower_components/requirejs/require.js',
            replacement: 'optimized.js'
          }, {
            pattern: '<!-- appLoader -->',
            replacement: '<script type="text/javascript">require([\'app\'], function(app) {});</script>'
          }, {
            pattern: 'app.css',
            replacement: 'app.min.css'
          }]
        }
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {
            expand: true,
            src: [
              'bower_components/bootstrap-sass/assets/stylesheets/*',
              'bower_components/bootstrap-sass/assets/fonts/*',
              'bower_components/sweetalert/lib/sweet-alert.css',
              'bower_components/animate.css/animate.min.css',
              'bower_components/components-font-awesome/css/font-awesome.min.css',
              'bower_components/angular-loading-bar/build/loading-bar.min.css',
              'bower_components/components-font-awesome/fonts/*',
              'bower_components/angular-utils-ui-breadcrumbs/uiBreadcrumbs.tpl.html',
              'bower_components/ladda/dist/ladda-themeless.min.css',
              'app/assets/**',
              'app/appLoader.js',
              'app/**/*.html',
              'CNAME'
            ],
            dest: 'build/'
          }
        ],
      },
    },
    // This is for Ruby-based SASS compilation
    sass: {
      dev: { // Target
        options: { // Target options
          style: 'expanded',
          trace: true
        },
        files: { // Dictionary of files
          'app/assets/css/app.css': 'app/resources/sass/app.scss' // 'destination': 'source'
        }
      },
      dist: { // Target
        options: { // Target options
          style: 'compressed'
        },
        files: { // Dictionary of files
          'app/assets/css/app.css': 'app/resources/sass/app.scss' // 'destination': 'source'
        }
      }
    },
    'gh-pages': {
      options: {
        base: 'build'
      },
      src: ['**']
    },
    watch: {
      sass: {
        files: 'app/resources/sass/**/*.scss',
        tasks: 'sass:dev'
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'app/assets/css',
          src: ['*.css', '!*.min.css'],
          dest: 'app/assets/css',
          ext: '.min.css'
        }]
      }
    }
  });

  grunt.registerTask('default', ['bowerRequirejs']);

  grunt.registerTask('sass-watch', [
    'sass:dev',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'sass:dev',
    'cssmin',
    'ngconstant:build',
    'requirejs',
    'string-replace',
    'copy'
  ]);

  grunt.registerTask('deploy', [
    'clean',
    'sass:dist',
    'cssmin',
    'ngconstant:deploy',
    'requirejs',
    'string-replace',
    'copy',
    'gh-pages'
  ]);

};
