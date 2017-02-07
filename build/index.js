"use strict";
var csv2json_1 = require("./csv2json");
var columnNames = ['municipiu', 'judet', 'cod'];
var converter = new csv2json_1.ConvertorCsvToJson();
converter.csv2json('./test.csv', columnNames, /\r\n/, ',', null, function (json) { console.log('csv 2 json: ' + JSON.stringify(json)); });
converter.csv2jsonPromise('./test.csv', columnNames, /\r\n/, ',', null, function (json) { console.log('csv 2 json Promise: ' + JSON.stringify(json)); });
//# sourceMappingURL=index.js.map