module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      compile: {
        files: {
          'css/styles.css': 'css/src/styles.sass'
        },
        options: {
          style: 'compressed',
        }
      }
    },
    watch: {
      styles: {
        files: ['css/src/*.sass'],
        tasks: ['sass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', 'watch');
};
