//Using express
const express=require('express');
//Creating an instance of express
const mongoose=require('mongoose');
const app=express();
app.use(express.json())
mongoose.connect('mongodb://localhost:27017/mern-todo-app')
.then(()=>{
    console.log('DB connected successfully');
})
.catch((err)=>{
    console.log(err);
})
//Creating the schema
const todoschema=mongoose.Schema({
    title:{
        required:true,
        type:String,
    },
    description:String,
    billingcount:Number
})
//Creating the model for the schema
const todomodel=mongoose.model('Todo',todoschema);
/*Creating a route
app.get('/',(req,res)=>{
    res.send("Hello Yuvi !!!");
})*/
//Sample in-storage for todo item
let todo=[]
//Creating a new todo item list 
app.post('/todo',async (req,res)=>{
    const {title,description,billingcount}=req.body;
    try{
        const newBilling=new billingmodel({title,description,billingcount});
        await newBilling.save();
        res.status(201).json(newBilling);
    }
    catch(error){
      console.log(error);
      res.status(500).json({message:error.message});
    }
})
app.get('/todo',async (req,res)=>{
    try{
        const billing=await billingmodel.find();
        res.json(billing);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:error.message});
    }
})
//Updating the todo list
app.put("/todos/:id",async (req,res)=>{
    try{
    const {title,description,billingcount}=req.body;
    const id=req.params.id;
    const updatedBillings=await billingmodel.findByIdAndUpdate(
    id,
    {title,description,billingcount},
    {new:true}       
    )
    if(!updatedBillings){
        return res.status(404).json({message:"Page not found"});
    }
    res.json(updatedBillings);
  }
  catch(error){
    console.log(error);
    res.status(500).json({message:error.message});
  }
})
//Deleting the billing list item
app.delete('/todos/:id',async (req,res)=>{
    try{
      const id=req.params.id;
      await billingmodel.findByIdAndDelete(id);
      res.status(204).end();
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:error.message});
    }
})
//Setting up the server using the port number
const port=3000;
app.listen(port,()=>{
    console.log("Connection established on the port "+port);
})