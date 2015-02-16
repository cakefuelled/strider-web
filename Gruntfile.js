module.exports = function(grunt) {
  grunt.initConfig({
    bowerRequirejs: {
      target: {
        rjsConfig: './app/config.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-requirejs');

  grunt.registerTask('default', ['bowerRequirejs']);

};
