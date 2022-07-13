const asyncHandler = require("../middlewares/asyncHandler");
const Product = require("../models/product");
const clearQuery = require("../utils/clearQuery");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Get all products
// @route     GET api/v1/products
exports.getAllProducts = asyncHandler(async (req, res) => {
  const queryObject = { ...req.query };

  // remove not exist query.
  const fields = Object.keys(Product.schema.tree);
  clearQuery(queryObject, fields);

  // handle product title with regex
  if (queryObject.title) {
    queryObject.title = { $regex: queryObject["title"], $options: "i" };
  }

  // numeric filter
  const numericFilter = req.query.numericFilter;
  if (numericFilter) {
    const operators = {
      ">": "$gt",
      "<": "$lt",
      "=": "$eq",
      ">=": "$gte",
      "<=": "$lte",
    };
    // allowed fileds to filter by numeric operations.
    const options = ["price", "rating"];

    const regEx = /\b(<|>|=|<=|>=)\b/g;
    let filters = numericFilter.replace(
      regEx,
      (match) => `-${operators[match]}-`
    );
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: parseInt(value) };
      }
    });

    console.log(queryObject);
  }

  let results = Product.find(queryObject);

  // sort results
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    results = results.sort(sortBy);
  }

  // select fields.
  if (req.query.select) {
    const selectFields = req.query.select.split(",").join(" ");
    results = results.select(selectFields);
  }

  // pagination
  const limit = parseInt(req.query.limit, 10) || 4;
  const page = parseInt(req.query.page, 10) || 1;
  const skip = (page - 1) * limit;
  results = results.limit(limit).skip(skip);

  const products = await results;

  res.status(200).json({
    success: true,
    length: products.length,
    data: products,
  });
});

// @desc      Get single product
// @route     GET api/v1/product/:id
exports.getSingleProduct = asyncHandler(async (req, res, next) => {
  const _id = req.params.id;
  const product = await Product.findById(_id);
  if (!product) {
    return next(new ErrorResponse(`No product exists with id = ${_id}`, 404));
  }
  res.status(200).json({
    success: true,
    data: product,
  });
});
