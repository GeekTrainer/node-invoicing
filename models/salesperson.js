var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var salesPersonSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true}
});

module.exports = mongoose.model('SalesPerson', salesPersonSchema);
