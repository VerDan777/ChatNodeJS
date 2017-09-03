const gulp = require('gulp');
const pug = require('gulp-pug2');

gulp.task('pugRender',function(){
    return gulp.src('./client/src/**/*.pug')
    .pipe(pug()).on('error',function(err){
        console.log(err.toString());
    })
    .pipe(gulp.dest('./client/dist/'));
});