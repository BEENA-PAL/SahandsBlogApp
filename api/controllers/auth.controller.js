import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    // return res.status(400).json({ message: "All fields are required" });
    next(errorHandler(400, "all fields required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fileds are required"));
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(400, "user not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(400, "invalid password"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRETE);

    const { password: pass, ...rest } = validUser._doc;
    console.log(rest);
    res
      .status(201)
      .cookie("accesss_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETE);

      const { password, ...rest } = user._doc;

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.ransom().toString(36).slice(-8) +
        Math.ransom().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatedpassword);

      const newUser = new User({
        username:
          name.toLowerCase().split(" ").json("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRETE);

      const { password, ...rest } = newUser._doc;

      res
        .status(200)
        .cookies("access-token", token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
