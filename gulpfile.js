const
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

// Translating to es5 and copying the temme.js file to the dist folder.
gulp.task('copy', () => {
    gulp.src('src/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))        
        .pipe(gulp.dest('dist'));
});

// Translating to es, minifying and copying the temme.js file to the dist folder.
gulp.task('minify', () => {
    return gulp.src(['src/*.js'])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['copy', 'minify']);