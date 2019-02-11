var http = require('http');
var fs = require('fs');
//var path = require('path');


var urlArray = [
    '/home',
    '/about',
    '/contact',
    '/products'
];


var URL = [];
var server = http.createServer(function(request,response){
    //console.log(request.url);
    //2. Parse the request and read URL.
    URL = urlArray.filter((url)=>{
            return url === request.url;
    });


    if(request.url === URL[0]){
        //2.a Read for home page
        //var path = URL + '.html';
        URl += '.html';
        console.log(URL);
        fs.readFile(URl,function(err,data){
            if(err){
                response.writeHead(404,{'Content-Type':'text/html'});
                response.write('Resource is not found.');
                response.end();
            }
            else{
                response.writeHead(404,{'Content-Type':'text/html'});
                response.write(data.toString());
                response.end();
            }
        });
    }
});

server.listen(4060);
console.log('server started on port 4060');
console.log(URL);