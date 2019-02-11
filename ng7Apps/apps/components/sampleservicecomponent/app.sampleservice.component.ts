import { Component, OnInit } from "@angular/core";
import { SampleService } from "./../../services/app.sample.service";

@Component({
    selector:'app-sampleservice-component',
    template:`
            <input type="button" value="Get Data" (click)="getData();" />
    `
})
export class SampleServiceComponent implements OnInit{
    constructor(private sampleservice:SampleService){}

    ngOnInit():void{
    
    }
    getData():void{
        let data = this.sampleservice.getProducts();
        console.log(JSON.stringify(data));
    }
}