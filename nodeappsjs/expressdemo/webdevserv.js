//1.Load Express
var express = require('express');
//1.a Load the path module,which is the standered node module. 
//This will be used by static middleware of express.
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-Parser');
var jwt = require('jsonwebtoken');
var jwtSettings = {
    jwtSecret:"sbibobbompnb37645sbi28yesbi"
};
var tokenStore = "";
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

instance.set("jwtSecret",jwtSettings["jwtSecret"]);
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
    usermodel.registerUserForWebToken(user,function(res){
        if(res){
             if(res != false){
                var Token = jwt.sign({user},instance.get("jwtSecret"),
                {
                    expiresIn:3600
                });
                tokenStore = Token;
                response.send({ 
                    statusCode:200,
                    authenticated:true,
                    status:'Profile Created Successful',
                    token:Token
                });
             }
             else{
                response.send({ statusCode:404,status:'Some Error Occured..'});
             }
         }
         else{
            response.send({ statusCode:404,status:'Some Error Occured..'});
         }
     });
    // console.log(promiseObj);
    // promiseObj.then(function(err,resp){
    //     if(err){
    //         console.log(`Some Error Occured..`);
    //         throw err;
    //     }
    //     if(!resp){
    //         response.send({ statusCode:404,status:'Some Error Occured..'});
    //     }
    //     else if(resp){
    //             var Token = jwt.sign({user},instance.get("jwtSecret"),{
    //                 expiresIn:3600
    //             });
    //             tokenStore = Token;
    //             response.send({ 
    //                 authenticated:true,
    //                 status:'Profile Created Successful',
    //                 token:Token
    //             });
    //         }
    // });
});


instance.post('/api/user/auth',function(request,response){
    var user = {
        UserName: request.body.UserName,
        PassWord: request.body.PassWord
    }
   var PromiseObj =  usermodel.authenticateUserForWebToken(user["UserName"],user["PassWord"]);
   PromiseObj.exec(function(err,resp){
    if(err){
        console.log(`Some Error Occured..`);
        throw err;
    }
    if(!resp){
        response.send({ statusCode:404,status:'User Not Found.'});
    }
    else if(resp){
        if(user["PassWord"] != resp.PassWord){
              response.send({ statusCode:404,status:'User Password Does Not Match.'});
        }
        else{
            var Token = jwt.sign({user},instance.get("jwtSecret"),{
                expiresIn:3600
            });
            tokenStore = Token;
            response.send({ 
                statusCode:200,
                authenticated:true,
                status:'Login Successful',
                token:Token
            });
        }
    }
   });
});

instance.get('/api/products',function(request,response){
    var authValues = request.headers.authorization;
    var CredentialsToken = authValues.split(" ")[1];
    jwt.verify(CredentialsToken,instance.get("jwtSecret"),function(err,Decoded){
        if(err){
            console.log("In Auth Error");
            response.send({ Success:false,message:'Token Verification Failed.'});
        }
        else{
            console.log("In Auth Success");
            request.Decoded = Decoded;
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
        }
    });


    //console.log(Credentials);
    // var data = Credentials.split(":");
    // var username = data[0];
    // var password = data[1];
    // usermodel.authenticateUser(username,password,function(res){
    //    if(res){
    //         productmodel.getProducts(function(prdres){
    //         if(prdres != false){
    //             response.statusCode = 200;
    //             response.send({status: response.statusCode, data:prdres});
    //         }
    //         else{
    //             response.statusCode = 500;
    //             response.send({status:response.statusCode,error:'Some Error Occured.'});
    //         }
    //         });
    //     }
    //     else{
    //         response.send(`UnAuthorized Person.`);
    //     }
    // });
});





// instance.get('/api/products1',function(request,response){
//     var authValues = request.headers.authorization;
//     var Credentials = authValues.split(" ")[1];
//     var data = Credentials.split(":");
//     var username = data[0];
//     var password = data[1];
//     usermodel.authenticateUser(username,password,function(res){
//        if(res){
//             productmodel.getProducts(function(prdres){
//             if(prdres != false){
//                 response.statusCode = 200;
//                 response.send({status: response.statusCode, data:prdres});
//             }
//             else{
//                 response.statusCode = 500;
//                 response.send({status:response.statusCode,error:'Some Error Occured.'});
//             }
//             });
//         }
//         else{
//             response.send(`UnAuthorized Person.`);
//         }
//     });
// });
instance.post('/api/products',function(request,response){
    var authValues = request.headers.authorization;
    var Credentials = authValues.split(" ")[1];
    var data = Credentials.split(":");
    var username = data[0];
    var password = data[1];
    usermodel.authenticateUser(username,password,function(res){
        if(res){
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
        }
        else{
            response.send(`UnAuthorized Person.`);
        }
    });
});

instance.listen(4080,function(){
console.log("started listening on port number 4080.");
});





