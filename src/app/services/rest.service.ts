import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map' ;
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RestService {

  private apiLien = "http://localhost:8081/api/";

  constructor( public http:Http) {
    //this.http=http;
  }

  getList( dossier ){
    let url = this.apiLien + dossier ;
    return  this.http.get( url ).map( res => res.json() );
  }

  get(dossier, id){
    let url = this.apiLien + dossier + '/' + id ;
    return  this.http.get( url )
      .map( res => res.json() );
  }

  post(dossier, data){
    let headers = new Headers({'Content-Type': 'application/json'});
    let url = this.apiLien + dossier ;

    return this.http
             .post( url , JSON.stringify(data), {headers: headers})
             .toPromise()
             .then(res => res.json())
             .catch(this.handleError);
  }

  put(dossier, data){
    let headers = new Headers({'Content-Type': 'application/json'});
    let url = this.apiLien + dossier ;

    return this.http
             .put( url, JSON.stringify(data), {headers: headers})
             .toPromise()
             .then(res => res.json())
             .catch(this.handleError);

  }

  private handleError(error: any){
    console.error('An error occurred', error);
    //alert('ok ' + JSON.stringify(error));
  }
  
}
