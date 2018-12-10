const
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

// Building the code for production.
gulp.task('build', () => {
    gulp.src('src/temme.ts')

        // Compiling from typescript to javascript.
        .pipe(gulp.dest('dist'))

        // Minifying Temme.
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('docs/assets/js/lib'));
});

// Gulp's default task.
gulp.task('default', ['build']);
