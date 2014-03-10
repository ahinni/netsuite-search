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
