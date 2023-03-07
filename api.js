const express=require("express");
const mongoose=require("mongoose");
const app=express();
app.use(express.json());

// importing product Model
const productModel=require("./model");

// post api
app.post("/",async(req,res)=>{
  const {payload}=req.body;
 callOperation(payload);
 res.send({msg:"hello"})
})

// function that performing operation for add and delete if product not found then this function also insert that product
// to products collection
async function callOperation(payload){
   payload.forEach(async(el)=>{
    if(el.operation==="add"){
    let res= await  productModel.findOne({productId:el.productId});
    if(res){
        let newQuantity=Number(res.quantity)+el.quantity;
        await productModel.findOneAndUpdate({productId:el.productId},{$set:{quantity:newQuantity}})
        console.log(res,newQuantity);
    }
  else{
         await productModel.create(el)
    }}
    else{
        let res= await  productModel.findOne({productId:el.productId});
        if(res){
            let newQuantity=Number(res.quantity)-el.quantity;
            if(newQuantity>=0){
                await productModel.findOneAndUpdate({productId:el.productId},{$set:{quantity:newQuantity}})
            }
         
            console.log(res,newQuantity);
        }
    
        else{
            await productModel.create(el)
       }
    }
   })
}

// mongodb compass connection to beu database
app.listen("8080",async(req,res)=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/beu");
    console.log("connected on port 8080")
})