const express = require("express");
const {
  newOrder,
  myOrders,
  getSingleOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { isAuthentiicatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/order/new").post(isAuthentiicatedUser, newOrder);
router
  .route("/order/:id").get(isAuthentiicatedUser, authorizeRoles("admin"), getSingleOrder);
router.route("/orders/me").get(isAuthentiicatedUser, myOrders);

router.route("/admin/orders").get(isAuthentiicatedUser,authorizeRoles("admin"),getAllOrders)

router.route("/admin/order/:id").put(isAuthentiicatedUser, authorizeRoles("admin"), updateOrder).delete(isAuthentiicatedUser,authorizeRoles("admin"),deleteOrder)

module.exports = router;
