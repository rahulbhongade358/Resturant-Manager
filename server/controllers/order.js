import Order from "../models/Order.js";
const postOrder = async (req, res) => {
  const {
    customerName,
    customerContact,
    tableNumber,
    orderItems,
    totalAmount,
  } = req.body;
  if (
    !customerName ||
    !customerContact ||
    !tableNumber ||
    !orderItems ||
    !totalAmount
  ) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "❌ All fields are required",
    });
  }
  try {
    const order = new Order({
      customerName,
      customerContact,
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
  const getallOrdes = await Order.find();

  res.json({
    status: true,
    data: getallOrdes,
    message: `list of ${getallOrdes.length} Order `,
  });
};

export { postOrder, getOrder };
