const Order = require("../models/Order");
const asyncHandler = require("express-async-handler");

// @desc Get last order ticket
// @route GET /orders/ticket
// @access public
const getLastOrder = asyncHandler(async (req, res) => {
  try {
    // Trova l'ultimo ordine creato ordinando per il campo createdAt in ordine decrescente
    const lastOrder = await Order.findOne().sort({ createdAt: -1 }).lean();

    if (!lastOrder) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.json(lastOrder);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
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
// @access public
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

  const remainingOrders = await Order.countDocuments().exec();
  if (remainingOrders === 0) {
    Order.counterReset("ticket_id", function () {});
  }
  res.json(reply);
});

const resetOrdersAndTickets = asyncHandler(async (req, res) => {
  try {
    // Elimina tutti gli ordini
    await Order.deleteMany({});

    Order.counterReset("ticket_id", function () {});

    res.status(200).send({ message: "Orders deleted and ticket reset" });
  } catch (error) {
    res.status(500).send({
      message: "Error deleting orders or resetting ticket",
      error: error.message,
    });
  }
});

module.exports = resetOrdersAndTickets;
module.exports = {
  getLastOrder,
  getAllOrders,
  createNewOrder,
  updateOrder,
  deleteOrder,
  resetOrdersAndTickets,
};
