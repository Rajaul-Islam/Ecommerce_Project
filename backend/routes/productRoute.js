const express = require("express");
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
} = require("../controllers/productController");
const { isAuthentiicatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProduct);
router
  .route("/admin/product/new")
  .post(isAuthentiicatedUser, authorizeRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthentiicatedUser, authorizeRoles("admin"), updateProduct);
router
  .route("/admin/product/:id")
  .delete(isAuthentiicatedUser, authorizeRoles("admin"), deleteProduct);
router.route("/product/:id").get(getSingleProduct);



router.route("/review").put(isAuthentiicatedUser,createProductReview)

module.exports = router;
