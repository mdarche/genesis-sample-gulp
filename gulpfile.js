"use strict";

const dir = {
    src: "assets/",
    build: "./"
  },
  gulp = require("gulp"),
  gutil = require("gulp-util"),
  sass = require("gulp-sass"),
  postcss = require("gulp-postcss"),
  concat = require("gulp-concat"),
  stripdebug = require("gulp-strip-debug"),
  uglify = require("gulp-uglify-es").default;

var browsersync = false;

// Javascript

const js = {
  src: dir.src + "js/**/*",
  build: "./dist",
  filename: "scripts.js"
};

gulp.task("js", () => {
  return gulp
    .src(js.src)
    .pipe(concat(js.filename))
    .pipe(stripdebug())
    .pipe(uglify())
    .pipe(gulp.dest(js.build))
    .pipe(browsersync ? browsersync.reload({ stream: true }) : gutil.noop());
});

// CSS

var css = {
  src: dir.src + "sass/style.scss",
  watch: dir.src + "sass/**/*",
  build: "./",
  sassOpts: {
    outputStyle: "compressed",
    precision: 3,
    errLogToConsole: true
  },
  processors: [
    require("autoprefixer")({
      browsers: ["last 2 versions", "> 2%"]
    }),
    // require('css-mqpacker'),
    require("cssnano")
  ]
};

gulp.task("css", () => {
  return gulp
    .src(css.src)
    .pipe(sass(css.sassOpts))
    .pipe(postcss(css.processors))
    .pipe(gulp.dest(css.build))
    .pipe(browsersync ? browsersync.reload({ stream: true }) : gutil.noop());
});

// Watch Settings

gulp.task("build", ["css", "js"]);

gulp.task("watch", () => {
  gulp.watch(css.watch, ["css"]);

  gulp.watch(js.src, ["js"]);
});

gulp.task("default", ["build", "watch"]);
