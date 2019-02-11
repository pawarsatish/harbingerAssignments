
import { Injectable } from '@angular/core';
import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AppGuardService implements CanActivate {
    isAuthenticatedUser:string = "";
    constructor(private _router:Router) { }

    canActivate(
        route:ActivatedRouteSnapshot,
        state:RouterStateSnapshot
    ):boolean{
        this.isAuthenticatedUser = sessionStorage.getItem("isLoggedIn");
        // console.log("canActivate");
        // console.log(this.isAuthenticatedUser);
        if(this.isAuthenticatedUser == "false" || this.isAuthenticatedUser == undefined){
            alert("You are not allowed to view this page,Your are now redirected to Login.");
            //this._router.navigate(["Home"]); 
            //this._router.navigate(["error"]);
            this._router.navigate(["user"]);

            return false;
        }
        else{
            return true;
        }
    }

}
