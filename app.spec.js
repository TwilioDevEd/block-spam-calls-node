var chai = require('chai');
var server = require('./app')();
var expect = chai.expect;
var request = require('supertest');
var xpathSelect = require('xpath.js');
var { DOMParser } = require('xmldom');

chai.use(require('chai-string'));


function matchesXPATH(xpath, text) {
  var doc = new DOMParser().parseFromString(text);
  var nodes = xpathSelect(doc, xpath);

  expect(nodes.length).to.be.gt(0);
}

describe('/ POST', () => {
  it('should successful without addons on / POST', () => {
    return request(server)
      .post('/')
      .set('content-type', 'application/x-www-form-urlencoded')
      .expect('Content-Type', 'text/xml')
      .expect(200)
      .send()
      .then((response) => {
        matchesXPATH('//Say', response.text);
      });
  });

  it('should be successful with whitepages on / POST', () => {
    return request(server)
      .post('/')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({'AddOns': JSON.stringify(require('./fixtures/successful_whitepages.json'))})
      .expect(200)
      .expect('Content-Type', 'text/xml')
      .then((response) => {
        matchesXPATH('//Say', response.text);
      });
  });

  it('should be blocked with whitepages on / POST', () => {
    return request(server)
      .post('/')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({'AddOns': JSON.stringify(require('./fixtures/spam_whitepages.json'))})
      .expect(200)
      .expect('Content-Type', 'text/xml')
      .then((response) => {
        matchesXPATH('//Reject', response.text);
      });
  });

  it('should be successful with marchex on / POST', () => {
    return request(server)
      .post('/')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({'AddOns': JSON.stringify(require('./fixtures/successful_marchex.json'))})
			.expect(200)
      .expect('Content-Type', 'text/xml')
      .then((response) => {
        matchesXPATH('//Say', response.text);
      });
  });

  it('should be blocked with marchex on / POST', () => {
    return request(server)
      .post('/')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({'AddOns': JSON.stringify(require('./fixtures/spam_marchex.json'))})
			.expect(200)
      .expect('Content-Type', 'text/xml')
      .then((response) => {
        matchesXPATH('//Reject', response.text);
      });
  });

  it('should be successful with nomorobo on / POST', () => {
    return request(server)
      .post('/')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({'AddOns': JSON.stringify(require('./fixtures/successful_nomorobo.json'))})
			.expect(200)
      .expect('Content-Type', 'text/xml')
      .then((response) => {
        matchesXPATH('//Say', response.text);
      });
  });

  it('should be blocked with nomorobo on / POST', () => {
    return request(server)
      .post('/')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({'AddOns': JSON.stringify(require('./fixtures/spam_nomorobo.json'))})
			.expect(200)
      .expect('Content-Type', 'text/xml')
      .then((response) => {
        matchesXPATH('//Reject', response.text);
      });
  });

  it('should be successful with nomorobo API Failure on / POST', () => {
    return request(server)
      .post('/')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({'AddOns': JSON.stringify(require('./fixtures/failed_nomorobo.json'))})
			.expect(200)
      .expect('Content-Type', 'text/xml')
      .then((response) => {
        matchesXPATH('//Say', response.text);
      });
  });
});
