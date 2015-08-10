'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    path = require('path'),
    tsd = require('tsd'),
    tsdJson = 'tsd.json',
    tsdApi = new tsd.getAPI(tsdJson);

gulp.task('tsd:install', function () {
    var bower, dependencies, query, options;
    bower = require(path.join(process.cwd(), 'bower.json'));

    dependencies = [].concat(
        Object.keys(bower.dependencies),
        Object.keys(bower.devDependencies)
    );

    query = new tsd.Query();
    dependencies.forEach(function (dependency) {
        query.addNamePattern(dependency);
    });
    query.addNamePattern('karma-jasmine');

    options = new tsd.Options();
    options.resolveDependencies = true;
    options.overwriteFiles = true;
    options.saveBundle = true;

    return tsdApi.readConfig()
        .then(function () {
            return tsdApi.select(query, options);
        })
        .then(function (selection) {
            return tsdApi.install(selection, options);
        })
        .then(function (installResult) {
            var written = Object.keys(installResult.written.dict),
                removed = Object.keys(installResult.removed.dict),
                skipped = Object.keys(installResult.skipped.dict);

            written.forEach(function (dts) {
                gutil.log('Definition file written: ' + dts);
            });

            removed.forEach(function (dts) {
                gutil.log('Definition file removed: ' + dts);
            });

            skipped.forEach(function (dts) {
                gutil.log('Definition file skipped: ' + dts);
            });
        });
});

gulp.task('tsd:purge', function () {
    return tsdApi.purge(true, true);
});

gulp.task('tsd', ['tsd:install']);
