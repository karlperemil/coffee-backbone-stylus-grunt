module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    project: {
      folders: {
        develop: 'develop',
        deploy: 'deploy',
        source: 'app'
      }
    },

    watch: {
      html: {
        files: ['<%= project.folders.source %>/{,**/}*.html'],
        tasks: ['clean:html', 'bake']
      },
      coffee: {
        files: ['<%= project.folders.source %>/js/{,**/}*.coffee', '<%= project.folders.source %>/js_ext/{,**/}*.*'],
        tasks: ['clean:js', 'coffee']
      },
      sass: {
        files: ['<%= project.folders.source %>/css/{,**/}*.*'],
        tasks: ['clean:sass', 'sass']
      }
    },

    clean: {
      html: ['<%= project.folders.develop %>/*.html'],
      js: ['<%= project.folders.develop %>/js/*'],
      img: ['<%= project.folders.develop %>/img/*'],
      sass: ['<%= project.folders.develop %>/css/*']
    },

    coffee: {
      options: {
        join: true
      },
      default: {
        files: {
          '<%= project.folders.develop %>/js/main.js': [
            '<%= project.folders.source %>/js/{,**/}*.coffee',
            '<%= project.folders.source %>/js/includes/initiate.coffee'
          ]
        }
      }
    },

    sass: {
      options: {
        compass: true
      },

      default: {
        files: {
          '<%= project.folders.develop %>/css/main.css': '<%= project.folders.source %>/css/main.scss'
        }
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'app/js/main.js',
        dest: 'deploy/js/main.min.js'
      }
    },
  });
  
  //watches for changes in files
  grunt.loadNpmTasks('grunt-contrib-watch');

  //removes old crap
  grunt.loadNpmTasks('grunt-contrib-clean');

  //copies files to develop testing folder
  grunt.loadNpmTasks('grunt-contrib-copy');

  //compiles coffee to js
  grunt.loadNpmTasks('grunt-contrib-coffee');

  //compiles sass to css
  grunt.loadNpmTasks('grunt-contrib-sass');

  //compass???
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

  //compile coffee
  grunt.loadNpmTasks('grunt-contrib-coffee');

  grunt.registerTask('develop', 'Deploy', function () {
    grunt.task.run([
      'clean',
      'sass',
      'coffee',
      'uglify'
    ]);
  });

  grunt.registerTask('default', [
    'develop',
    'watch'
  ]);

};