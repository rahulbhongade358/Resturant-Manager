import Menu from "../models/Menu.js";

const postMenu = async (req, res) => {
  const { Dishname, Dishtype, decription, price, imageURL } = req.body;

  if (!Dishname || !Dishtype || !decription || !price || !imageURL) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "❌ All fields are required",
    });
  }
  try {
    const menu = new Menu({
      Dishname,
      Dishtype,
      decription,
      price,
      imageURL,
    });
    const saveMenu = await menu.save();
    res.status(201).json({
      success: true,
      data: saveMenu,
      message: "🍜 Menu Added Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: `❌ Internal Server Error : ${error.message}`,
    });
  }
};

const getMenu = async (req, res) => {
  const allmenu = await Menu.find();

  res.json({
    success: true,
    data: allmenu,
    message: `list of ${allmenu.length} Menu,🍜 menu fetched successfully `,
  });
};
export { postMenu, getMenu };
