//1.Load Express
var express = require('express');
//1.a Load the path module,which is the standered node module. 
//This will be used by static middleware of express.
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-Parser');
//1b Import the data model.
//var datamodel = require('./datamodel');
//1c Loading mongoose driver
var usermodel = require('./usermodel');
var productmodel = require('./dal');
var cors = require('cors');

//1d Set the global promise to manage all async call made by 
//application using mongoose driver.
mongoose.Promise = global.Promise;

//2. define an instance of express
var instance = express();

//3. Configure all middlewares, call use() method on express instance
//3a. Static Files
    instance.use(
        express.static(
            path.join(__dirname,"./../node_modules/jquery/dist/")
            )
        );
        instance.use(bodyParser.json());
        instance.use(bodyParser.urlencoded({ extended: false }));
        instance.use(cors());
//3b. Define express router for seggregating url's 
//for Html page web request and Rest API request
var router = express.Router();
//3c. Add the router object in the express middleware
 instance.use(router);
//6. Start listening....
mongoose.connect('mongodb://localhost/ProductsAppDb',{useNewUrlParser : true});

//Get the connection Object
var dbConnect = mongoose.connection;
//If dbconnect is not undefined then connection is successful
if(!dbConnect){
    console.log('sorry connection is not established.');
    return;
}
instance.post('/api/user',function(request,response){
    var user = {
        UserName: request.body.UserName,
        PassWord: request.body.PassWord
    }
    var resp = usermodel.registerUser(user);
});

instance.get('/api/products',function(request,response){
            productmodel.getProducts(function(prdres){
                if(prdres != false){
                    response.statusCode = 200;
                    response.send({status: response.statusCode, data:prdres});
                }
                else{
                    response.statusCode = 500;
                    response.send({status:response.statusCode,error:'Some Error Occured.'});
                }
            });
});
instance.post('/api/products',function(request,response){

            var Prod = {
                ProductId:request.body.ProductId,
                ProductName:request.body.ProductName,
                CategoryName:request.body.CategoryName,
                ManufacturerName:request.body.ManufacturerName,
                Price:request.body.Price
            };
            productmodel.postProduct(Prod,function(prdres){
                if(prdres != false){
                    response.statusCode = 200;
                    response.send({status: response.statusCode, data:prdres});
                }
                else{
                    response.statusCode = 500;
                    response.send({status:response.statusCode,error:'Some Error Occured.'});
                }
            });
});
instance.put('/api/products/:id',function(request,response){
    var cond = {
              ProductID: request.params.id
            };
    var Prod = {
        ProductId:request.body.ProductId,
        ProductName:request.body.ProductName,
        CategoryName:request.body.CategoryName,
        ManufacturerName:request.body.ManufacturerName,
        Price:request.body.Price
    };
    productmodel.updateProduct(cond,Prod,function(prdres){
        if(prdres != false){
            response.statusCode = 200;
            response.send({status: response.statusCode, data:prdres});
        }
        else{
            response.statusCode = 500;
            response.send({status:response.statusCode,error:'Some Error Occured.'});
        }
    });
});

instance.delete('/api/products/:id',function(request,response){
    var cond = {
              ProductId: request.params.id
            };
    productmodel.deleteProduct(cond,function(prdres){
        if(prdres != false) {  
            response.statusCode = 200;
            response.send({status: response.statusCode, data:prdres});
        }
        else{
            response.statusCode = 500;
            response.send({status:response.statusCode,error:'Some Error Occured.'});
        }
    });
});
// instance.put("/api/products/:id", function(request, response) {
//     // read the request id parameter
//     // read the body
//     // update matched record from array
//     // respond array
//     var prod = {
//       ProductID: request.body.ProductID,
//       ProductName: request.body.ProductName,
//       CategoryName: request.body.CategoryName,
//       Manufacturer: request.body.Manufacturer,
//       Price: request.body.Price
//     };
//     var cond = {
//       ProductID: request.params.id
//     };
//     console.log(JSON.stringify(prod));
//     productModel.updateOne(cond, prod, function(err, res) {
//       if (err) {
//         respose.status = 500;
//         response.send({ status: respose.status, error: err });
//       }
//       response.send({ status: 200, data: res });
//     });
//   });
  
//   instance.delete("/api/products/:id", function(request, response) {
//     // read the request id parameter
//     // delete matched record array
//     // respond array
//     console.log(request.params.id);
//     var cond= {
//       ProductID: request.params.id
//     };
//     productModel.deleteOne(cond, function(err, res) {
//       if (err) {
//         respose.status = 500;
//         response.send({ status: respose.status, error: err });
//       }
//       response.send({ status: 200, data: res });
//     });
//   });


instance.post('/api/filterProduct',function(request,response){
        let ProductName = request.body.ProductName;
        let CategoryName = request.body.CategoryName;
        let ManufacturerName = request.body.ManufacturerName;
        let filterString  = request.body.filterString;
    productmodel.filterProduct(ProductName,CategoryName,ManufacturerName,filterString,function(prdres){
        if(prdres != false){
            response.statusCode = 200;
            response.send({status: response.statusCode, data:prdres});
        }
        else{
            response.statusCode = 500;
            response.send({status:response.statusCode,error:'Some Error Occured.'});
        }
    });
});



instance.listen(4080,function(){
console.log("started listening on port number 4080.");
});