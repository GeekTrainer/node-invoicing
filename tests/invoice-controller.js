process.env.DB_CONNECTION_STRING = 'mongodb://localhost/invoicing-tests';

var chai = require('chai');
var chaiHttp = require('chai-http');

var should = chai.should();
var server = require('../app');

var Invoice = require('../models/invoice');
var Salesperson = require('../models/salesperson');

var initialSalesperson, initialInvoice;

beforeEach(function (done) {
    initialSalesperson = new Salesperson({ name: 'Christopher', email: 'charrison@fourthcoffee.com' });

    initialSalesperson.save(function (err) {
        if (err) console.log(err);

        initialInvoice = new Invoice({
            company: 'Northwind Traders',
            _salespersonId: initialSalesperson._id
        });

        initialInvoice.save(function (err) {
            done();
        });
    });
});

afterEach(function (done) {
    Invoice.collection.drop();
    Salesperson.collection.drop();
    done();
});

chai.use(chaiHttp);

describe('Invoices', function () {
    it('Should create a single invoice in /invoices POST', function (done) {
        chai.request(server)
            .post('/api/invoice')
            .send({ invoice: { company: 'Test company' } })
            .end(function (err, res) {
                res.should.have.status(200);
                shouldBeInvoice(res, 'Test company');
                done();
            });
    });

    it('Should load invoice by ID', function (done) {
        chai.request(server)
            .get('/api/invoice/' + initialInvoice._id.toString())
            .end(function (err, res) {
                shouldBeInvoice(res, initialInvoice.company);
                done();
            });
    });

    it('Should load all invoices for a salesperson', function (done) {
        chai.request(server)
            .get('/api/invoice/salesperson/' + initialSalesperson._id)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('company');
                res.body[0].company.should.equal(initialInvoice.company);
                res.body[0].should.have.property('_salespersonId');
                res.body[0]._salespersonId.should.equal(initialSalesperson._id.toString());
                done();
            });
    });
});

function shouldBeInvoice(res, company) {
    res.should.be.json;
    res.body.should.be.a('object');
    res.body.should.have.property('company');
    res.body.company.should.equal(company);
    res.body.should.have.property('_id');
}