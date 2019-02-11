import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-error-component',
    template: `
        <h2>Error Component<h2>
        <div class="container">{{message}}</div>
    `
})
export class ErrorComponent implements OnInit {
    message:string;

     constructor(private _router:Router) {
        this.message = `404 Resource not found.`;
     }

    ngOnInit(): void {
        this._router.navigate(["home"]);
     }
}