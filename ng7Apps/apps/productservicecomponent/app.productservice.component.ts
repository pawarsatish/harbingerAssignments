import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup,FormControl,Validators } from "@angular/forms";

import { Catagories } from "./app.productservice.model";
//import { ProductLogic } from "./app.product.logic";
//import { PrductNameValidator } from "./customevalidators/app.customvalidators";

import { Product } from "../models/app.product.model";
import { ProductService } from "./../services/app.products.service";
import { Response } from "@angular/http";


@Component({
    selector: 'app-productservice-component',
    templateUrl: './app.productservice.view.html'
})
export class ProdcutServiceComponent implements OnInit {
    product:Product;
    checkAll:boolean;
    check:boolean;
    categories = Catagories;
    products:Array<Product>;
    tableHeaders:Array<string>;
    tablerowcount:number;
    isSave:boolean;
    showsearchpanel:boolean = false;
    hidesearch:boolean = false;
    productNameFilter:boolean = false;
    categoryNameFilter:boolean = false;
    manufacturerNameFilter:boolean = false;
    userToken:string;
    //define formgroup
    filterTextbox:string;
    frmProduct:FormGroup;
    constructor(private serv:ProductService) {
        this.products = new Array<Product>();
        this.product = new Product("",0,"","","","0");
        this.tableHeaders = new Array<string>();
        this.checkAll = false;
        this.check = false;
        this.tablerowcount = 0;
        this.isSave = false;
        this.userToken = sessionStorage.getItem("userToken");
        //console.log(` In Const of Product Service Comp:   ${this.userToken}`);
        //define an instace of formgroup and map property of model class i.e product
        this.frmProduct = new FormGroup({
            _id: new FormControl(this.product._id ? this.product._id : null),

            ProductId: new FormControl(this.product.ProductId ? this.product.ProductId : null ),
                //Validators.compose([
                // Validators.required,
                // Validators.pattern("[0-9]+"),
                // Validators.minLength(2),
                // Validators.maxLength(5),
                //    PrductNameValidator.checkUniqueProdId])
                //),
            ProductName: new FormControl(this.product.ProductName ? this.product.ProductName : null),
                //Validators.compose([
                //    PrductNameValidator.checkNumber,
                 //   PrductNameValidator.checkProdName,PrductNameValidator.CheckCharForWhiteSpaces])
               // ),
            CategoryName: new FormControl(this.product.CategoryName ? this.product.CategoryName : null),
                //Validators.compose([PrductNameValidator.checkCategory])
                //),
            ManufacturerName : new FormControl(this.product.ManufacturerName ? this.product.ManufacturerName : null),
            
            Price: new FormControl(this.product.Price ? this.product.Price : null)
        });
     }
     
    //This is component lifecycle interface
    //This method will be invoked immediately after constructor. 
    ngOnInit(): void {
        //Read All Properties Of Product Class And Push them into table headers array
        for(let p in this.product){
            this.tableHeaders.push(p);
        }
        
        this.serv.getData(this.userToken).subscribe(
            (resp:Response)=>{
             this.products = resp.json().data;
        },error => {
            console.log(`Error ${error}`);
        });
     }
    clear():void{
        this.product = new Product("",0,"","","","0");
        //this.products = this.serv.getData();
        this.check = false;
        this.checkAll = false;
        this.tablerowcount = 0;
        //console.log(`${this.check} ${this.checkAll} ${this.tablerowcount}`);
    }
    save():void{
        //read form values using formControlName under formgroup
        this.product = this.frmProduct.value;
        this.serv.postData(this.frmProduct.value).subscribe(
            (resp:Response)=> {
                this.products.push(resp.json().data);
            },(error) => {
                console.log(`Error ${error}`);
            });
        
        this.isSave = false;
        this.product = new Product("",0,"","","","0");
    }
    loadForm():void{
        this.isSave = true;
    }
    getSelectedrow(p:Product):void{
        //1.Create a deep copy of the selected product
        //2.assign that copy to this.product
         var prd = Object.assign({},p);
         this.frmProduct.setValue(prd);
         this.product = this.frmProduct.value;
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
      //this.products; 
    }
    showSearchPanel():void{
        this.showsearchpanel = true;
        this.hidesearch = true;
    }
    getFilteredProducts(){
        this.hidesearch = false;
        this.showsearchpanel = false;
        this.serv.getFilteredData( 
            this.productNameFilter,
            this.categoryNameFilter,
            this.manufacturerNameFilter,
            this.filterTextbox).subscribe(
            (resp:Response)=> {
                this.products = resp.json().data;
                this.categoryNameFilter = false;
                this.productNameFilter = false;
                this.manufacturerNameFilter = false;
                this.filterTextbox = "";
            },error => {
                console.log(`Error ${error}`);
            });
    }
    setProductName():void{
        this.categoryNameFilter = false;
        this.productNameFilter = true;
        this.manufacturerNameFilter = false;
    }
    serCategoryName():void{
        this.categoryNameFilter = true;
        this.productNameFilter = false;
        this.manufacturerNameFilter = false;
    }
    serManfactName():void{
        this.categoryNameFilter = false;
        this.productNameFilter = false;
        this.manufacturerNameFilter = true;
    }
}
