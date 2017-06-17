
var fs = require('fs');
var path = require('path');
var basename = path.basename(module.filename);

function setDirectory(directory) {
    var files = {}

    //============== Collect all js files in the specified directory
    fs
        .readdirSync(__dirname + '/../../' + directory)
        //============== Filter this file, hidden files, and non-js files
        .filter(function (file) {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        })
        //============== Require each of those into the files object
        .forEach(function (file) {
            files[file.slice(0, file.length - 3)] = require('../../' + directory + '/' + file);
        });
    return function (app) {
        //============== Execute each exported function when this function is called
        Object.keys(files).forEach(function (file) {
            files[file](app);
        });
    }
}

module.exports = setDirectory;
