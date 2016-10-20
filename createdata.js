const Salesperson = require('./models/salesperson.js');
const Invoice = require('./models/invoice.js');
const mongoose = require('mongoose');

createData();

function createData() {
    mongoose.connect('mongodb://localhost/invoicing');

    Salesperson.remove({})
        .exec((err) => {
            if (err) {
                console.log(err);
            } else {
                Invoice.remove({})
                    .exec((err) => {
                        ['Peter', 'Kelly', 'Brandy', 'Faye', 'Marcus', 'Heriberto', 'Marquita', 'Bethany', 'Larry', 'Christopher'].forEach(function (name) {
                            var newSalesperson = {
                                name: name,
                                email: name + '@fourthcoffee.com'
                            };
                            Salesperson.create(newSalesperson, (err, salesperson) => {
                                if (err) console.log(err);
                                else {
                                    const invoices = [];
                                    var invoiceCount = Math.floor(Math.random() * 20) + 1;
                                    for (var index = 0; index < invoiceCount; index++) {
                                        var invoice = {
                                            company: getItem(['AdventureWorks', 'Contoso', 'Blue Yonder Airlines', 'Coho Winery', 'Northwind Traders', 'Wingtip Toys']),
                                            state: getItem(['Open', 'Closed', 'Past Due']),
                                            items: getLineItems(),
                                            _salespersonId: salesperson._id
                                        };
                                        invoices.push(invoice);
                                    }
                                    Invoice.create(invoices);
                                }
                            });
                        });
                    });
            }
        });
}

function getLineItems() {
    var products = [
        { name: 'Filters', price: 10 },
        { name: 'Coffee Machine', price: 200 },
        { name: 'Coffee Pot', price: 50 },
        { name: 'Mug', price: 5 },
        { name: 'Assorted Teas', price: 20 },
        { name: 'Flavored Creamer', price: 5 },
        { name: 'Sugar', price: 6 },
        { name: 'Thermos', price: 30 },
        { name: 'Stirrers', price: 4 },
        { name: 'Coffee Beans', price: 8 }
    ]
    var number = Math.floor(Math.random() * (products.length - 1)) + 1;

    var items = [];
    for (var counter = 0; counter < number; counter++) {
        var index = Math.floor(Math.random() * (products.length - 1));
        var item = products.splice(index, 1)[0];
        item.number = Math.floor(Math.random() * 10) + 1;
        items.unshift(item);
    }
    return items;
}

function getItem(items) {
    return items[(Math.floor(Math.random() * (items.length - 1)))];
}