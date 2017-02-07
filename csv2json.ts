const fs = require('fs');
export class ConvertorCsvToJson {
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
    public csv2json(csvFilePath, columnNames, lineSeparator, valueSeparator, callbackFilter: (item) => boolean = null, callbackJson: (json) => void) {
        lineSeparator = lineSeparator ? lineSeparator : /\r\n/;
        valueSeparator = valueSeparator ? valueSeparator : ',';

        fs.readFile(csvFilePath, 'utf-8', function (err, data) {
            if (err) {
                console.log(err);
                return err;
            }
            return processData(data, columnNames, lineSeparator, valueSeparator, callbackFilter, callbackJson);
        });
    }

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
    public csv2jsonPromise(csvFilePath, columnNames, lineSeparator, valueSeparator, callbackFilter: (item) => boolean = null, callbackJson: (json) => void) {
        lineSeparator = lineSeparator ? lineSeparator : /\r\n/;
        valueSeparator = valueSeparator ? valueSeparator : ',';

        return this.readFilePromise(csvFilePath, 'utf-8').then((csv: any) => {
            return processData(csv, columnNames, lineSeparator, valueSeparator, callbackFilter, callbackJson);
        }, (err) => {
            console.log(err);
            throw err;
        });
    }

    public readFilePromise(filename, encoding) {
        return new Promise((resolve, reject) => {
            fs.readFile(filename, encoding, (err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    };
}

export function processData(csv, columnNames, lineSeparator, valueSeparator, callbackFilter, callbackJson) {
    var json = [];
    if (csv) {
        var lines = csv.split(lineSeparator);
        for (let i = 0; i < lines.length; i++) {
            var jsonVal = {};
            var line = lines[i];
            if (line) {
                var values = line.split(valueSeparator);
                for (let j = 0; j < columnNames.length; j++) {
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


