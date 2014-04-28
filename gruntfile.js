module.exports=function(grunt){
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-fontsmith');

  grunt.initConfig({

    font:{//fontsmith task
      all:{
        src:['fonts/raw-icons/*.svg'],
        destCss:'sass/_icons.scss',
        destFonts:'fonts/built/icons.{svg,woff,eot,ttf}',
        fontFamily:'icons',
        cssRouter: function (fontpath) {
          return '/' + fontpath;
        }//cssRouter
      }//all
    },//font

    autoprefixer: {
      options: {
        browsers:['last 2 versions', 'ie 8', 'ie 9']
        // Task-specific options go here.
      },//options
      dist:{
        files:{
          'style.css': 'root.css',
          'cassette.css':'unprefixed-cassette.css',
          'keyboard.css':'unprefixed-keyboard.css'
        }//files
      }//dist
    },//autoprefixer

    uglify:{
      my_target:{
        files:{
          'js/script.js':['js/raw/*.js'],
          'js/keyboard.js':['js/pageSpecific/keyboard.js']
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

    copy:{
      css:{
        files:{
          // Copy the scss-generated style file to
          // the _site/ folder
          '_site/style.css': 'style.css',
          '_site/cassette.css':'cassette.css',
          '_site/keyboard.css':'keyboard.css'
        }//files
      },//css
      js:{
        files:{
          // Copy the uglified js file to
          // the _site/ folder
          '_site/js/script.js':'js/script.js',
          '_site/js/keyboard.js':'js/keyboard.js'
        }//files
      },//js
      fonts:{
        files:{
          // Copy the font files to
          // the _site/ folder
          '_site/fonts/built/icons.eot':'fonts/built/icons.eot',
          '_site/fonts/built/icons.svg':'fonts/built/icons.svg',
          '_site/fonts/built/icons.ttf':'fonts/built/icons.ttf',
          '_site/fonts/built/icons.woff':'fonts/built/icons.woff'
        }//files
      }//fonts
    },//copy

    shell:{
      jekyll:{
        command: 'rm -rf _site/*; jekyll build',
        stdout: true
      }//jekyll
    },//shell

    imagemin:{
      dynamic: {
        files: [{
          expand: true,
          cwd: 'img/raw/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'img/build/'
        }]//files
      }//dynamic
    },//imagemin

    watch:{
      iconfont:{
        files:['fonts/raw-icons/*.svg'],
        tasks:['font']
      },//iconfont
      imgmin:{
        files:['img/raw/**/*'],
        tasks:['imagemin']
      },//imgmin
      styles:{
        files: ['root.css','unprefixed-cassette.css','unprefixed-keyboard.css'],
        tasks: ['autoprefixer']
      },//styles
      options:{ livereload:true},
      scripts:{
        files:['js/raw/*.js', 'js/pageSpecific/*.js'],
        tasks:['uglify']
      },//scripts
      sass:{
        files:['sass/*.scss'],
        tasks:['compass:dev']
      },//sass
      jsCopy:{
        files:['js/script.js','js/keyboard.js'],
        tasks:['copy:js']
      },//js
      cssCopy:{
        files:['style.css','cassette.css','keyboard.css'],
        tasks:['copy:css']
      },//cssCopy
      jekyllSources:{
        files:[
          // capture all except css/js
          '*.html',
          '*.yml',
          '_posts/**',
          '_includes/**',
          '_layouts/**',
          'portfolio/**',
          'blog/**',
          'about/**',
          '_plugins/**',
          'fonts/**'
        ],
        tasks:'shell:jekyll',
      }//jekyllSources
    },//watch

  })//initConfig
  grunt.registerTask('default','watch');
}//exports
