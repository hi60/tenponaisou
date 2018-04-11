var gulp = require('gulp');
var sass = require('gulp-sass');
var ejs = require('gulp-ejs');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('sass', function() {
    return gulp.src(['./src/sass/**/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('./htdocs/assets/css'));
});

gulp.task('ejs', function() {
    return gulp.src(['./src/ejs/**/*.ejs', '!./src/ejs/**/_*.ejs'])
        .pipe(ejs())
        .pipe(rename( {extname: '.html'} ))
        .pipe(gulp.dest('./htdocs'));
});

gulp.task('browser-sync', function() {
    return browserSync.init({
        server: {
            baseDir: 'htdocs',
            index: 'index.html'
        },
        opne: 'external',
        port: 2000
    });
});

gulp.task('bs-reload', function() {
    browserSync.reload();
})

gulp.task('default', ['sass', 'ejs', 'browser-sync'], function() {
    gulp.watch('./src/sass/**/*.scss', ['sass']).on('change', reload);
    gulp.watch('./src/ejs/**/*.ejs', ['ejs']).on('change', reload);
    gulp.watch('./htdocs/assets/js/script.js', ['bs-reload']);
})