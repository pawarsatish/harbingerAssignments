//1.Load Express
var express = require('express');
//1.a Load the path module,which is the standered node module. 
//This will be used by static middleware of express.
var path = require('path');

var bodyParser = require('body-Parser');
//1b Import the data model.
var datamodel = require('./datamodel');
//1c Loading mongoose driver
var mongoose = require('mongoose');

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
//3b. Define express router for seggregating url's 
//for Html page web request and Rest API request
var router = express.Router();
//3c. Add the router object in the express middleware
    instance.use(router);

//4. Create web request handlers
    //4.a This will return the home.html from views folder
    // instance.get("/home",function(request,response){
    //     response.sendFile("home.html",{
    //         root:path.join(__dirname,"./../views")
    //     },function(error){
    //         if(error){
    //         console.log("Resource Not Found." + error.message);
    //         }
    //     });
    // });
    router.get("/home",function(request,response){
        response.sendFile("home.html",{
            root:path.join(__dirname,"./../views")
        },function(error){
            //if(error){
            //console.log("Resource Not Found." + error.message);
            response.sendFile("error.html",{
                root:path.join(__dirname,"./../views")
            });
        //}
    });
});

//Model-Schema-Mapping with collection of mongo DB
//And establishing connection with it.
mongoose.connect('mongodb://localhost/Products',{useNewUrlParser : true});

//Get the connection Object
var dbConnect = mongoose.connection;
//If dbconnect is not undefined then connection is successful
if(!dbConnect){
    console.log('sorry connection is not established.');
    return;
}
//Now define schema (recomended to have same attributes as per collection)
var productSchema = mongoose.Schema({
        ProductId:string,
        ProductName:string,
        CategoryName:string,
        ManufacturerName:string,
        Price:string
});
//map the schema with the collection
//===============================(name,schema,collection);
var productModel = mongoose.model("Products",productSchema,"Products");





//5. Create REST APIs request handlers
instance.get('/api/products',function(request,response){
    //5.a Read headers for Authorization
    var authValues = request.headers.authorization;

    //5.b Process Values
    var Credentials = authValues.split(" ")[1];
    var data = Credentials.split(":");
    var username = data[0];
    var password = data[1];

    //5.c May access model from database.
    
    if(username == "satish" && password == "satish"){
    response.send(JSON.stringify(datamodel.getData()));
    }
    else{
        response.statusCode = 401;
        response.send({
         status: response.statusCode,
         message:"Unauthorized Access"
        });
    }
});
instance.get('/api/products/:id',function(request,response){
    response.send(JSON.stringify(datamodel.getDataById(request.params.id)));
});
instance.post('/api/products',function(request,response){
    var data = request.body; //read the request body
    response.send(JSON.stringify(datamodel.addData(data)));
});
instance.put('/api/products',function(request,response){
    var data = request.body; //read the request body
    response.send(JSON.stringify(datamodel.updateData(data)));
});
instance.delete('/api/products/:id',function(request,response){
    var id = request.params.id; //read the request body
     response.send(JSON.stringify(datamodel.deleteData(id)));
});

//6. Start listening....
instance.listen(4070,function(){
console.log("started listening on port number 4070.");
});