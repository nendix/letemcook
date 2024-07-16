const Order = require("../models/Order");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @desc Get all orders
// @route GET /orders
// @access Private
const getAllOrders = asyncHandler(async (req, res) => {
  // Get all orders from MongoDB
  const orders = await Order.find().lean();

  // If no orders
  if (!orders?.length) {
    return res.status(400).json({ message: "No orders found" });
  }
  res.json(orders);
});

// @desc Create new order
// @route POST /orders
// @access Private
const createNewOrder = asyncHandler(async (req, res) => {
  const { taxCode, first, second, side } = req.body;

  // Confirm data
  if (!taxCode || !first || !second || !side) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate order
  const duplicate = await Order.findOne({ taxCode }).lean().exec();

  if (duplicate) {
    return res
      .status(409)
      .json({ message: "Order already did for ${taxCode}" });
  }

  const orderObject = { taxCode, first, second, side };

  // Create and store new order
  const order = await Order.create(orderObject);

  if (order) {
    //created
    res.status(201).json({ message: `New order for ${taxCode} created` });
  } else {
    res.status(400).json({ message: "Invalid order data received" });
  }
});

// @desc Update an order
// @route PATCH /orders
// @access Private
const updateOrder = asyncHandler(async (req, res) => {
  const { id, taxCode, first, second, side } = req.body;

  // confirm data
  if (!id || !taxCode || !first || !second || !side) {
    return res.status(400).json("All fields are requires");
  }

  // Does the order exist to update?
  const order = await Order.findById(id).exec();

  if (!order) {
    return res.status(400).json({ message: "Order not found" });
  }

  // Check for duplicate
  const duplicate = await Order.findOne({ id }).lean().exec();

  // Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate tax code" });
  }

  order.taxCode = taxCode;
  order.first = first;
  order.second = second;
  order.side = side;

  const updatedOrder = await order.save();

  res.json({ message: `Order of ${updatedOrder.taxCode} updated` });
});

// @desc Delete an order
// @route DELETE /orders
// @access Private
const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Order ID Required" });
  }

  // Does the order exist to delete?
  const order = await Order.findById(id).exec();

  if (!order) {
    return res.status(400).json({ message: "Order not found" });
  }

  const result = await order.deleteOne();

  const reply = `Order of  ${result.taxCode} with ID ${result._id} deleted`;

  res.json(reply);
});
module.exports = {
  getAllOrders,
  createNewOrder,
  updateOrder,
  deleteOrder,
};
