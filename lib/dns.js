/*
 * Copyright 2013 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

var dns, nodeThen, whitelist;

dns = require('dns');
nodeThen = require('node-then');
whitelist = require('./method-whitelist.json');

module.exports = nodeThen.wrapObject(dns, function eligible(name, obj) {
	return typeof obj === 'function' && whitelist.indexOf(name) >= 0;
});
