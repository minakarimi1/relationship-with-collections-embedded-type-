import "dotenv/config";
import express from "express";
const app = express();
import mongoose from "mongoose";
const port = process.env.PORT||3000;

//>>> create embeddedDB collection <<<
mongoose.connect('mongodb://127.0.0.1:27017/embeddedDB')
.then(()=>console.log('connected to mongo DB'))
.catch((err) => console.log("could not connect to DB", err));

//>>> create Books and User document in DB<<<
const bookSchema = new mongoose.Schema({
  title: {type: String},
  pages: {type: Number},
});
const Books = mongoose.model('Books', bookSchema);


const Users =mongoose.model('Users', new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  book: bookSchema,
}));

//>>> create function from add new user <<<
async function createUser(first_name,last_name,book){
  const users = new Users({
    first_name,
    last_name,
    book,
  });
  const result = await users.save();
  console.log(result);
};
// createUser('mina','karimi',new Books({title:'nodejs programing', pages: 150}));


//>>> update user <<<
async function updateUser(id){
  await Users.updateMany({_id:id},{
    $set : {
      'book.title': 'nodejs',
      'book.pages': 100,
    }
  })
}
// updateUser('6534c686452881023439ea66');


//update with try catch
async function updateUser1(id) {
  try {
    // Assuming that you are using a MongoDB model for the User
    const user = await Users.findById(id);

    if (!user) {
      console.log("User not found");
      return;
    }

    // Update the book title
    user.book.title = 'JavaScript3';

    // Save the changes to the database
    const result = await user.save();

    console.log(result);
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

updateUser1('6534c686452881023439ea66');

//>>> get user <<<
async function getUser(){
  const result = await Users.find()
  console.log(result);
}
getUser();



app.listen(port,()=>{
  console.log(`server run on port: ${port}`);
});