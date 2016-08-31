module.exports = function(grunt) {

  var globalConfig =  {
    path_dev_root: '_dev/',
    path_dev_css: '<%= globalConfig.path_dev_root %>style/',
    path_dev_js: '<%= globalConfig.path_dev_root %>script/',

    path_dist_root: 'public/',
    path_dist_bower: '<%= globalConfig.path_dev_root %>bower_components/',

    path_dist_css: '<%= globalConfig.path_dist_root %>style/',
    path_dist_js: '<%= globalConfig.path_dist_root %>script/',
    path_dist_img: '<%= globalConfig.path_dist_root %>images/',
    path_dist_fonts: '<%= globalConfig.path_dist_root %>fonts/',

    lib_scripts: [
      '<%= globalConfig.path_dist_bower %>jquery/dist/jquery.min.js',
    ],
    scripts: [
      '<%= globalConfig.path_dev_root %>script/*.js'
    ],
  };

  // Project configuration.
  grunt.initConfig({

    globalConfig: globalConfig,


    // Install our bower dependancies
    bower: {
      install: {
        options: {
          copy: false // Defaults to true and copies bower files to /lib which we don't want
        }
      }
    },

    // Clean out the /dist directory to ensure only current files are present
    clean: {
      dist: ["<%= globalConfig.path_dist_root %>"]
    },

    pkg: grunt.file.readJSON('package.json'),

    // Minify Concatenated JS
    uglify: {
      options: {
        banner: '/* Build: <%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= globalConfig.path_dist_js %>',
          src: '*.js',
          dest: '<%= globalConfig.path_dist_js %>'
        }]
      }
    },

    copy: {

      // make a copy of css files with the extension .scss so we can use @import
      bower_cssAsScss: {
        files: [
          {
            expand: true,
            cwd: '<%= globalConfig.path_dev_bower %>',
            src: ['**/*.css', '!**/*.min.css'],
            dest: '<%= globalConfig.path_dev_bower %>',
            filter: 'isFile',
            ext: ".scss"
          }
        ]
      }

    },

    // Process SCSS to CSS
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          '<%= globalConfig.path_dist_css %>style.css': '<%= globalConfig.path_dev_css %>base.scss'
        }
      }
    },

    // Concatenate JS as specified in globalConfig
    concat: {   
      dist: {
        files: [
          {
            src: ['<%= globalConfig.lib_scripts %>','<%= globalConfig.scripts %>'],
            dest: '<%= globalConfig.path_dist_js %>main.min.js',
          }
        ]
      }
    },

    // Watch files for changes and apply if changed
    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: ['<%= globalConfig.path_dev_css %>*.scss'],
        tasks: ['sass:dist']
      },
      js: {
        files: ['<%= globalConfig.path_dev_js %>*.js'],
        tasks: ['uglify:dist']
      }
    }

  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // Default task(s).
  grunt.registerTask('_basics', [
    'copy:bower_cssAsScss',
    'sass:dist',  
    'concat:dist',
    'uglify:dist'
  ]);

  grunt.registerTask('default', ['_basics', 'watch']);

};

