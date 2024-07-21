const Menu = require("../models/Menu");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// @desc Get menu of the day
// @route POST /menus/today
// @access Public
const getMenuOfTheDay = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setDate(today.getDate());
  const menu = await Menu.findOne({ date: today.toISOString().split("T")[0] });

  if (!menu) {
    return res.status(404).json({ message: "Menu of the day not found" });
  }

  res.json(menu);
});

// @desc Get menu by date
// @route POST /menus/by-date
// @access Public
const getMenuByDate = asyncHandler(async (req, res) => {
  const { date } = req.body;

  // Validate input
  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  // Find menu by date
  const menu = await Menu.findOne({ date }).lean();

  // If no menu found
  if (!menu) {
    return res
      .status(404)
      .json({ message: "Menu not found for the specified date" });
  }

  res.json(menu);
});

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
  const { date, first, second, side } = req.body;

  // Confirm data
  if (
    !date ||
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
  const duplicate = await Menu.findOne({ date: date }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate menu" });
  }

  const menuObject = { date: date, first, second, side };

  // Create and store new menu
  const menu = await Menu.create(menuObject);

  if (menu) {
    //created
    res.status(201).json({ message: `New menu for date ${date} created` });
  } else {
    res.status(400).json({ message: "Invalid menu data received" });
  }
});

// @desc Update a menu
// @route PATCH /menus
// @access Private
const updateMenu = asyncHandler(async (req, res) => {
  const { id, date, first, second, side } = req.body;

  // Confirm data
  if (
    !id ||
    !date ||
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
  const duplicate = await Menu.findOne({ date: date }).lean().exec();

  // Allow updates to the original menu
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate menu of the date" });
  }

  menu.date = date;
  menu.first = first;
  menu.second = second;
  menu.side = side;

  const updatedMenu = await menu.save();

  res.json({ message: `Menu of the date ${updatedMenu.date} updated` });
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

  const reply = `Menu of the date ${result.date} with ID ${result._id} deleted`;

  res.json(reply);
});

// Funzione per eliminare i menu più vecchi di due settimane
const deleteOldMenus = asyncHandler(async (req, res) => {
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  try {
    await Menu.deleteMany({
      date: { $lt: twoWeeksAgo.toISOString().split("T")[0] },
    });
    res.status(200).send({ message: "Two-week-old menus eliminated." });
  } catch (error) {
    res.status(500).send({ message: "Error deleting menus:", error });
  }
});
module.exports = {
  getMenuOfTheDay,
  getMenuByDate,
  getAllMenus,
  createNewMenu,
  updateMenu,
  deleteMenu,
  deleteOldMenus,
};
