import { checkSchema } from "express-validator";
import { validator } from "../utils/validator.js";
import databaseService from "../service/database.service.js";
import bcrypt from "bcrypt";
import { verifyToken } from "../utils/jwt.js";

export const registerValidation = validator(
  checkSchema(
    {
      email: {
        errorMessage: "Invalid email",
        isEmail: true,
        custom: {
          options: async (value, { req }) => {
            const isEmailExist = await databaseService.new_database.findOne({
              email: value,
            });
            if (isEmailExist) {
              throw new Error("Email already exist");
            }
            return true;
          },
        },
      },
      password: {
        isLength: {
          options: { min: 8 },
          errorMessage: "Password should be at least 8 chars",
        },
      },
      confirm_password: {
        isLength: {
          options: { min: 8 },
          errorMessage: "Confirm password should be at least 8 chars",
        },
        custom: {
          options: (value, { req }) => {
            if (value !== req.body.password) {
              throw new Error("Passwords do not match");
            }
            return true;
          },
        },
      },
    },
    ["body"]
  )
);

export const loginValidator = validator(
  checkSchema({
    email: {
      errorMessage: "your email is invalid",
      isEmail: true,
      custom: {
        options: async (value, { req }) => {
          const isEmailExsit = await databaseService.new_database.findOne({
            email: value,
          });
          if (isEmailExsit) {
            throw new Error("Email already exist");
          }
          return true;
        },
      },
    },
    password: {
      isLength: {
        options: { min: 8 },
        errorMessage: "Password should be at least 8 chars",
      },
      custom: {
        options: async (value, { req }) => {
          const user = await databaseService.new_database.findOne({
            email: req.body.email,
          });
          console.log(user);
          const isExreact = bcrypt.compareSync(value, user.password);
          if (!isExreact) {
            throw new Error("your password is incorrect");
          }
          req.new_database = user;
          return true;
        },
      },
    },
  })
);

export const accessTokenValidator = validator(
  checkSchema(
    {
      Authorization: {
        custom: {
          options: async (value, { req }) => {
            if (!value) {
              throw new Error("Access token is required");
            }
            const access_token = value.split(" ")[1];
            const decode_authorization = await verifyToken({
              token: access_token,
              secretOrPublicKey: process.env.PRIVATE_KEY,
            });
            req.deconde_authorization = decode_authorization;
            return true;
          },
        },
      },
    },
    ["headers"]
  )
);
