/**
 * This is a bespoke gulp file I've created to allow the creation of 'subapps'
 * within the prototyping kit. It's quick and not as nice as it could be
 * because I'm deliberately trying to make the upgrade path smooth.
 *
 * The 'subapp' task is what gets ran within the start.js file for
 * this prototype.
 */

var gulp = require('gulp')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')

gulp.task('subapp-sass', function () {
  console.log("error here?")

	// any sass file found within views will get processed.
  return gulp.src('app/views/**/*.scss')
  .pipe(sass({outputStyle: 'expanded',
    includePaths: ['govuk_frontend_toolkit/stylesheets',
      'govuk_template_jinja/assets/stylesheets',
      'govuk-elements-sass/',
      'app/assets/sass/'
    ]}).on('error', sass.logError))
  .pipe(sourcemaps.init())
  .pipe(sourcemaps.write())
	// this writes the file to the same location as the src file.
  .pipe(gulp.dest(function(file) {
    return file.base;
	}))
})

// Watch files for changes (without Browser-Sync)
gulp.task('watch-subapp-sass', function() {
  // Watch .scss files
  gulp.watch('app/views/apps/**/*.scss', gulp.series('subapp-sass'));
});

// I've removed your 'subapp-tasks' task as not required. 
// You're watching the sass files above and running 'subapp-sass' when changes are made anyway.

// Then I swapped the below 'subapp-tasks' with 'subapp-sass'.
// I've also changes watch to 'watch-subapp-sass' as watch was not a task.
// Also commented out 'generate-assets' as it doesn't exist in this gulpfile

gulp.task('subapp', gulp.series(
  // 'generate-assets',
  'subapp-sass',
  'watch-subapp-sass',
  'server'
))
