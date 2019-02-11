
import { Component, OnInit } from '@angular/core';
import { Response } from "@angular/http";
import { Router } from "@angular/router";
import { ProductService } from "./../services/app.products.service";

//import { routes } from "./../components/routescomponents/app.route.table";

//import { UserAuthService } from "./../services/app.userauth.service";
import { DataService } from "./../services/app.data.service";
@Component({
    selector: 'app-user-auth',
    templateUrl: "./app.user.auth.component.html",
})
export class UserAuthComponent implements OnInit {
    Messege:string;
    UserName:string;
    PassWord:string;

    constructor(private _service:ProductService,private _userauth:DataService,
        private _router:Router) { 
            this.Messege = ""; 
            this.UserName = ""; 
            this.PassWord = "";
         }

    ngOnInit(): void { }

    OnUserAuth():void {
        this._service.authUser(this.UserName,this.PassWord).subscribe(
            (resp:Response)=>{
                this.Messege = resp.json().status;
                if(resp.json().statusCode === 200){
                    sessionStorage.setItem("isLoggedIn",resp.json().authenticated);
                    sessionStorage.setItem("userToken",resp.json().token);
                    this._userauth.changeMessage(true);
                    setTimeout(() => {
                    this._router.navigate(["home"]);
                }, 900);
            }
            else{
                this._userauth.changeMessage(false);
               // this._router.navigate(["registeruser"]);
            }
        },error => {
            console.log(`Error ${error}`);
        });
    }
    OnCancelAuth():void {
        this._router.navigate(["registeruser"]);
    }
}

