import "dotenv/config";
import express from "express";
const app = express();
import mongoose from "mongoose";
const port = process.env.PORT||3000;

app.listen(port,()=>{
  console.log(`server run on port: ${port}`);
});