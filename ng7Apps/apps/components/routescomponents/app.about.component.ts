import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";


@Component({
    selector: 'app-about-component',
    template: `
        <h2>About Component<h2>
        <div class="container">{{message}}</div><br/>
        <div class="container">The Value is : {{ value }}</div>
        <br/>
        <input type="button" value="Navigate to Contact" disabled="disabled"  (click)="navigateToContact();" />
    `
})
export class AboutComponent implements OnInit {
    message:string;
    value:number;
    //Injection of Router And ActivatedRoute will fetch router object 
    //from Router Module imported in NgModule using "routing"
     constructor(private router:Router,private activatedroute:ActivatedRoute) {
        this.message = `I am About Component.`;
     }

    //subscribe to parameters from ActivetedRoute object
    ngOnInit(): void {
        this.activatedroute.params.subscribe((params)=>{
         this.value = params.id;
        });
     }

    navigateToContact():void{
       this.router.navigate(["contact"]);
    }
}