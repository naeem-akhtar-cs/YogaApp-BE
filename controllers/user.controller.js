import mongoose from "mongoose";

import user from "../models/user.js";
import userProtocol from "../models/userProtocol.js";

const addNewUser = async (userDetails) => {
  try {
    const existingUser = await user.findOne({ cognitoUserId: userDetails.userId });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const currentDate = new Date();
    await user.create({
      _id: new mongoose.Types.ObjectId(),
      cognitoUserId: userDetails.userId,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      isConfirmed: userDetails.userConfirmed,
      isDeleted: false,
      email: userDetails.email,
      createdAt: currentDate,
      updatedAt: null,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const addNewProtocol = async (req, res) => {
  try {
    const data = req.body;
    const currentDate = new Date();
    const userProtocolData = await userProtocol.create({
      _id: new mongoose.Types.ObjectId(),
      protocol: data.protocolId,
      user: data.userId,
      isActive: true,
      createdAt: currentDate,
      updatedAt: null,
    });
    res.status(200).send({ userProtocolId: userProtocolData._id });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Could not add new protocol" });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      throw new Error("Cognito user id is required");
    }
    const userData = await user.findOne({_id: userId, isDeleted: false, isConfirmed: true}).select("_id firstName lastName email");
    res.status(200).send(userData);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Invalid input" });
  }
};


const updateProfile = async (req, res) => {
  try {
    const userData = req.body;
    const userId = req.query.userId;
    if (!userData) {
      throw new Error("No data found");
    }
    const userDetails = await user.findOneAndUpdate({_id: userId, isDeleted: false, isConfirmed: true}, {firstName: userData.firstName, lastName: userData.lastName}).select("_id firstName lastName email")
    res.status(200).send(userDetails);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Invalid input" });
  }
};

export default { addNewUser, addNewProtocol, getUserDetails, updateProfile };
