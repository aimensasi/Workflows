var gulp = require('gulp'),
    gUtil = require('gulp-util')
    coffee= require('gulp-coffee'),
    concat = require('gulp-concat'),
    browerify = require('gulp-browserify'),
    compass = require('gulp-compass')
    ;

var coffeeSources = ['components/coffee/tagline.coffee'];

var jsSources = [
    'components/scripts/*.js'
];

var sassSources = [
  'components/sass/style.scss' 
];
var allSassSources = [
  'components/sass/*.scss' 
];

gulp.task('coffee', function(){
    gulp.src(coffeeSources)
        .pipe(coffee({bare: true}))
         .on('error', gUtil.log)
        .pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function(){
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(browerify())
        .pipe(gulp.dest('builds/development/js'))
});

gulp.task('compass', function(){
    gulp.src(sassSources)
        .pipe(compass({
            sass: 'components/sass',
            image: 'builds/development/images',
            style: 'nested'
        
        }))
        .on('error', gUtil.log)
        .pipe(gulp.dest('builds/development/css'))
});

gulp.task('watch', function(){
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['js']);
    gulp.watch(allSassSources, ['compass']);
});

gulp.task('default', ['coffee', 'js', 'compass', 'watch']);