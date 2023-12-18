import { ObjectId } from "mongodb";
import newUserService from "../service/user.service.js";
import databaseService from "../service/database.service.js";

export const registerController = async (req, res, next) => {
  const access_token = await newUserService.register(req.body);
  return res.json({
    message: "Registration successfully registered",
    result: access_token,
  });
};

export const loginController = async (req, res, next) => {
  const user_id = req.new_database._id;
  console.log(user_id);
  const access_token = await newUserService.login(user_id);
  return res.json({
    message: "Login successfully",
    result: access_token,
  });
};

export const getMeControler = async (req, res, next) => {
  const { user_id } = req.decode_authorization;
  console.log(user_id);
  if (user_id) {
    const user = await databaseService.new_database.findOne(
      {
        _id: new ObjectId(user_id),
      },
      {
        projection: {
          password: 0,
        },
      }
    );
    return res.json({
      message: "Get user successfully",
      result: user,
    });
  }
};
