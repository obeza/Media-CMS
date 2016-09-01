import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'comp-navbargauche',
  templateUrl: 'navbargauche.component.html',
  styleUrls: ['navbargauche.component.css']
})
export class NavbargaucheComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public test(){
    console.log('test');
  }

}
