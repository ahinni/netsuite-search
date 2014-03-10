function construct(constructor, argArray) {
  var args = [null].concat(argArray);
  var F = constructor.bind.apply(constructor, args);
  return new F();
}

function createFilters(options) {
  var filters = options.filters ? JSON.parse(options.filters) : [];
  var out = [];
  filters.forEach( function(filterData) {
    out.push( construct(nlobjSearchFilter, filterData) );
  });

  return out;
}

function createColumns(options) {
  var columns = options.columns ? JSON.parse(options.columns) : [];
  var out = [];
  columns.forEach( function(columnName) {
    out.push( construct(nlobjSearchColumn, [columnName]) );
  });

  return out;
}

function executeSearch(options) {
  if ( !options.filters ) {
    return { error: 'Must provide the filters for the search', options: options };
  }

  var type = options.type || null;
  var filters = createFilters(options);
  var columns = createColumns(options);

  var SLICE_LIMIT = 1000;
  var search = nlapiCreateSearch(type, filters, columns);

  var resultset = search.runSearch();

  var results = [];
  var index = 0;
  do {
    var subset = resultset.getResults(index, index+1000);
    if ( !subset ) break;
    subset.forEach( function (row) {
      results.push(row);
      index++;
    });
  } while (subset.length === SLICE_LIMIT);

  return results;
}
