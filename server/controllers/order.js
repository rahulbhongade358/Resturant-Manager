import Order from "../models/Order.js";
import Table from "../models/Table.js";
const postOrder = async (req, res) => {
  const { customerName, CustomerUID, tableNumber, orderItems, totalAmount } =
    req.body;
  if (!customerName || !tableNumber || !orderItems || !totalAmount) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "❌ All fields are required",
    });
  }
  const table = await Table.findOne({ tableNumber });

  if (!table || !table.isActive) {
    return res.status(403).json({
      message: "This table is currently inactive",
    });
  }

  try {
    const order = new Order({
      customerName,
      CustomerUID,
      tableNumber,
      orderItems,
      totalAmount,
    });

    const saveOrder = await order.save();
    res.status(201).json({
      success: true,
      data: saveOrder,
      message: "✅ Order Placed Succefull",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "❌ Server Error",
      error: error.message,
    });
  }
};
const getOrder = async (req, res) => {
  const getallOrdes = await Order.find().sort({ createdAt: -1 });

  res.json({
    status: true,
    data: getallOrdes,
    message: `list of ${getallOrdes.length} Order `,
  });
};

const getCustomerOrder = async (req, res) => {
  const { orderId } = req.query;
  try {
    const getOrder = await Order.find({ CustomerUID: orderId }).sort({
      createdAt: -1,
    });
    console.log(getOrder);
    res.json({
      status: true,
      data: getOrder,
      message: "Customer Order fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message:
        "No order found. Please place an order first or add your contact number to fetch the order.",
      error: error.message,
    });
  }
};
const dashboardSummary = async (req, res) => {
  const totalOrders = await Order.countDocuments();
  const pendingOrders = await Order.countDocuments({ status: "Pending" });
  const preparingOrders = await Order.countDocuments({ status: "Preparing" });
  const deliveredOrders = await Order.countDocuments({ status: "Delivered" });

  const customers = await Order.distinct("CustomerUID");

  const profit = await Order.aggregate([
    { $group: { _id: null, total: { $sum: "$totalAmount" } } },
  ]);

  res.json({
    totalOrders,
    pendingOrders,
    preparingOrders,
    deliveredOrders,
    totalCustomers: customers.length,
    totalProfit: profit[0]?.total || 0,
  });
};
const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const { orderId } = req.params;

  const allowedStatus = ["Pending", "Approved", "Preparing", "Delivered"];

  if (!allowedStatus.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const order = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json({
    success: true,
    order,
    message: "Order status updated",
  });
};

export {
  postOrder,
  getOrder,
  getCustomerOrder,
  dashboardSummary,
  updateOrderStatus,
};
