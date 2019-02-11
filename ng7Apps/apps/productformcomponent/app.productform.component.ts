import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from "@angular/forms";

import { Product,Catagories } from "./app.productform.model";
import { ProductLogic } from "./app.product.logic";
import { PrductNameValidator } from "./../customevalidators/app.customvalidators";

@Component({
    selector: 'app-productform-component',
    templateUrl: './app.productform.view.html'
})
export class ProdcutFormComponent implements OnInit {
    product:Product;
    checkAll:boolean;
    check:boolean;
    private logic:ProductLogic;
    categories = Catagories;
    products:Array<Product>;
    tableHeaders:Array<string>;
    tablerowcount:number;
    isSave:boolean;
    //define formgroup
    frmProduct:FormGroup;
    constructor() {
        this.products = new Array<Product>();
        this.product = new Product(0,"","",0);
        this.logic = new ProductLogic();
        this.tableHeaders = new Array<string>();
        this.checkAll = false;
        this.check = false;
        this.tablerowcount = 0;
        this.isSave = false;

        //define an instace of formgroup and map property of model class i.e product
        this.frmProduct = new FormGroup({
            ProductId: new FormControl(this.product.ProductId,
                Validators.compose([
                // Validators.required,
                // Validators.pattern("[0-9]+"),
                // Validators.minLength(2),
                // Validators.maxLength(5),
                    PrductNameValidator.checkUniqueProdId])
                ),
            ProductName: new FormControl(this.product.ProductName,
                Validators.compose([
                    PrductNameValidator.checkNumber,
                    PrductNameValidator.checkProdName,PrductNameValidator.CheckCharForWhiteSpaces])
                ),
            CategoryName: new FormControl(this.product.CategoryName,
                Validators.compose([PrductNameValidator.checkCategory])
                ),
            Price: new FormControl(this.product.Price)
        });
     }
    //This is component lifecycle interface
    //This method will be invoked immediately after constructor. 
    ngOnInit(): void {
        //Read All Properties Of Product Class And Push them into table headers array
        for(let p in this.product){
            this.tableHeaders.push(p);
        }
        this.products = this.logic.getProducts();
     }
    clear():void{
        this.product = new Product(0,"","",0);
        this.products = this.logic.getProducts();
        this.check = false;
        this.checkAll = false;
        this.tablerowcount = 0;
        //console.log(`${this.check} ${this.checkAll} ${this.tablerowcount}`);
    }
    save():void{
        //read form values using formControlName under formgroup
        this.product = this.frmProduct.value;
        this.products = this.logic.saveProduct(this.product);
        this.isSave = false;
        this.product = new Product(0,"","",0);
    }
    loadForm():void{
        this.isSave = true;
    }
    getSelectedrow(p:Product):void{
        //1.Create a deep copy of the selected product
        //2.assign that copy to this.product
        this.product = Object.assign({},p);
    }
    CheckAll():void{
        if(this.checkAll == true){
            this.checkAll = false;
            this.check = false;
        }
        else{
            this.checkAll = true;
            this.check = true;
        }
    }
    Check():void{
        this.tablerowcount += 1;
        if(this.tablerowcount == this.products.length){
            this.checkAll = true;
        }
        else{
            this.checkAll = false;
        }
    }
    delete():void{
      this.products = this.logic.delete(this.product.ProductId);
    }
}
