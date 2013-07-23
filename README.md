dns Then
=======

[![Build Status](https://travis-ci.org/node-then/dns-then.png)](https://travis-ci.org/node-then/dns-then)

Thin wrapper arround Node's dns module that makes the async functions promise
aware. The wrapped methods return a promise the represents the value of the
async operation. Traditional callbacks still work, allowing for a transparent
drop-in for dns. Sync methods, classes and other helpers are not modified.


Example
-------

Traditional Async

```javascript
var dns = require('dns-then');
dns.lookup('cujojs.com', function (err, address) {
   ...
});
```

With Promises

```javascript
var dns = require('dns-then');
dns.lookup('cujojs.com').then(...);
```


Wrapped methods
---------------

- lookup
- resolve
- resolve4
- resolve6
- resolveMx
- resolveTxt
- resolveSrv
- resolveNs
- resolveCname
- reverse
