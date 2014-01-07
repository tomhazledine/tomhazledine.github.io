module.exports=function(grunt){
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');
  
  grunt.initConfig({
    
    autoprefixer: {
      options: {
        browsers:['last 2 versions', 'ie 8', 'ie 9']
        // Task-specific options go here.
      },//options
      dist:{
        files:{
          'style.css': 'root.css'
        }//files
      }//dist
    },//autoprefixer
    
    uglify:{
      my_target:{
        files:{
          'js/script.js':['js/raw/*.js']
        }//files
      }//my_target
    },//uglify
    
    compass:{
      dev:{
        options:{
          config:'config.rb'
        }//options
      }//dev
    },//compass
    
    //imagemin:{
    //  dynamic: {
    //    files: [{
    //      expand: true,
    //      cwd: 'img/raw/',
    //      src: ['**/*.{png,jpg,gif}'],
    //      dest: 'img/build/'
    //    }]//files
    //  }//dynamic
    //},//imagemin
    
    watch:{
      styles:{
        files: ['root.css'],
        tasks: ['autoprefixer']
      },//styles
      options:{ livereload:true},
      scripts:{
        files:['js/raw/*.js'],
        tasks:['uglify']
      },//scripts
      sass:{
        files:['sass/*.scss'],
        tasks:['compass:dev']
      },//sass
      //html:{
      //  files: ['*.html']
      //},//html
      //php:{
      //  files:['*.php']
      //}//php
    }//watch
      
  })//initConfig
  grunt.registerTask('default','watch');
}//exports