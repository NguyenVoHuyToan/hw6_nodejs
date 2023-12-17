import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const signToken = ({ payload }) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { payload },
      process.env.PRIVATE_KEY,
      { algorithm: "HS256" },
      (err, token) => {
        if (err) {
          console.log("error", err);
        }
        resolve(token);
      }
    );
  });
};

export const verifyToken = ({ token, secretOrPublicKey }) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "shhhhh", (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
};
