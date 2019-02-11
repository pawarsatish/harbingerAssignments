import { Component, OnInit } from '@angular/core';
import { Router, Route } from "@angular/router";
import { ProductService } from "./../services/app.products.service";
import { Response } from '@angular/http';

@Component({
    selector: 'app-user-register',
    templateUrl: `./app.registeruser.component.html`
})
export class RegisterUserComponent implements OnInit {
    UserName:string;
    PassWord:string;
    Messege:string;
    ConfirmPassword:string;
    constructor(private _service:ProductService,private _router:Router) { 
        this.UserName = ""; 
        this.PassWord = "";
        this.Messege = "";
        this.ConfirmPassword = "";
    }
    ngOnInit(): void { }
    
    OnUserRegister():void {
        if(this.PassWord.trim() != this.ConfirmPassword.trim()){
            this.Messege = `Password and Confirm password does not match.`;
            setTimeout(() => {
                this.Messege = "";
            }, 900);
        }
        else{
            this._service.registerUser(this.UserName,this.PassWord).subscribe(
            (resp:Response)=>{
              this.Messege = resp.json().status;
              this._router.navigate(["user"]);
            }, error => {
            console.log(`Error ${error}`);
          });
       }
    }
}
