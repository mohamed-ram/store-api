const notFound = (req, res, next) => {
  res
    .status(404)
    .json({ success: false, data: "404!, Resource is not exist!" });

  // next();
};

module.exports = notFound;
