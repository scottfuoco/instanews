var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    eslint = require('gulp-eslint'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    babel = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync').create();

var plumberErrorHandler = {
    errorHandler: notify.onError({
        title: 'gulp',
        message: 'Error: <%= error.message %>'
    })
};


gulp.task('js-build', function () {
    gulp.src('js/*.js')
        .pipe(plumber(plumberErrorHandler))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('./build/js'))
});

gulp.task('lint', function () {
    return gulp.src(['js/*.js', '!node_modules/**'])
        .pipe(plumber(plumberErrorHandler))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('BrowserReload', function (done) {
    browserSync.reload();
    done();
})

gulp.task('sass-build', function () {
    gulp.src('sass/style.scss')
        .pipe(plumber(plumberErrorHandler))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('build/css'))
        .pipe(cssnano())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('js/*.js', ['js-build', 'lint']);
    gulp.watch('sass/*.scss', ['sass-build']);

    gulp.watch(['build/css/*', 'build/js/*', 'index.html'], ['BrowserReload']);
});

gulp.task('default', ['watch', 'lint']);