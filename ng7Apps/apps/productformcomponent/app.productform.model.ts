export class Product{

    constructor(
        public ProductId:number, 
        public ProductName:string, 
        public CategoryName:string,
        public Price:number
        ){}
}

export const Catagories = ["Electronics","Electrical","Food"];
export const Products :Array<Product> = new Array<Product>();

Products.push(new Product(101,"Laptop","Electronics",1200));
Products.push(new Product(102,"Iron","Electronics",1800));
Products.push(new Product(103,"Desktop","Electrical",1600));
Products.push(new Product(104,"Mouse","Electronics",100));
Products.push(new Product(105,"Keyboard","Electronics",200));