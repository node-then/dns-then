/*
 * Copyright 2013 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

var dnsThen = require('..'),
	dns = require('dns'),
	buster = require('buster'),
    assert, refute, fail, whitelist;

assert = buster.assertions.assert;
refute = buster.assertions.refute;
fail = buster.assertions.fail;

whitelist = require('../lib/method-whitelist.json');

function onWhiteList(name) {
	return whitelist.indexOf(name) >= 0;
}

buster.testCase('fs-then/method-whitelist', {
	'should wrap methods on the whitelist': function () {
		Object.keys(dns).forEach(function (prop) {
			if (onWhiteList(prop)) {
				refute.same(dns[prop], dnsThen[prop]);
			}
		});
	},
	'should not alter methods not on the whitelist': function () {
		Object.keys(dns).forEach(function (prop) {
			if (!onWhiteList(prop)) {
				assert.same(dns[prop], dnsThen[prop]);
			}
		});
	}
});
