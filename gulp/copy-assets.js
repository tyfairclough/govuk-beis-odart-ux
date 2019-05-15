/*
  copy.js
  ===========
  copies images and javascript folders to public
*/

const gulp = require('gulp')

const config = require('./config.json')

gulp.task('copy-assets', function () {
  return gulp.src(['!' + config.paths.assets + 'sass{,/**/*}',
    config.paths.assets + '/**'])
    .pipe(gulp.dest(config.paths.public))
})

gulp.task('copy-files', function () {
  return gulp.src(['!' + config.paths.assets + 'files{,/**/*}',
    config.paths.assets + '/**'])
    .pipe(gulp.dest(config.paths.public))
})

gulp.task('copy-assets-documentation', function () {
  return gulp.src(['!' + config.paths.docsAssets + 'sass{,/**/*}',
    config.paths.docsAssets + '/**'])
    .pipe(gulp.dest(config.paths.public))
})

gulp.task('copy-assets-v6', function () {
  return gulp.src(['!' + config.paths.v6Assets + 'sass{,/**/*}',
    config.paths.v6Assets + '/**'])
    .pipe(gulp.dest(config.paths.public + '/v6'))
})

// console.log("subapp path is" + config.paths.subappAssets);

// gulp.task('copy-files', function () {
//   return gulp.src(config.paths.subappAssets + '/**/*.csv' || '/**/*.xml')
//   .pipe(gulp.dest(config.paths.public + '/assets/apps/'))
// })
