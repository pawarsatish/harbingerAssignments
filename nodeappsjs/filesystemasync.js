//1.Create a file and add data in it.



//2.Load the fs module

var fs = require("fs");

//3. Write file with async call

fs.writeFile("./myasyncFile.txt","I am Async File.",
function(err){
    if(err){
        console.log(err.message);
        return;
    }
    else{
        console.log("File Written Successfully...");
        return;
    }
}
);
console.log("File is written by Async");


//4. Read file with sync call
fs.readFile("./myasyncFile.txt",
function(err,data){
if(err){
    console.log(err.message);
    return;
}
else{
    console.log(data.toString());
}
}
);
console.log("File is read by Async");


console.log("File is append by Async");

fs.appendFile("./myasyncFile.txt","This is appended Text",
function(err){
if(err){
    console.log(err.message);
    return;
}
}
);
console.log("append Successfully");

console.log("After Appending Reading The File.");

fs.readFile("./myasyncFile.txt",
function(err,data){
if(err){
    console.log(err.message);
    return;
}
else{
    console.log(data.toString());
}
}
);
console.log("File is read by Async");












