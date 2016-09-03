import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';


import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

interface BroadcastEvent {
  key: any;
  data?: any;
}

@Injectable()
export class NotifOptionsService {

public check = new Observable( observer => {

});

private _eventBus: Subject<BroadcastEvent>;

  constructor() {
    this._eventBus = new Subject<BroadcastEvent>();
    
/*    setInterval( ()=> {
      console.log('setimeout ...');
      this.broadcast('MyEvent', 'some message');
    },3000);*/

  }

  broadcast(key: any, data?: any) {
    
    this._eventBus.next({key, data});

  };

  on<T>(key: any): Observable<T> {
    return this._eventBus.asObservable()
      .filter(event => event.key === key)
      .map(event => <T>event.data);
  }

    

}
