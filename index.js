import express from "express";
import userRouter from "./routes/userRoute.js";
import databaseService from "./service/database.service.js";
import {config} from "dotenv";
import mediaRoute from "./routes/mediaRoute.js";

config()

const app = express();
const port = 3005;

databaseService.run()

app.use(express.json());

app.use("/user",userRouter);
app.use("/media", mediaRoute);

app.use((err, req, res, next) => {
  return res.json({err})
})


app.listen(port, () => {
  console.log(`Your app is starting at ${port}`);
});
