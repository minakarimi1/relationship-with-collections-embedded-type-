import "dotenv/config";
import express from "express";
const app = express();
import mongoose from "mongoose";
const port = process.env.PORT||3000;

mongoose.connect('mongodb://127.0.0.1:27017/embeddedDB')
.then(()=>console.log('connected to mongo DB'))
.catch((err) => console.log("could not connect to DB", err));

const bookSchema = new mongoose.Schema({
  title: {type: String},
  Number: {type: Number},
})

const Books = mongoose.model('Books', bookSchema);

const Users =mongoose.model('Users', new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  book: bookSchema,
}));





app.listen(port,()=>{
  console.log(`server run on port: ${port}`);
});