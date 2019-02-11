//these are objects those exports functions/methods accross other .js/,ts files.
//these are mandatory in case of seggrigating logic accross multiple maintainable files.
//Module file with separate exportable fnctions/methods.
//exports <function-name> = functions(){.....}
//module exporting whole object with sevaral functions
// module.exports = {
    //fx1:functions(){....}
    //fx1:functions(){....}
//}

//To USe Module in other files 
// var obj = require('<Path of Module File>');




exports.caseUtility = function(str,choice){
        if(choice == "U"){
            return str.toUpperCase();
        }
        else if(choice == "L"){
            return str.toLowerCase();
        }
    };
exports.reverse = function(str){
    var res = str.split("");
    return res.reverse();
}