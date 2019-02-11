import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/app.data.service';
//import { UserAuthService } from "./../../services/app.userauth.service";

@Component({
    selector: 'app-logoff-user',
    template: `
        <h2> {{Message}} </h2>
    `
})
export class LogOffComponent implements OnInit {
    Message:string;
    constructor(private _dataserv:DataService) { 
        this.Message = `Log off successfully.`;
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("userToken");
    }

    ngOnInit(): void {
        this._dataserv.changeMessage(false);
    }
}
