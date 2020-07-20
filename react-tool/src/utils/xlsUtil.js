/**
 * xlsxUtil工具类
 * @author: Mandragora 
 * @date: 2018-05-04 21:38:02 
 * @last Modified by:   Mandragora 
 * @last Modified time: 2018-05-04 21:38:02 
 */
var XLSX = require('xlsx');
module.exports.readXls2Json = function readXls2Json(path) {
    var wb = XLSX.readFile(path);
    // if (wb) {
    //     xlsxUtil.root[path] = wb;
    // }
    var sheetName = wb.SheetNames[0];
    var sheet = wb.Sheets[sheetName];
    var json = XLSX.utils.sheet_to_json(sheet);
    return json;
}
module.exports.writeJson2Xls = function writeJson2Xls(path, json, sn) {
    if (!json || !path) {
        throw new Error('writeJson2Xls Error');
    }
    var wb = XLSX.readFile(path);
    var sheetName;
    if (!wb) {
        wb = XLSX.utils.book_new();
        sheetName = sn;
    } else {
        sheetName = sn ? sn : wb.SheetNames[0];
    }
    wb.Sheets[sheetName] = XLSX.utils.json_to_sheet(json);
    XLSX.writeFile(wb, path);
}