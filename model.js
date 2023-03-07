const {model,Schema}=require("mongoose");

// Product schema for the products collection in beu database
const productSchema=new Schema({
    productId:{type:Number,required:true},
    quantity:{type:Number,required:true},
    operation:{type:String,required:true}
});

// creating products collection in beu database
const productModel=model("product",productSchema);

module.exports=productModel;