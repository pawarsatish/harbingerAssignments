import { Component, OnInit,EventEmitter,Output } from "@angular/core";
import { Product, Products } from "../models/app.product1.model";
import { CommunicationService } from "./../services/app.communication.service";
// 2.
@Component({
    selector: "app-prdreceiver-component",
    template: `
   <div class="container">
     <h2>
     <strong>
     Products List for Category:{{CatId}}
     </strong>
     </h2>
 
  <table class="table table-bordered table-striped">
          <thead>
              <tr>
              <td>Product Id</td>
                <td>Product Name</td>
                <td>Category Id</td>
              </tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of FilterProducts">
            <td>{{p.ProdId}}</td>
            <td>{{p.ProdName}}</td>
            <td>{{p.CatId}}</td>
            </tr>
          </tbody>
       </table>
       </div>
    `
})
export class DemoCommunicationChildComponent implements OnInit {
    // 3.
    prd: Product;
    prds = Products;
    CatId: number;
    private _FilterProducts: Array<Product>;
    arraylength:string;
    @Output()
    raiseEventFromChild: EventEmitter<string>;
    @Output() nameEvent: EventEmitter<string>;

    constructor(private serv: CommunicationService) {
        this.prd = new Product(0, "", 0);
        this.CatId = 0;
        this._FilterProducts = new Array<Product>();
        this.raiseEventFromChild = new EventEmitter<string>();
        this.nameEvent = new EventEmitter<string>();
        this.arraylength = "";
    }
    
    // 4.
    ngOnInit() {
        this.serv.receivedFilter.subscribe((param: number) => {
            this.CatId = param;
        });
    }

    ongetarraylength():void{
        //console.log('In CHild');
        //this.arraylength = `We found ${ this._FilterProducts.length} records for this category`;
        this.raiseEventFromChild.emit(this.arraylength);
    } 
    onNameChange () {
        this.nameEvent.emit(this.arraylength);
      }
    // 5.
    get FilterProducts(): Array<Product> {
        this._FilterProducts = new Array<Product>();
        if (this.CatId > 0) {
            this.prds.forEach(p => {
                if (p.CatId === this.CatId) {
                    this._FilterProducts.push(p);
                }
            });
        } else {
            this._FilterProducts = this.prds;
        }
        this.arraylength = `We found ${ this._FilterProducts.length} records for this category`;
        this.ongetarraylength();
        return this._FilterProducts;
    }
}