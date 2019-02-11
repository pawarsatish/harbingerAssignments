import { AbstractControl  } from "@angular/forms";
import { Product, Products } from "./../productformcomponent/app.productform.model";
import { ProductLogic  } from "../productformcomponent/app.product.logic";



export class PrductNameValidator{
    static checkProdName(ctrl: AbstractControl): any {
        if(ctrl.value.charAt(0) !==  ctrl.value.charAt(0).toUpperCase()){
           return { invalid: true };
        }
        else{
            return null;
        }
      }
      static checkNumber(ctrl:AbstractControl):any{
        let validstring:string[];
        let isStringHavingNumber:boolean;
        let reg = /^\d+$/;
          validstring =ctrl.value.split('');
          validstring.filter( c =>{
            if(reg.test(c)){
                isStringHavingNumber = true; 
            }
          });
        if(!isStringHavingNumber){
            return null;
          }
          else{
            return { invalidstring: true };
          }
      }
      static CheckCharForWhiteSpaces(ctrl: AbstractControl):any{
       if(ctrl.value.split(" ").length != 3){
            return { invalidWhiteSpace: true };
        }
        else{
            return null;
        }
      }
      static checkUniqueProdId(ctrl: AbstractControl):any{
        let products : Array<Product>;
        let logic:ProductLogic;
        logic = new ProductLogic();
        products = logic.getProducts();
        products = products.filter((p)=>{
            return p.ProductId == ctrl.value;
        });
        if(products.length > 0){
            return { invalid: true }
        }
        else{
            return null;
        }
      }
      static checkCategory(ctrl: AbstractControl):any{
          if(ctrl.value == "" || ctrl.value === "Select Category"){
            return { invalidCategory: true } 
          }
          else{
              return null;
          }
      }
}