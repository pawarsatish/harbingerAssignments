import { Product,Products  } from "./app.productservice.model";

export class ProductLogic{
    public products:Array<Product>;
    constructor(){
        this.products = Products;
    }
    getProducts():Array<Product>{
        return this.products;
    }
    saveProduct(prod:Product):Array<Product>{
        this.products.push(new Product(prod.ProductId,prod.ProductName,prod.CategoryName,prod.Price));
        return this.products;
    }
    delete(pid:number):Array<Product>{
        return this.products = this.products.filter((p)=>{
            return p.ProductId != pid;
        });
    }
}