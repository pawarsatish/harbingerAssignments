//1.Create a file and add data in it.



//2.Load the fs module

var fs = require("fs");

//3. Write file with sync call

fs.writeFileSync("./myFile.txt","I am the Test File.");
console.log("File is written");


//4. Read file with sync call
var Data = fs.readFileSync("./myFile.txt");
console.log(Data.toString());


fs.unlink('./myFile.txt', (err) => {
    if (err) throw err;
    console.log('successfully deleted /tmp/hello');
  });
