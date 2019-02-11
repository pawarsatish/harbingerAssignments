var mongoose = require('mongoose');
//Now define schema (recomended to have same attributes as per collection)
// var productSchema = mongoose.Schema({
//         ProductId:String,
//         ProductName:String,
//         CategoryName:String,
//         ManufacturerName:String,
//         Price:String
// });
var productSchema = new mongoose.Schema(
    {         
        ProductId:String,
        ProductName:String,
        CategoryName:String,
        ManufacturerName:String,
        Price:String
    },
    { versionKey: false }
    );  
//map the schema with the collection
//===============================(name,schema,collection);
var productModel = mongoose.model("Products",productSchema,"Products");

//5. Create REST APIs request handlers
module.exports = {
     getProducts: function(cb){  
                productModel.find().exec(function(err,res){
                    if(err){
                        console.log(err);
                    }
                    else{
                        if(res){
                           return cb(res);
                        }
                        else{
                            return cb(false);
                        }
                    }
                });
            },
    postProduct: function(prd,cb){
            productModel.create(prd,function(err,res){
                if(err){
                    console.log(err);
                }
                else{
                    if(res){
                       return cb(res);
                    }
                    else{
                        return cb(false);
                    }
                }
            });
        },
    updateProduct : function(cond,data,cb){
            productModel.updateOne(cond,data,function(res,err){
                if(err){
                    console.log(err);
                }
                else{
                    if(res){
                       return cb(res);
                    }
                    else{
                        return cb(false);
                    }
                }
            });
    },
    deleteProduct : function(cond,cb){
            productModel.deleteOne(cond,function(res,err){
                if(err){
                    console.log(err);
                }
                else{
                    if(res){
                       return cb(res);
                    }
                    else{
                        return cb(false);
                    }
                }
            });
    },
        filterProduct:function(productName,categoryName,manufacturerName,filterString,cb){
            var query;
            if(productName){
                query = { 
                   // $or :
                   // [ 
                        //{ 
                            "ProductName" : filterString
                        //}
                   // ] 
                }
            }
            if(categoryName){
                query = { 
                   // $or :
                   // [ 
                        //{ 
                            "CategoryName" : filterString
                        // }
                   // ] 
                }
            }
            if(manufacturerName){
                query = { 
                   // $or :
                   // [ 
                        //{/.*m.*/
                             "ManufacturerName" : filterString
                        //}
                   // ] 
                 }
            }
            //console.log(query);
            productModel.find( query,
                // {
                //     $and : [
                //              { 
                //                  query
                //              }
                //            ]
                // }, 
                function(err,res){
                    if(err){
                        console.log(err);
                    }
                    else{
                        if(res){
                           return cb(res);
                        }
                        else{
                            return cb(false);
                        }
                    }
                });
        }
    }