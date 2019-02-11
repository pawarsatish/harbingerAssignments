import { Injectable } from "@angular/core";
import { Http,Response,Headers,RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import { Product } from "../models/app.product.model";

@Injectable()
export class ProductService{
    url:string;
    constructor(private http:Http){
        this.url = "http://localhost:4080";
    }
    authUser(username:string,password:string):Observable<Response>{
        let resp:Observable<Response>;
        var body = {
            UserName : username,
            PassWord : password
        };
        resp = this.http.post(`${this.url}/api/user/auth`,body);
        return resp;
    }
    registerUser(username:string,password:string):Observable<Response>{
        let resp:Observable<Response>;
        var body = {
            UserName : username,
            PassWord : password
        };
        resp = this.http.post(`${this.url}/api/user`,body);
        return resp;
    }

    getData(token:any):Observable<Response> {
        //console.log(token);
        let header : Headers = new Headers({
            'Content-Type':'application/json',
            'authorization':'Bearer ' + token
        });
        let options : RequestOptions = new RequestOptions();
        options.headers = header;

        let resp:Observable<Response>;
        resp = this.http.get(
            `${this.url}/api/products`,options
            );
        return resp;
    }
    getFilteredData(ProductName:boolean,CategoryName:boolean,ManufacturerName:boolean,filterString:string):Observable<Response> {
        let resp:Observable<Response>;
        let header : Headers = new Headers({'Content-Type':'application/json'});
        //2.Additional values
        //header.append('AUTHORIZATION','Basic UserName:PassWord');
        //3.define request options for header
        // Request Option is a collection of header values. 
        let options : RequestOptions = new RequestOptions();
        options.headers = header;

        var prdname:boolean;
        var catname : boolean;
        var manufactname : boolean;
        var filterstring:string;
        if(filterString != " "){
            filterstring = filterString;
        }
        if(ProductName){
            prdname = ProductName;
        }
        if(CategoryName){
            catname = CategoryName;
        }
        if(ManufacturerName){
            manufactname = ManufacturerName;
        }
        var body = {
            ProductName : prdname,
            CategoryName : catname,
            ManufacturerName : manufactname,
            filterString : filterstring
        };
        resp = this.http.post(
            `${this.url}/api/filterProduct`,
             body,options
            );
        return resp;
    }
    postData(prd:Product):Observable<Response> {
        let resp:Observable<Response>;
        //1. define request headers
        let header : Headers = new Headers({'Content-Type':'application/json'});
        //2.Additional values
        //header.append('AUTHORIZATION','Basic UserName:PassWord');
        //3.define request options for header
        // Request Option is a collection of header values. 
        let options : RequestOptions = new RequestOptions();
        options.headers = header;
        resp = this.http.post(
            `${this.url}/api/products`,
            JSON.stringify(prd),
            options
            );
        return resp;
    }
    putData(id:number,prd:Product):Observable<Response> {
        let resp:Observable<Response>;
        //1. define request headers
        let header : Headers = new Headers({'Content-Type':'application/json'});
        //2.Additional values
        //header.append('AUTHORIZATION','Basic UserName:PassWord');
        //3.define request options for header
        // Request Option is a collection of header values. 
        let options : RequestOptions = new RequestOptions();
        options.headers = header;
        resp = this.http.put(
            `${this.url}/api/products/${id}`,
            JSON.stringify(prd),
            options
            );
        return resp;
    }
    deleteData(id:number):Observable<Response> {
        let resp:Observable<Response>;
        //1. define request headers
        let header : Headers = new Headers({'Content-Type':'application/json'});
        //2.Additional values
        //header.append('AUTHORIZATION','Basic UserName:PassWord');
        //3.define request options for header
        // Request Option is a collection of header values. 
        let options : RequestOptions = new RequestOptions();
        options.headers = header;
        resp = this.http.delete(
            `${this.url}/api/products/${id}`,
             options
            );
        return resp;
    }
}
