const Product = require("../productModels/productModel");
const ErrorHandler = require("../utils/errorHander");

const catchAsyncError = require("../middleware/catchAsyncError")

//create product -admin can access

exports.createProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  })

// get all product
exports.getAllProduct = catchAsyncError(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({ success: true, products });
})

//get single product

exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
})

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
})

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
})





