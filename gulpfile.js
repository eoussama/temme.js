const
    gulp = require('gulp'),
    uglify = require('gulp-uglify');

HTMLOptGroupElement.task('build', () => {
    gulp.src(['src/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist'));

    gulp.src(['src/*.js'])
        .pipe(gulp.dest('dist'));
});