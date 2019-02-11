//1.
var http = require('http');
var callModule = require('./module');
var fs = require('fs');
 
//2.
var serverDetails = {
    host: 'apiapptrainingservice.azurewebsites.net',
    path: '/api/products',
    method: 'GET'
};

var htmlData = fs.readFileSync('./AppPages.html');

var products = [];
//3.

var server = http.createServer(function(req,res){
      if(req.method == 'GET'){
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(htmlData);
      }
      if(req.method == 'POST'){
            let test = '';
            req.on('data',function(prd){
                  test += prd;
            }).on('end',function(){
             
            });
      }

});
server.listen(4080);

// var server = http.createServer(function(request,response){
//       //console.log(request.url);
//       //2. Parse the request and read URL.
//       //if(request.url == '/get'){
//             callModule.getData(serverDetails).then(function (resp) {
//                         products = JSON.stringify(resp);
//                         //console.log(products);
//                         fs.writeFile('../webapidemo/get.html',products,function(err){
//                               //console.log(err.message);
//                         });
//                         fs.readFile('../webapidemo/get.html',function(err,data){
//                               if(err){
//                                   response.writeHead(404,{'Content-Type':'text/html'});
//                                   response.write('Resource is not found.');
//                                   response.end();
//                               }
//                               else{
//                                   response.writeHead(404,{'Content-Type':'text/html'});
//                                   response.write(data.toString());
//                                   response.end();
//                               }
//                           });
//                   }).catch(function (err) {
//                       console.log(err);
//                   });
//                    
//                   console.log('Done');

//           // }
//       });

//   server.listen(4080);
//   console.log('server started on port 4080');




