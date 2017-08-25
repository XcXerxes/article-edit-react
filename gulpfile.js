var gulp = require('gulp')
var bs = require('browser-sync').create()

gulp.task('default',()=>{
  bs.init({
    server:{
      baseDir:'./dist'
    }
  })
})