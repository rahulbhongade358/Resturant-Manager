import fs from "fs";
import path from "path";

const menuPath = path.join(process.cwd(), "menu", "menu.json");

// Helper function → Read JSON
const readMenu = () => {
  const data = fs.readFileSync(menuPath, "utf-8");
  return JSON.parse(data);
};

// Helper function → Write JSON
const writeMenu = (data) => {
  fs.writeFileSync(menuPath, JSON.stringify(data, null, 2));
};

// =============================
// GET MENU
// =============================
export const getMenu = (req, res) => {
  const menu = readMenu();
  res.json({
    success: true,
    data: menu,
  });
};

// =============================
// ADD DISH
// =============================
export const addDish = (req, res) => {
  const { Dishname, Dishtype, decription, price, imageURL } = req.body;

  if (!Dishname || !price || !Dishtype || !decription || !imageURL) {
    return res.status(400).json({ message: "All fields required" });
  }

  const menu = readMenu();

  const newDish = {
    _id: Date.now().toString(),
    Dishname,
    Dishtype,
    decription,
    price,
    imageURL,
    available: true,
  };

  menu.push(newDish);
  writeMenu(menu);

  res.json({
    success: true,
    message: "Dish added successfully",
    data: newDish,
  });
};

// =============================
// UPDATE DISH
// =============================
export const updateDish = (req, res) => {
  const { _id } = req.params;
  const { Dishname, Dishtype, decription, price, imageURL, available } =
    req.body;

  let menu = readMenu();
  const index = menu.findIndex((d) => d._id === _id);
  if (index === -1) {
    return res.status(404).json({ message: "Dish not found" });
  }

  menu[index] = {
    ...menu[index],
    Dishname: Dishname ?? menu[index].Dishname,
    Dishtype: Dishtype ?? menu[index].Dishtype,
    decription: decription ?? menu[index].decription,
    price: price ?? menu[index].price,
    imageURL: imageURL ?? menu[index].imageURL,
    available: available === undefined ? menu[index].available : available,
  };

  writeMenu(menu);

  res.json({
    success: true,
    message: "Dish updated successfully",
    data: menu[index],
  });
};

// =============================
// DELETE DISH
// =============================
export const deleteDish = (req, res) => {
  const { _id } = req.params;

  let menu = readMenu();
  const filtered = menu.filter((d) => d._id !== _id);

  if (filtered.length === menu.length) {
    return res.status(404).json({ message: "Dish not found" });
  }

  writeMenu(filtered);

  res.json({
    success: true,
    message: "Dish deleted successfully",
  });
};
