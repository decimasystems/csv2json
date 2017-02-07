import { ConvertorCsvToJson } from './csv2json';

var columnNames = ['municipiu', 'judet', 'cod'];
var converter = new ConvertorCsvToJson();
converter.csv2json('./test.csv', columnNames, /\r\n/, ',', null, (json) => { console.log('csv 2 json: ' + JSON.stringify(json)); });
converter.csv2jsonPromise('./test.csv', columnNames, /\r\n/, ',', null, (json) => { console.log('csv 2 json Promise: ' + JSON.stringify(json)); });
