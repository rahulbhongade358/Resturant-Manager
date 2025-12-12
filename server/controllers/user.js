import User from "../models/User.js";

const postSignUp = async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  if  ((!name || !email || !phone || !password || !role)) {

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
  if ((!phone || !password)) {
    res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  const ExistingUser = await User.findOne({ phone, password }).select(
    " _id name email role"
  );
  if (!ExistingUser) {
    return res.json({
      success: false,
      message: "Invalid phone or password",
      user: null,
    });
  }
  res.json({
    success: true,
    user: ExistingUser,
    message: "Login Successfully",
  });
};

export { postLogin, postSignUp };
