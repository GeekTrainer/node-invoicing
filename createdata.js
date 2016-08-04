var Invoice = require('./models.invoice.js')

createData();

function createData() {
    mongoose.connect('mongodb://localhost/invoices');

    Invoice.remove({}, function(err) {
        if(!err) {
            var invoices = [];
            for(var counter = 0; counter < 1000; counter++) {
                var invoice = new Invoice({
                    company: getItem(['AdventureWorks', 'Contoso', 'Blue Yonder Airlines', 'Coho Winery', 'Fourth Coffee', 'Northwind Traders', 'Wingtip Toys']),
                    salesPerson: getItem(['Peter', 'Kelly', 'Brandy', 'Faye', 'Marcus', 'Heriberto', 'Marquita', 'Bethany', 'Larry', 'Christopher']),
                    state: getItem(['Open', 'Closed', 'Past Due']),
                    items: getLineItems()
                });
                invoices.unshift(invoice);
            }
            Invoice.create(invoices, function(err){
                if(err) console.log(err);
                else console.log('Done!!');
            })
        } else {
            console.log(err);
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