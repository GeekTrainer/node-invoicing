var SalesPerson = require('./models/salesperson.js');
var mongoose = require('mongoose');

// createData();

function createData() {
    mongoose.connect('mongodb://test-geektrainer:Y7uOxCe3UtYVpzRvtdTUFZCxNJxWEr9PrWMc43adGpEoPO4uZveuAuz0tGEGfrehQlOEAv9nIN8JnguRLccCew==@test-geektrainer.documents.azure.com:10250/?ssl=true');

    SalesPerson.remove({}).exec(function(err) {
        if(err) {
            console.log(err);
        } else {
            var salesPeople = [];
            ['Peter', 'Kelly', 'Brandy', 'Faye', 'Marcus', 'Heriberto', 'Marquita', 'Bethany', 'Larry', 'Christopher'].forEach(function(name) {
                var salesPerson = {};
                salesPerson.name = name;
                salesPerson.email = name + '@fourthcoffee.com';
                var invoiceCount = Math.floor(Math.random() * 20) + 1;
                salesPerson.invoices = []
                for(var index = 0; index < invoiceCount; index++) {
                    var invoice = {
                        company: getItem(['AdventureWorks', 'Contoso', 'Blue Yonder Airlines', 'Coho Winery', 'Northwind Traders', 'Wingtip Toys']),
                        state: getItem(['Open', 'Closed', 'Past Due']),
                        items: getLineItems()
                    };
                    salesPerson.invoices.unshift(invoice);                   
                }
                salesPeople.unshift(salesPerson);
            });

            SalesPerson.create(salesPeople, function(err) {
                if(err) console.log(err);
                else console.log('SalesPeople Created!!');
            });
        }
    });
}

function getLineItems() {
    var products = [
        {name: 'Filters', price: 10},
        {name: 'Coffee Machine', price: 200},
        {name: 'Coffee Pot', price: 50},
        {name: 'Mug', price: 5},
        {name: 'Assorted Teas', price: 20},
        {name: 'Flavored Creamer', price: 5},
        {name: 'Sugar', price: 6},
        {name: 'Thermos', price: 30},
        {name: 'Stirrers', price: 4},
        {name: 'Coffee Beans', price: 8}
    ]
    var number = Math.floor(Math.random() * (products.length - 1)) + 1;

    var items = [];
    for(var counter = 0; counter < number; counter++) {
        var index = Math.floor(Math.random() * (products.length - 1));
        var item = products.splice(index, 1)[0];
        item.number = Math.floor(Math.random() * 10) + 1;
        items.unshift(item);
    }
    // console.log(items);
    return items;
}

function getItem(items) {
    return items[(Math.floor( Math.random() * (items.length - 1) ))];
}