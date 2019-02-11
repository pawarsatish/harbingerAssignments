console.log("Node JS");
var Employee = {
    EmpNo:101,
    EmpName:"ABC"
};
console.log(JSON.stringify(Employee));
add(2,3);
function add(x,y){
    var res = parseInt (x)  + parseInt(y);
    console.log(res);
}