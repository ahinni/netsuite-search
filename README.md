netsuite-saved-search
=====================

Node module wrapping making restlet call to execute a saved search in netsuite.

## Installation
    npm install netsuite-search
    
## Configuration
Set up a restlet in netsuite that can generically invoke a search.

    see examples/generic_search_restlet.js

Once this restlet is deployed, make a note of the ```External URL``` in the deployment. Example:

    https://rest.netsuite.com/app/site/hosting/restlet.nl?script=90210&deploy=1
    
## Settings

Create a ```settings.js``` somewhere with your netsuite credentials and restlet url

### Required netsuite settings

```javascript
module.exports = {
  netsuite: {
    account: "1234567",
    email: "mynetsuiteaccount@here.tld",
    password: "p4ssw0rd",
    role: "3",
    restlet: "https://rest.netsuite.com/app/site/hosting/restlet.nl?script=90210&deploy=1"
  }
};
```

## Usage
Check out some of the examples in the examples directory.

```javascript
var settings = require('./settings');
var search = require('../lib/netsuite-search')(settings);

function onFailure(err) {
  process.stderr.write("Fail boat: " + err.message + "\n");
  process.exit(1);
}

var filters = [
  ['itemid', null, 'haskeywords', 'CP7942']
];

var columns = ['itemid', 'custitem_onlinesku', 'custitem_productdesc'];

// This will try the cached version first, if not there will run and then cache
search.run('item', filters, columns, function (err, results) {
  if (err) onFailure(err);
  console.log(JSON.stringify(results));
});
```
