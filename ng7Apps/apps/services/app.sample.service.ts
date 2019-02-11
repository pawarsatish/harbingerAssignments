import { Product } from "../productformcomponent/app.productform.model";
import { Injectable } from '@angular/core';


@Injectable()
export class SampleService{
    getProducts(): Array<Product> {
        let products:Array<Product>;
        products = new Array<Product>();
        products.push(new Product(1001,"P1","C1",122));
        products.push(new Product(1002,"P2","C2",123));
        products.push(new Product(1003,"P3","C3",124));
        products.push(new Product(1004,"P4","C4",125));
        return products;
    }
}