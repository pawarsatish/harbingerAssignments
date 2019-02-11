import { Component, OnInit } from "@angular/core";
import { Category, Categories } from "./../models/app.category.model";
import { CommunicationService } from "./../services/app.communication.service";

@Component({
    selector: "app-catsender-component",
    template: `
       <div class="container">
         <h2><strong>Category List</strong> </h2>
 
       <table class="table table-bordered table-striped">
          <thead>
              <tr>
                <td>Category Id</td>
                <td>Category Name</td>
              </tr>
          </thead>
          <tbody>
            <tr *ngFor="let c of cats" (click)="getSelectedCategory(c)">
               <td>{{c.CatId}}</td>
               <td>{{c.CatName}}</td>
            </tr>
          </tbody>
       </table>
       </div>
       <div> {{ messege }} </div>
    `
})
 
export class DemoCommunicationParentComponent implements OnInit {
    cat: Category;
    cats = Categories;
    messege:string;
    constructor(private serv: CommunicationService) {
        this.cat = new Category(0, "");
        this.messege = "";
    }
 
 
    ngOnInit(): void { }
 
     
    getSelectedCategory(c: Category): void {
        this.cat = c;
        this.serv.raiseEvent(this.cat.CatId);
    }

    getRaisedEvent($event:any){
        console.log($event);
        this.messege = $event;
    }
    nameEventHander($event: any) {
        this.messege = $event;
      }
}

