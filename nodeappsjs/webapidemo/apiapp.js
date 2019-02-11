var http = require('http');
 
var products = [];
 
//2.
var extServerOptions = {
    host: 'apiapptrainingservice.azurewebsites.net',
    path: '/api/products',
    method: 'GET'
};
//3.
function get() {
    http.request(extServerOptions, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (data) {
            products = JSON.parse(data);
            // emp.foreach(function (e) {
            //     console.log(e.EmpNo + "\t" + e.EmpName + "\t" + e.Salary + "\t" + e.DeptName + "\t" + e.Designation);
            // });
            console.log(products);
        });
 
    }).end();
};
 
get();
 
console.log("Doing the Post Operations....");
//4
var Product = JSON.stringify({
    'BasePrice': 52000,
    'CategoryName': 'Food',
    'Description': 'Chai-Chai',
    'Manufacturer': 'Road Side Chai Stall',
    'ProductId': '10001',
    'ProductName': 'Chai'
});
 
 
//5
var extServerOptionsPost = {
    host: 'apiapptrainingservice.azurewebsites.net',
    path: '/api/products',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Product.length
    }
};
 
 
 
//6
var reqPost = http.request(extServerOptionsPost, function (res) {
    console.log("response statusCode: ", res.statusCode);
    res.on('data', function (data) {
        console.log('Posting Result:\n');
        process.stdout.write(data);
        console.log('\n\nPOST Operation Completed');
    });
});
 
// 7
reqPost.write(Product);
reqPost.end();
reqPost.on('error', function (e) {
    console.error(e);
});
 
get();