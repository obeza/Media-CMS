import { Component, OnInit } from '@angular/core';
import { RestService } from './../../services/rest.service';

import { NotifOptionsService } from './../../services/notif-options.service';

import { NavbargaucheComponent } from './../../components/navbargauche/navbargauche.component';

@Component({
  selector: 'app-articles',
  templateUrl: 'articles.component.html',
  styleUrls: ['articles.component.css'],
  providers:[RestService, NotifOptionsService, NavbargaucheComponent]
})
export class ArticlesComponent implements OnInit {

  public articles = [];

  constructor(
    private _rest:RestService,
    private _notif:NotifOptionsService,
    private _test:NavbargaucheComponent
  ) { }

  ngOnInit() {
    this.loadArticles();
    //this.registerStringBroadcast();
    this._test.test();
  }

  check(){
    this._notif.check.subscribe( res => {
      console.log( 'check notif : ' + res);
    })
  }

  registerStringBroadcast() {
    this._notif.on<string>('MyEvent')
      .subscribe(message => {
        console.log('broadcast from articles ....');
      });
  }
  
  loadArticles(){
   this._rest.getList('articles').subscribe( (res) =>{
      this.articles = res.articles;
      console.log('res ', res);
    });
  }

}
