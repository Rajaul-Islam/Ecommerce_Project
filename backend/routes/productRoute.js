const express = require("express");
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controllers/productController");
const { isAuthentiicatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProduct);
router
  .route("/product/new")
  .post(isAuthentiicatedUser, authorizeRoles("admin"), createProduct);
router
  .route("/product/:id")
  .put(isAuthentiicatedUser, authorizeRoles("admin"), updateProduct);
router
  .route("/product/:id")
  .delete(isAuthentiicatedUser, authorizeRoles("admin"), deleteProduct);
router.route("/product/:id").get(getSingleProduct);

module.exports = router;
