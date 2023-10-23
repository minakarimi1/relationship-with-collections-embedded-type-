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


const Users = mongoose.model('Users', new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  books: [bookSchema],
}));

//>>> create function from add new user <<<
async function createUser(first_name,last_name,books){
  const users = new Users({
    first_name,
    last_name,
    books,
  });
  const result = await users.save();
  console.log(result);
};
// createUser('mina','karimi',[
//   new Books({title:'nodejs programing', pages: 150}),
//   new Books({title:'javaScript programing' , pages: 200}),
//   new Books({title:'html programing' , pages: 200}),
//   ]);

//>>> add book <<<
async function addBook(userId, book){
 const user = await Users.findById(userId);
 user.books.push(book);
 await user.save();
}
// addBook('6535611801f55c4dc6999e11',new Books({title: 'c++ programing', pages: 500}));


// update array books 
async function updateUserArryBook(id){
  try{
    const user = await Users.findById(id)
    if(!user) return console.log('not fond user');

    const bookTitle = user.books.find(book => book.title==='nodejs programing')

    if(bookTitle){
      bookTitle.title="javaScript"
      const result = await user.save()
       console.log("update title");
       console.log(result);
    } else{
      console.log("not update title");

    }

  }catch(error){
    console.error("Error update user" + error);
  }
}

// updateUserArryBook('65360690c7f47479425e7e0e')



//>>> update book <<<
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
    user.books.title = 'JavaScript3';

    // Save the changes to the database
    const result = await user.save();

    console.log(result);
  } catch (error) {
    console.error("Error updating user:", error);
  }
}
// updateUser1('6534e4e45fc465bba1d8eede');

//>>> remove book <<<


//>>> get user <<<
async function getUser(){
  const result = await Users.find()
  console.log(result);
}
// getUser();



app.listen(port,()=>{
  console.log(`server run on port: ${port}`);
});