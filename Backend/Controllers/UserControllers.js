// Packages
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
// Models
import User from "../Models/UserModel.js";
// Services
import generateToken from "../Services/GenerateToken.js";

// Method   POST
// Route    /api/users/signup
const signup = asyncHandler(async (req, res) => {
  const { userName, email, password, confirmPassword } = req.body;

  //   Email validation
  const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validEmail = emailFormat.test(email);

  if (!validEmail) {
    return res.status(400).json({ err: "Please enter a valid email" });
  }

  const emailExists = await User.findOne({ email });

  if (!emailExists) {
    // Encrypt the users password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      id: user._id,
      userName: user.userName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    return res.status(400).json({ err: "Email not already exists" });
  }
});

// Method   POST
// Route    /api/users/signin
const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //   Email validation
  const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validEmail = emailFormat.test(email);

  if (!validEmail) {
    return res.status(400).json({ err: "Please enter a valid email" });
  }

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    const validPassword = await bcrypt.compare(password, emailExists.password);

    if (validPassword) {
      return res.status(200).json({
        id: emailExists._id,
        userName: emailExists.userName,
        email: emailExists.email,
        token: generateToken(emailExists._id),
      });
    } else {
      return res.status(400).json({ err: "Invalid password" });
    }
  } else {
    return res.status(400).json({ err: "Email does not exists" });
  }
});

export { signup, signin };
