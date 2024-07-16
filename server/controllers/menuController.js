const Menu = require("../models/Menu");
const asyncHandler = require("express-async-handler");

// @desc Get all menus
// @route GET /menus
// @access Private
const getAllMenus = asyncHandler(async (req, res) => {
  // Get all menus from MongoDB
  const menus = await Menu.find().lean();

  // If no menus
  if (!menus?.length) {
    return res.status(400).json({ message: "No menus found" });
  }

  res.json(menus);
});

// @desc Create new menu
// @route POST /menus
// @access Private
const createNewMenu = asyncHandler(async (req, res) => {
  const { day, first, second, side } = req.body;

  // Confirm data
  if (
    !day ||
    !Array.isArray(first) ||
    !first.length ||
    !Array.isArray(second) ||
    !second.length ||
    !Array.isArray(side) ||
    !side.length
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (first.length > 2 || second.length > 2 || side.length > 2) {
    return res.status(400).json({ message: "Max 2 dishes per course" });
  }

  // Check for duplicate menus
  const duplicate = await Menu.findOne({ day }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate menu" });
  }

  const menuObject = { day, first, second, side };

  // Create and store new menu
  const menu = await Menu.create(menuObject);

  if (menu) {
    //created
    res.status(201).json({ message: `New menu for day ${day} created` });
  } else {
    res.status(400).json({ message: "Invalid menu data received" });
  }
});

// @desc Update a menu
// @route PATCH /menus
// @access Private
const updateMenu = asyncHandler(async (req, res) => {
  const { id, day, first, second, side } = req.body;

  // Confirm data
  if (
    !id ||
    !day ||
    !Array.isArray(first) ||
    !first.length ||
    !Array.isArray(second) ||
    !second.length ||
    !Array.isArray(side) ||
    !side.length
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Does the menu exist to update?
  const menu = await Menu.findById(id).exec();

  if (!menu) {
    return res.status(400).json({ message: "Menu not found" });
  }

  // Check for duplicate
  const duplicate = await Menu.findOne({ day }).lean().exec();

  // Allow updates to the original menu
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate menu of the day" });
  }

  menu.day = day;
  menu.first = first;
  menu.second = second;
  menu.side = side;

  const updatedMenu = await menu.save();

  res.json({ message: `Menu of the day ${updatedMenu.day} updated` });
});

// @desc Delete a menu
// @route DELETE /menus
// @access Private
const deleteMenu = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Menu ID Required" });
  }

  // Does the menu exist to delete?
  const menu = await Menu.findById(id).exec();

  if (!menu) {
    return res.status(400).json({ message: "Menu not found" });
  }

  const result = await menu.deleteOne();

  const reply = `Menu of the day ${result.day} with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllMenus,
  createNewMenu,
  updateMenu,
  deleteMenu,
};
