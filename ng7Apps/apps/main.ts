// 1. Angular module file
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";

//1. import all standard modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//2. Import all components and directive
//import { SimpleComponent } from './components/simplecomponent/app.simple.component';
import { ProdcutFormComponent } from "./productformcomponent/app.productform.component";
import { SampleServiceComponent } from './components/sampleservicecomponent/app.sampleservice.component';
import { ProdcutServiceComponent } from './productservicecomponent/app.productservice.component';
//3. Import all services
import { SampleService } from "./services/app.sample.service";
import { ProductService } from './services/app.products.service';
import { DemoCommunicationParentComponent } from './democommunicationparent/app.democommunicationparent.component';
import { DemoCommunicationChildComponent } from './democommunicationchild/app.democommunicationchild.component';
import { CommunicationService } from './services/app.communication.service';
import { HomeComponent } from './components/routescomponents/app.home.component';
import { ContactComponent } from './components/routescomponents/app.contact.component';
import { AboutComponent } from './components/routescomponents/app.about.component';
import { routing } from "./../apps/components/routescomponents/app.route.table";
import { MainComponent } from './components/routescomponents/app.main.component';
import { AppGuardService } from './services/app.test.guard.service';
import { ErrorComponent } from './components/routescomponents/app.error.component';
import { UserAuthComponent } from './useauthcomponent/app.user.auth.component';
import { RegisterUserComponent } from './registeruser/app.registeruser.component';
import { UserAuthService } from './services/app.userauth.service';
import { LogOffComponent } from './components/routescomponents/app.logoff.component';
import { DataService } from './services/app.data.service';

@NgModule({
    imports : [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing
    ],
    declarations : [
        SampleServiceComponent,
        ProdcutFormComponent,
        ProdcutServiceComponent,
        DemoCommunicationParentComponent,
        DemoCommunicationChildComponent,
        HomeComponent,ContactComponent,AboutComponent,
        MainComponent,ErrorComponent,
        UserAuthComponent,RegisterUserComponent,LogOffComponent
    ],
    providers:[CommunicationService,
        SampleService,ProductService,AppGuardService,DataService],
    bootstrap : [MainComponent] //UserAuthComponent   //,DemoCommunicationParentComponent,DemoCommunicationChildComponent
})
export class AppModule{}

//Making app module as bootstrap module 
platformBrowserDynamic().bootstrapModule(AppModule);