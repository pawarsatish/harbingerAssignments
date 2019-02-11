var http = require('http');
var fs = require('fs');
var util = require('./utilitymodule');
var getFile = require('./wholemodule');
var str = "satish";

console.log(`case upper for str = ${util.caseUtility(str,'U')}`);
console.log(`case lower for str = ${util.caseUtility(str,'L')}`);
console.log(`case reverse for str = ${util.reverse(str)}`);

var server = http.createServer(function(request,response){
    //console.log(request.url);
    //2. Parse the request and read URL.
    var file =".."; 
    file += getFile.getFile(request.url);
    file += ".html";
        fs.readFile(file,function(err,data){
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
    });

server.listen(4060);
console.log('server started on port 4060');
