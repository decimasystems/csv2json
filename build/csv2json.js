"use strict";
var fs = require('fs');
var ConvertorCsvToJson = (function () {
    function ConvertorCsvToJson() {
    }
    /**
     * csv to json from a given csv file .
     *
     * @param  {String} csvFilePath
     * @param  {Array} columnNames
     * @param  {String} lineSeparator
     * @param  {String} valueSeparators
     * @param  {function} filter
     * @param  {function} callback
     * @return {JSON}
     */
    ConvertorCsvToJson.prototype.csv2json = function (csvFilePath, columnNames, lineSeparator, valueSeparator, callbackFilter, callbackJson) {
        if (callbackFilter === void 0) { callbackFilter = null; }
        lineSeparator = lineSeparator ? lineSeparator : /\r\n/;
        valueSeparator = valueSeparator ? valueSeparator : ',';
        fs.readFile(csvFilePath, 'utf-8', function (err, data) {
            if (err) {
                console.log(err);
                return err;
            }
            return processData(data, columnNames, lineSeparator, valueSeparator, callbackFilter, callbackJson);
        });
    };
    /**
     * csv to json from a given csv file using Promise.
     *
     * @param  {String} csvFilePath
     * @param  {Array} columnNames
     * @param  {String} lineSeparator
     * @param  {String} valueSeparators
     * @param  {function} filter
     * @param  {function} callback
     * @return {JSON}
     */
    ConvertorCsvToJson.prototype.csv2jsonPromise = function (csvFilePath, columnNames, lineSeparator, valueSeparator, callbackFilter, callbackJson) {
        if (callbackFilter === void 0) { callbackFilter = null; }
        lineSeparator = lineSeparator ? lineSeparator : /\r\n/;
        valueSeparator = valueSeparator ? valueSeparator : ',';
        return this.readFilePromise(csvFilePath, 'utf-8').then(function (csv) {
            return processData(csv, columnNames, lineSeparator, valueSeparator, callbackFilter, callbackJson);
        }, function (err) {
            console.log(err);
            throw err;
        });
    };
    ConvertorCsvToJson.prototype.readFilePromise = function (filename, encoding) {
        return new Promise(function (resolve, reject) {
            fs.readFile(filename, encoding, function (err, data) {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    };
    ;
    return ConvertorCsvToJson;
}());
exports.ConvertorCsvToJson = ConvertorCsvToJson;
function processData(csv, columnNames, lineSeparator, valueSeparator, callbackFilter, callbackJson) {
    var json = [];
    if (csv) {
        var lines = csv.split(lineSeparator);
        for (var i = 0; i < lines.length; i++) {
            var jsonVal = {};
            var line = lines[i];
            if (line) {
                var values = line.split(valueSeparator);
                for (var j = 0; j < columnNames.length; j++) {
                    var valKey = columnNames[j];
                    var val = values[j] ? values[j] : '';
                    jsonVal[valKey] = values[j];
                }
                if (callbackFilter) {
                    if (callbackFilter(jsonVal)) {
                        json.push(jsonVal);
                    }
                }
                else {
                    json.push(jsonVal);
                }
            }
        }
    }
    callbackJson(json);
}
exports.processData = processData;
//# sourceMappingURL=csv2json.js.map