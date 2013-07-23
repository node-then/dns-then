/*
 * Copyright 2013 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

var dns = require('..'),
	buster = require('buster'),
	path = require('path'),
    assert, refute, fail, goodHost, badHost;

assert = buster.assertions.assert;
refute = buster.assertions.refute;
fail = buster.assertions.fail;

goodHost = 'cujojs.com';
badHost = 'foo.bar.cujojs.com';

// increase test timeout for bad lookups on travis-ci
buster.testRunner.timeout = 1000;

buster.testCase('dns-then.lookup()', {
	'given a invocation with a callback': {
		'it should fire the callback with a value for a good host': function (done) {
			var promise = dns.lookup(goodHost, function (err, address) {
				assert(address);
				refute(err);
				done();
			});
			assert.isFunction(promise.then);
		},
		'it should fire the callback with an error for a bad host': function (done) {
			var promise = dns.lookup(badHost, function (err, address) {
				refute(address);
				assert(err);
				done();
			});
			assert.isFunction(promise.then);
		}
	},
	'given a invocation without a callback': {
		'it should resolve the returned promise with a value for a good host': function () {
			return dns.lookup(goodHost).then(
				function (address) {
					assert(address);
				},
				fail
			);
		},
		'it should reject the returned promise with an error for a bad host': function () {
			return dns.lookup(badHost).then(
				fail,
				function (err) {
					assert(err);
				}
			);
		}
	}
});
