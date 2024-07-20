const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

router
  .route("/")
  .get(menuController.getAllMenus)
  .post(menuController.createNewMenu)
  .patch(menuController.updateMenu)
  .delete(menuController.deleteMenu);
router.route("/by-date").get(menuController.getMenuByDate);
router.route("/today").get(menuController.getMenuOfTheDay);
router.route("/delete-old").delete(menuController.deleteOldMenus);

module.exports = router;
