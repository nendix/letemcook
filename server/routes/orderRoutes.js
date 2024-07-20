const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router
  .route("/")
  .get(orderController.getAllOrders)
  .post(orderController.createNewOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);
router.route("/delete-old").delete(orderController.deleteOldOrders);

module.exports = router;
