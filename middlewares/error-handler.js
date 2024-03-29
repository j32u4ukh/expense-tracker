module.exports = (error, req, res, next) => {
  console.error(`Error: ${JSON.stringify(error)}`);
  req.flash("error", error.errorMessage || "處理失敗:(");
  if (error.redirect) {
    res.redirect(error.redirect);
  } else {
    res.redirect("back");
  }
  next(error);
};
