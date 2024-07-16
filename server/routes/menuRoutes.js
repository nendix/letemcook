const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

router
  .route("/")
  .get(menuController.getAllMenus)
  .post(menuController.createNewMenu)
  .patch(menuController.updateMenu)
  .delete(menuController.deleteMenu);

module.exports = router;
