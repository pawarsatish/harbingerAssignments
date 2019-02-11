import { RouterModule,Routes } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

import { HomeComponent } from "./app.home.component";
import { AboutComponent } from "./app.about.component";
//import { ContactComponent } from "./app.contact.component";
//import { ProdcutFormComponent } from "../../productformcomponent/app.productform.component";
import { AppGuardService } from "../../services/app.test.guard.service";
import { ErrorComponent } from "./app.error.component";
import { UserAuthComponent } from "../../useauthcomponent/app.user.auth.component";
import { RegisterUserComponent } from "../../registeruser/app.registeruser.component";
import { LogOffComponent } from "./app.logoff.component";
import { ProdcutServiceComponent } from "../../productservicecomponent/app.productservice.component";

//Define route table 
export const routes : Routes  = [
    {
        path:'user',
        component:UserAuthComponent
    },
    {
        path:'registeruser',
        component:RegisterUserComponent
    },
    {
        path:'logoff',
        component:LogOffComponent
    },
        {
            path:'home',
            component:HomeComponent 
        },
        {
            path:'about',
            component:AboutComponent
        },
        // {path:'about/:id',component:AboutComponent },
        {
            // path:'contact',
            // component:ContactComponent, 
            path:'product',
            component:ProdcutServiceComponent, 
            canActivate:[AppGuardService]
            //,
            //    children:[
            //      {path:'product',component:ProdcutFormComponent, canActivate:[AppGuardService]}
            //    ] 
        },
        {
            path:"",
            redirectTo:"home",
            //redirectTo:"user",
            pathMatch:"full"
        },
        {
            path:"error",
            component:ErrorComponent
        }

];

//register the route table for Route of the current Angular App.
//when routing is proided to "Imports" of NG Module, 
//this will load RouterModule with Route Table
export const routing : ModuleWithProviders = RouterModule.forRoot(routes); 



