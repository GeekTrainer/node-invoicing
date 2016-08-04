var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    number: {type: Number, required: true}
});

itemSchema.virtual('total').get(function() {
    return this.price * this.number;
});

var invoiceSchema = new Schema({
    company: {type: String, index: true},
    salesPerson: {type: String, index: true},
    state: {type: String, enum: ['Open', 'Closed', 'Past Due']},
    items: [itemSchema]
});

invoiceSchema.virtual('total').get(function() {
    var runningTotal = 0;
    this.items.forEach(function(item) {runningTotal += item.total});
    return runningTotal;
});

var Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
