module.exports = function(grunt) {
  grunt.initConfig({
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', '> 1%']
      },
      dist: {
        files: {
          'static/css/styles.css': 'static/css/styles.css',
          'static/css/app.css': 'static/css/app.css'
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'static/css/dist/styles.min.css': 'static/css/styles.css',
          'static/css/dist/app.min.css': 'static/css/app.css'
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'static/js/dist/main.min.js': 'static/js/main.js'
        }
      }
    },
    watch: {
      scripts: {
        files: ['static/js/*.js', 'static/css/*.css'],
        tasks: ['build']
      }
    }
  });

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['uglify', 'autoprefixer', 'cssmin']);
  grunt.registerTask('default', ['watch']);
}
