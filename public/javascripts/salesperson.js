var viewModel = {};

var Item = function (data) {
    var self = this;

    self.name = ko.observable(data.name);
    self.number = ko.observable(data.number);
    self.price = ko.observable(data.price);
}

var Invoice = function (data) {
    var self = this;

    self.id = ko.observable(data._id);
    self.company = ko.observable(data.company);
    self.state = ko.observable(data.state);
    self.items = ko.observableArray($.map(data.items, function (item) {
        return new Item(item);
    }));
}

// configure viewModel
viewModel.alertMessage = ko.observable();
viewModel.currentInvoice = ko.observable();
viewModel.products = ko.observableArray();
viewModel.states = ko.observableArray();

viewModel.displayAlert = function (text) {
    viewModel.alertMessage(text);
    $('#alert-message').removeClass('hidden');
}

viewModel.displayForm = function (invoiceId) {
    if (invoiceId) {
        $.get('/api/invoice/' + invoiceId, function (data) {
            viewModel.currentInvoice(new Invoice(data));
            $('#invoice-form').modal('toggle');
        });
    } else {
        viewModel.currentInvoice(new Invoice());
        $('#invoice-form').modal('toggle');
    }
}

viewModel.save = function () {
    var currentInvoice = ko.toJS(this);
    var url = '/api/invoice/';
    var method = '';
    var operation = '';

    if(currentInvoice.id) {   
        var id = currentInvoice.id;
        url += id;
        operation = 'Updated';
        method = 'PUT';
    } else {
        method = 'POST';
    }
    $.ajax(url, {
        method: method,
        data: {invoice: ko.toJSON(this)},
    }).then(function() {
        viewModel.displayAlert(operation + ' invoice for ' + currentInvoice.company);
        $('#invoice-form').modal('toggle');
    });
}

$(function () {
    $.get('/api/invoice/products')
        .then(function (data) {
            viewModel.products(data);
        }).then($.get('/api/invoice/states')
            .then(function (data) {
                viewModel.states(data);
            }));
})

ko.applyBindings(viewModel);
