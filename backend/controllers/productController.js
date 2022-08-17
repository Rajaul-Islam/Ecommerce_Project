const Product = require("../productModels/productModel");
const ErrorHandler = require("../utils/errorHander");

const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeature");

//create product -admin can access

exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.productCreator = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// get all product
exports.getAllProduct = catchAsyncError(async (req, res) => {
  const resultPerPage = 10;

  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  // const products = await Product.find();

  const products = await apiFeature.query;

  res.status(200).json({ success: true, products, productCount });
});

//get single product

exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
    productCount,
  });
});

//update product -admin

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

//delete product

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "deleted successfully",
  });
});

// create new review or update the review

exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.productCreator.toString() === req.user._id.toString()
  );
  if (isReviewed)
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.productCreator.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews=product.reviews.length;

    }
    let avg=0;

    product.ratings = product.reviews.forEach(rev=>{
      avg=avg+rev.rating
    })/product.reviews.length

    await product.save({validateBeforeSave: false});
    res.status(200).json({
      success: true,
    })
});
