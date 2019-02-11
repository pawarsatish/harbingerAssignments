var mongoose = require('mongoose');


var userSchema = new mongoose.Schema(
    {UserName:String,PassWord:String},
    { versionKey: false }
    );   

// var userSchema = mongoose.Schema({
//     UserName:String,
//     PassWord:String
// });
var userModel = mongoose.model("usermodel",userSchema,"usermodel");

module.exports = {
    registerUser: function(user){
      userModel.create(user,function(err,res){
            if(err){
                return err;   
            }
            return res;
        });
    },
    authenticateUser: function(username,Password,cb){
            userModel.findOne(
            { UserName: username, PassWord: Password}
            ).exec(function(err,res){
                if(err){
                    console.log(err);
                }
                else{
                    if(res){
                        return cb(true);
                    }else{
                        return cb(false);
                    }
                }
        });
    },
    authenticateUserForWebToken: function(username,Password){
       return userModel.findOne({ UserName: username, PassWord: Password});
    },
    registerUserForWebToken: function(user,cb){
         userModel.create(user,function(err,resp){
            if(err){
                console.log(err);
            }
            else{
                if(resp){
                    return cb(true);
                }else{
                    return cb(false);
                }
            }
         });
      }
}

