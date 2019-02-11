import { Component } from '@angular/core';


@Component({
    selector : "app-simple-component",
    template : `
    <h2> Calculator</h2>
    <div class="container">
        <div class="form-group" >
            <input type="text" [(ngModel)] = "result" class="form-control" />
        </div> 
        <div class="col-md-8" > 
        <table class="table table-stripped table-condenced">
        <tr>
            <td> <input type="button" value="1" (click) = "setValue(1);"  /></td>
            <td><input type="button" value="2" (click) = "setValue(2);" /></td>
            <td><input type="button" value="3" (click) = "setValue(3);" /></td>
            <td><input type="button" value="+" (click) = "Addition(+);" /></td>
        </tr>
        <tr>
            <td><input type="button" value="4" (click) = "setValue(4);" /></td>
            <td><input type="button" value="5" (click) = "setValue(5);" /></td>
            <td><input type="button" value="6" (click) = "setValue(6);" /></td>
            <td><input type="button" value="-" (click) = "Substraction(-);" /></td>
        </tr>
        <tr>
            
        <td><input type="button" value="7" /></td>
        <td><input type="button" value="8" /></td>
        <td><input type="button" value="9" /></td>
        <td><input type="button" value="x" /></td>
       </tr>
       <tr>
       
       <td><input type="button" value="%" /></td>
       <td><input type="button" value="0" /></td>
       <td><input type="button" value="." /></td>
       <td><input type="button" value="=" /></td>

       </tr>
        </table>
        </div>
    </div>
    
    `
})
export class SimpleComponent{
    result:string;
    name:string;
    url : string;
    fullName:string;
    constructor(){
        // this.message = `Hello Angular 7, Why are you in hurry for versions.?`;
        // this.name = `Satish`;
        // this.url = `http://devcurry.com`;
    }
    setValue():void{
       // this.message = `Hey Button is clicked..!!`;
    }
    Addition():void{
        //this.message = "Hey Button is clicked..!!";
    }
    Substraction():void{
        //this.message = "Hey Button is clicked..!!";
    }

}