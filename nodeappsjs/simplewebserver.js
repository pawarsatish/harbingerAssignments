var http =  require('http');

var data = [
    {id:101,name:"ABC"},
    {id:102,name:"ABCD"},
    {id:103,name:"ABCDE"}
];

//1.Create Server
var server = http.createServer(function(request,response){
    // response.writeHead(200,{'ContentType':'text/html'});
    // response.write('Hello World',function(err){console.log(err.message)});
    response.writeHead(200,{'ContentType':'application/json'});
    response.write(JSON.stringify(data),function(err){});
    response.end();
    });
//2.Listen on the port
server.listen(4050);
console.log("server is started at port no:4050");
