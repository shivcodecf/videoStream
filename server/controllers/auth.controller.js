import jwt from "jsonwebtoken";
import { User } from "../models/auth.schema.js";
import bcrypt from "bcrypt";
import { setCookies } from "../utils/setCookies.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user is not found",
      });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return res.staus(400).json({
        success: false,
        message: "invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    setCookies(token, res);

    return res.status(200).json({
      success: true,
      message: "User login Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "email or password are required",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "user already exists , please login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email: email,
      password: hashedPassword,
    });

    return res.status(201).json({
      user: newUser,
      success: true,
      message: "User Created Successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/", // ✅ THIS WAS MISSING
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const me = (req, res) => {
  try {
    const authUser = req.user?.id;

    return res.status(200).json({
      authUser:authUser?authUser:"",
    });
  } catch (error) {
    console.log(error);
  }
};
