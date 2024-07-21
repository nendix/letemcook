const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authenticateToken = require("../middleware/authenticateToken");
const authorizeRoles = require("../middleware/authorizeRoles");

router.use(authenticateToken); // Autenticazione necessaria

router
  .route("/")
  .get(authorizeRoles("admin", "chef"), orderController.getAllOrders)
  .post(authorizeRoles("admin"), orderController.createNewOrder)
  .patch(authorizeRoles("admin"), orderController.updateOrder)
  .delete(authorizeRoles("admin"), orderController.deleteOrder);

router.delete(
  "/reset",
  authorizeRoles("admin"),
  orderController.resetOrdersAndTickets,
);

module.exports = router;
