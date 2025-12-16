import Table from "../models/Table.js";
const getAllTables = async (req, res) => {
  const tables = await Table.find().sort({ tableNumber: 1 });

  res.json({
    success: true,
    data: tables,
  });
};
const toggleTableStatus = async (req, res) => {
  const { tableId } = req.params;

  const table = await Table.findById(tableId);
  if (!table) {
    return res.status(404).json({ message: "Table not found" });
  }

  table.isActive = !table.isActive;
  await table.save();

  res.json({
    success: true,
    message: `Table ${table.tableNumber} ${
      table.isActive ? "Activated" : "Deactivated"
    }`,
    table,
  });
};
const addTable = async (req, res) => {
  const { tableNumber } = req.body;
  if (!tableNumber) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "❌ Table number is required",
    });
  }
  try {
    const table = new Table({
      tableNumber,
    });
    await table.save();
    res.json({
      success: true,
      data: table,
      message: "Table added successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: null,
      message: "❌ Failed to add table",
    });
  }
};
export { getAllTables, toggleTableStatus, addTable };
