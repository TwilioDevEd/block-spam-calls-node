var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('./app');
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);
chai.use(require('chai-string'));


it('should successful without addons on / POST', function(done) {
	chai.request(server)
		.post('/')
		.set('content-type', 'application/x-www-form-urlencoded')
		.send()
		.end(function(err, res){
			res.should.have.status(200);
			expect(res).to.have.header('content-type', 'text/xml');
			res.text.should.not.containIgnoreSpaces('<Reject');
			done();
		});
});

it('should be successful with whitepages on / POST', function(done) {
	chai.request(server)
		.post('/')
		.set('content-type', 'application/x-www-form-urlencoded')
		.send({'AddOns': require('./fixtures/successful_whitepages.json')})
		.end(function(err, res){
			res.should.have.status(200);
			expect(res).to.have.header('content-type', 'text/xml');
			res.text.should.not.containIgnoreSpaces('<Reject');
			done();
		});
});

it('should be blocked with whitepages on / POST', function(done) {
	chai.request(server)
		.post('/')
		.set('content-type', 'application/x-www-form-urlencoded')
		.send({'AddOns': require('./fixtures/spam_whitepages.json')})
		.end(function(err, res){
			res.should.have.status(200);
			expect(res).to.have.header('content-type', 'text/xml');
			res.text.should.containIgnoreSpaces('<Reject');
			done();
		});
});

it('should be successful with marchex on / POST', function(done) {
	chai.request(server)
		.post('/')
		.set('content-type', 'application/x-www-form-urlencoded')
		.send({'AddOns': require('./fixtures/successful_marchex.json')})
		.end(function(err, res){
			res.should.have.status(200);
			expect(res).to.have.header('content-type', 'text/xml');
			res.text.should.not.containIgnoreSpaces('<Reject');
			done();
		});
});

it('should be blocked with marchex on / POST', function(done) {
	chai.request(server)
		.post('/')
		.set('content-type', 'application/x-www-form-urlencoded')
		.send({'AddOns': require('./fixtures/spam_marchex.json')})
		.end(function(err, res){
			res.should.have.status(200);
			expect(res).to.have.header('content-type', 'text/xml');
			res.text.should.containIgnoreSpaces('<Reject');
			done();
		});
});

it('should be successful with nomorobo on / POST', function(done) {
	chai.request(server)
		.post('/')
		.set('content-type', 'application/x-www-form-urlencoded')
		.send({'AddOns': require('./fixtures/successful_nomorobo.json')})
		.end(function(err, res){
			res.should.have.status(200);
			expect(res).to.have.header('content-type', 'text/xml');
			res.text.should.not.containIgnoreSpaces('<Reject');
			done();
		});
});

it('should be blocked with nomorobo on / POST', function(done) {
	chai.request(server)
		.post('/')
		.set('content-type', 'application/x-www-form-urlencoded')
		.send({'AddOns': require('./fixtures/spam_nomorobo.json')})
		.end(function(err, res){
			res.should.have.status(200);
			expect(res).to.have.header('content-type', 'text/xml');
			res.text.should.containIgnoreSpaces('<Reject');
			done();
		});
});

it('should be successful with nomorobo API Failure on / POST', function(done) {
	chai.request(server)
		.post('/')
		.set('content-type', 'application/x-www-form-urlencoded')
		.send({'AddOns': require('./fixtures/failed_nomorobo.json')})
		.end(function(err, res){
			res.should.have.status(200);
			expect(res).to.have.header('content-type', 'text/xml');
			res.text.should.not.containIgnoreSpaces('<Reject');
			done();
		});
});