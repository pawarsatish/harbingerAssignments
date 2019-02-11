import { Component, OnInit } from '@angular/core';
//import { UserAuthService } from "./../../services/app.userauth.service";
//import { routes } from "./app.route.table";
//import { RegisterUserComponent } from '../../registeruser/app.registeruser.component';
import { DataService } from '../../services/app.data.service';

@Component({
    selector: 'app-main-component',
    template: `
    <table class="table table-bordered table-striped" >
        <tr>
            <td>  <a [routerLink]="[ 'home' ]">Home</a> </td>
            <td>  <a [routerLink]="[ 'about']">About</a>  </td>
            <td>  <a [routerLink]="[ 'product']">Products</a> </td>
            <td>  <a [routerLink]="[ 'user']">Login</a> </td>
            <td [hidden]="hidelink">  <a [routerLink]="[ 'registeruser']" >Register</a> </td>
            <td>  <a [routerLink]="[ 'logoff']">LogOff</a> </td>
        </tr>
    </table>
    <hr/>
    <router-outlet></router-outlet>
    `
})
export class MainComponent implements OnInit {
    hidelink:boolean;
    constructor(private _userAuth:DataService) {
    }

    ngOnInit(): void {
        this._userAuth.currentMessage.subscribe(flag => this.hidelink = flag);
    }
}
