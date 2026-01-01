import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";


export const registerController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;

    
    if (!name || !email || !password || !address || !phone) {
      return res.status(400).json({ success:false, message: "Please fill all the fields" });
    }
    
    
    if (password.length < 6) {
      return res.status(200).json({ 
        success: false,
        message: "Password must be at least 6 characters long" 
      });
    }
    
    
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        message: "User already exists please login",
        success: true,
      });
    }
    
    const hashedPassword = await hashPassword(password);
    
    const user = await new userModel({
      name,
      email,
      address,
      phone,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" }).send({
      success: false,
      message: "Error in Register User",
      error: error.message,
    });
  }
};


export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "incorrect email or password",
      });
    }
    const user = await userModel.findOne({ email });
     
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not registered",
      });
    }
    if ( !user.password) { 
      return res.status(400).send({
        success: false,
        message: "User object is missing password property",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Incorrect Password",
      });
    }
    
    const token =  JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
    });
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 
    });
    res.status(200).send({
      success: true,
      message: "user login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login user",
      error,
    });
  }
};

export const logoutController = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).send({ success: true, message: 'Logout Successfully' });
};


export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);

    
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Update Profile",
      error,
    });
  }
};
