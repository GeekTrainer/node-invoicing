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
    state: {type: String, enum: ['Open', 'Closed', 'Past Due']},
    items: [itemSchema],
    salesperson_id: ObjectId
});

invoiceSchema.virtual('total').get(function() {
    var runningTotal = 0;
    this.items.forEach(function(item) {runningTotal += item.total});
    return runningTotal;
});

module.exports = mongoose.model('invoice', invoiceSchema);