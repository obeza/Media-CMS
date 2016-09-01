import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  constructor( private _router:Router) { }

  deconnexion(){
    localStorage.removeItem("pastequeInfos");

    this._router.navigate(['/login']);
  }


}
