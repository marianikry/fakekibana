var jQuery = require('jquery-browserify');
var DataTable = require('datatables.net')()

jQuery.fn.DataTable = DataTable;
module.exports = function (n) {
    return n * 111
};