module.exports = function(grunt) {
  grunt.initConfig({
    includes: {
      files: {
          src: ['sense-search.js'],
          dest: 'build/',
          cwd: 'src/js'
      }
    },
    watch: {
      styles: {
        files: ['src/**/*.js','src/less/**/*.less'], // which files to watch
        tasks: ['includes','uglify','less'],
        options: {
          nospawn: true,
          livereload: true
        }
      }
    },
    less:{
      development: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 2
        },
        files: [
          {
            "build/sense-search.css": "src/less/main.less" // destination file and source file
          }
        ]
      },
      production: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: [
          {
            "build/sense-search.min.css": "src/less/main.less" // destination file and source file
          },
          {
            "examples/sense-search.min.css": "src/less/main.less" // destination file and source file
          }
        ]
      }
    },
    uglify:{
      options : {
        beautify : false,
        mangle   : true,
        compress : true
      },
      build: {
        files: [
          {
            'build/sense-search.min.js': ['build/sense-search.js']
          },
          {
            'examples/sense-search.min.js': ['build/sense-search.js']
          }
        ]
      }
    },
    express: {
			prod: {
				options: {
          port: 3000,
					script: "index.js"
				}
			}
		}
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-includes');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.registerTask('default', ['includes','uglify','less','express','watch']);
};
