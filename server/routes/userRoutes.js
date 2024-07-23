const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateToken = require("../middleware/authenticateToken");
const authorizeRoles = require("../middleware/authorizeRoles");

// Rotte pubbliche
router.post("/login", userController.loginUser);

// Rotte private per Admin
router.use(authenticateToken); // Autenticazione necessaria
router.use(authorizeRoles("admin")); // Solo gli Admin possono accedere

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createNewUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
