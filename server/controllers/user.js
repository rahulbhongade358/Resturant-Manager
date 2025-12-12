import User from "../models/User.js";

const postSignUp = async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  if (!name || !email || !phone || !password || !role) {
    return res.json({
      success: false,
      message: "All fields are required",
    });
  }
  const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameValidationRegex = /^[a-zA-Z ]+$/;
  const passwordValidationRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (nameValidationRegex.test(name) === false) {
    return res.json({
      success: false,
      message: "Name Should Only Contain Alphabets",
    });
  }
  if (emailValidationRegex.test(email) === false) {
    return res.json({
      success: false,
      message: "Invalid Email Format",
    });
  }
  if (passwordValidationRegex.test(password) === false) {
    return res.json({
      success: false,
      message:
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    });
  }

  const CheckExistingUser = await User.findOne({ phone });
  if (CheckExistingUser) {
    return res.json({
      success: false,
      message: `User  ${phone} has already registered`,
    });
  }

  const NewUser = new User({ name, email, phone, password, role });

  const SaveNewUser = await NewUser.save();
  res.json({
    success: true,
    user: SaveNewUser,
    message: "User Registered Successfully",
  });
};

const postLogin = async (req, res) => {
  const { phone, password } = req.body;

  // 1. Validate
  if (!phone || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // 2. Find only ONE user
  const existingUser = await User.findOne({ phone, password }).select(
    "_id name email role"
  );
  console.log(existingUser);
  // 3. If no user → invalid login
  if (!existingUser) {
    return res.status(401).json({
      success: false,
      message: "your phone or password is incorrect",
      unauthorized: true,
    });
  }

  // 4. Only these roles can login
  const allowedRoles = ["Admin", "Chef", "Waiter"];

  if (!allowedRoles.includes(existingUser.role)) {
    return res.status(403).json({
      unauthorized: true,
      message: "You are not authorized!",
    });
  }

  // 5. If everything is correct → login success
  res.json({
    success: true,
    user: existingUser,
    message: "Login Successfully",
  });
};

export { postLogin, postSignUp };
