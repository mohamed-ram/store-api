const clearQuery = (queryObject, fields) => {
  Object.keys(queryObject).map((q) => {
    if (!fields.includes(q)) {
      delete queryObject[q];
    }
  });
};

module.exports = clearQuery;
