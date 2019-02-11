import { Injectable, EventEmitter } from "@angular/core";
//import { Subject } from 'rxjs';
@Injectable()
export class UserAuthService {
    ChangeRegisterLink:EventEmitter<Boolean>;
    removeLink:boolean; 
   //   execChange: Subject<any> = new Subject<any>();
   //   execUserToken: Subject<any> = new Subject<any>();
     
      constructor() {
         this.ChangeRegisterLink = new EventEmitter<Boolean>();
      }
     
   //   OnExportUserAuth(exportAuthentication: boolean) {
   //      this.execChange.next(exportAuthentication);
   //   }
   //   OnExportUserToken(userToken:any){
   //      this.execUserToken.next(userToken);
   //   }
   setRemoveLink(value:boolean){
      this.removeLink = value;
   }
   OnLoginSuccess():void{
      this.ChangeRegisterLink.emit(this.removeLink);
   }
}