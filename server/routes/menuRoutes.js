const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const authenticateToken = require("../middleware/authenticateToken");
const authorizeRoles = require("../middleware/authorizeRoles");

router.get("/today", menuController.getMenuOfTheDay); // Accesso pubblico
router.post("/by-date", menuController.getMenuByDate); // Accesso pubblico

// Rotte private per Admin e Chef
router.use(authenticateToken); // Autenticazione necessaria

router
  .route("/")
  .get(authorizeRoles("admin", "chef"), menuController.getAllMenus)
  .post(authorizeRoles("admin", "chef"), menuController.createNewMenu)
  .patch(authorizeRoles("admin", "chef"), menuController.updateMenu)
  .delete(authorizeRoles("admin", "chef"), menuController.deleteMenu);

router.delete(
  "/delete-old",
  authorizeRoles("admin", "chef"),
  menuController.deleteOldMenus,
);

module.exports = router;
