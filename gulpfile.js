var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    eslint = require('gulp-eslint'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    browserSync = require('browser-sync').create();


gulp.task('js-build', function() {
    gulp.src('./js/*.js') // select all the javascript files in the js folder off of the project root folder
      .pipe(plumber())
      .pipe(uglify()) // minify/compress the selected files
      .pipe(rename({ extname: '.min.js' })) //  rename all minified files to have the extension .min.js instead of just .js
      .pipe(gulp.dest('./build/js')) // save all minified files in ./build/js
});

gulp.task('eslint', function() {
    return gulp.src(['js/*.js','!node_modules/**'])
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('BrowserReload', function(done) {
      browserSync.reload();
      done();
})

gulp.task('sass-build', function() {
   gulp.src('./sass/style.scss')
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('./build/css'))
      .pipe(cssnano())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('./build/css'));
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("js/*.js", ['js-build', 'eslint']);
    gulp.watch("sass/*.scss", ['sass-build']);
    
    gulp.watch(["build/css/*", "build/js/*", "index.html"], ["BrowserReload"]);
});

gulp.task('default', ['serve', 'eslint']);