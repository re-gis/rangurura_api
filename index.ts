import 'reflect-metadata'
import {config} from "dotenv";
import express from "express";

import bodyParser from "body-parser";

import cors from "cors";

import fileUpload from "express-fileupload";
import {userRouter} from "./routes/userRouters/user.routes";
// import swaggerUi from 'swagger-ui-express'

config();
// const userRouter = require("./routes/userRouters/user.routes");
// const questionRouter = require("./routes/questionRouters/question.routes");
// const ideasRouter = require("./routes/ideaRouters/ideas.routes");
// const eventRouter = require("./routes/eventRouter/event.routes");
// const leaderRouter = require("./routes/leadersRoutes/leaders.routes");
// const swaggerSpec = require("./utils/swagger");
// const swaggerUi = require("swagger-ui-express");
// const { index } = require("./algoria");
// const messageRouter=require("./routes/messagesRouter/messages.routes");
// const { mysqlConnect } = require("./config/mysql");
// const { pool } = require("./config/postgres");
const app = express();

const PORT = process.env.PORT;

import {createConnection} from 'typeorm'
import {leaderRouter} from "./routes/leadersRoutes/leaders.routes";

// createConnection().then(connection => {
//     console.log("Database connected successfully!")
// }).catch(error => {
//     console.log("Error while connecting to database: ", error)
// })
createConnection().then(connection => {
  console.log("Database connected successfully!")
}).catch(error => {
  console.log("Error while connecting to database: ", error)
})


app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

/* FILE UPLOAD */
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

/* ROUTES */
app.use("/api/v1/users", userRouter);
// app.use("/api/v1/questions", questionRouter);
// app.use("/api/v1/ideas", ideasRouter);
// app.use("/api/v1/events", eventRouter);
app.use("/api/v1/leaders", leaderRouter);
// app.use("/api/v1/message",messageRouter);
// app /* SWAGGER */.app
//   app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

// Search api
// app.get("/search", (req, res) => {
//   const query = req.query.query;
//   index.search(query, (err, cnt) => {
//     if (err)
//       return res.status(500).json({ message: "Internal server error..." });
//
//     return res.status(200).json({ data: cnt.hits });
//   });
// });

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
