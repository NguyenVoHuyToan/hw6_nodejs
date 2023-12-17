import { ObjectId } from "mongodb";
import User from "../models/shcema/user.shcema.js";
import { signToken } from "../utils/jwt.js";
import databaseService from "./database.service.js";
import bcrypt from "bcrypt";
import {config} from "dotenv"

config();
class UserService {
  async register(payload) {
    const user_id = new ObjectId()
    await databaseService.new_database.insertOne(
      new User({
        ...payload,
        _id: user_id,
        password: bcrypt.hashSync(payload.password, +process.env.HASH_ROUND),
      })
    );
    const acess_token = await signToken({payload:user_id })
    return acess_token;
  }
  async login(user_id) {
    const access_token = await signToken({payload:user_id})
    return access_token;
}
}
const newUserService = new UserService();

export default newUserService;
