const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authenticateToken = require("../middleware/authenticateToken");
const authorizeRoles = require("../middleware/authorizeRoles");

router
  .route("/")
  .get(
    authenticateToken,
    authorizeRoles("admin", "chef"),
    orderController.getAllOrders,
  )
  .post(orderController.createNewOrder) // Non protetto
  .patch(
    authenticateToken,
    authorizeRoles("admin"),
    orderController.updateOrder,
  )
  .delete(
    authenticateToken,
    authorizeRoles("admin"),
    orderController.deleteOrder,
  );

router.get("/last", orderController.getLastOrder); // Non protetto
router.delete(
  "/reset",
  authenticateToken,
  authorizeRoles("admin"),
  orderController.resetOrdersAndTickets,
);

module.exports = router;
