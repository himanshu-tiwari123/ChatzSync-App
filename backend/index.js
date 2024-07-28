import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js"
import cookieParser from "cookie-parser";
dotenv.config({});
import connectDB from "./config/database.js";
import messageRoute from "./routes/messageRoute.js"
import cors from "cors";
import { app, server } from "./socket/socket.js";


// const app = express();

const PORT = process.env.PORT || 8000;
//middleware:
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser());
// app.use(cors());

const corsOption = {
    origin: 'http://localhost:3000',
    credentials: true  // <-- Required to pass cookies or tokens in the request
  };
app.use(cors(corsOption));

//Routes
app.use("/api/v1/user",userRoute);
app.use("/api/v1/message",messageRoute);
//http://localhost:8080/api/v1/user/register


server.listen(PORT,()=>{
    connectDB();
    console.log(`We are listening on ${PORT}`)
});