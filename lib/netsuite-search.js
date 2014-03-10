var _ = require('underscore');
var async = require('async');
var rest = require('restler');

module.exports = function(settings) {
  if (typeof settings === 'undefined' || !settings.netsuite) {
    throw("You must provide settings containing netsuite credentials");
  }

  var netsuite = settings.netsuite;

  function run(type, filters, columns, callback) {
    type = type || "null";

    var restOptions = {
      headers: {
        Authorization: 'NLAuth nlauth_account='+netsuite.account+',nlauth_email='+netsuite.email+',nlauth_signature='+netsuite.password+',nlauth_role='+netsuite.role,
        'Content-Type': 'application/json'
      }
    };

    function onError(error) {
      callback(error);
    }

    filtersQuery = filters ? "&filters="+encodeURIComponent(JSON.stringify(filters)) : ''
    columnsQuery = columns ? "&columns="+encodeURIComponent(JSON.stringify(columns)) : ''

    var queryString = "&type="+type+filtersQuery+columnsQuery;

    rest.get(netsuite.restlet + queryString, restOptions).on('success', function (result) {
      callback(null, result);
    }).on('error', onError).on('fail', function (err) { onError(err.error); });
  }

  return {
    run: run
  };
};
