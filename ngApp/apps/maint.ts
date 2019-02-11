//1.Import Angular Module
import { NgModule  } from "@angular/core";
//2.Import Al Standered Modules
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic  } from "@angular/platform-browser-dynamic";
//3.Import All Components.
import { SimpleComponent  } from "./components/simplecomponent/app.simple.component";
//4.Import All Services.
//------------------Currently Not Any------------------------------

@NgModule({
imports:[BrowserModule],
declarations:[SimpleComponent],
//providers:[],
bootstrap:[SimpleComponent]
})
export class AppModule{

}
//4. Making the AppModule as Bootstrap
platformBrowserDynamic().bootstrapModule(AppModule);