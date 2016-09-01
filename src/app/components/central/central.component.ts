import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'comp-central',
  templateUrl: 'central.component.html',
  styleUrls: ['central.component.css']
})
export class CentralComponent implements OnInit {

  public options = {
    position: ["top", "right"],
    timeOut: 5000,
    lastOnBottom: true,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 10
}

  constructor() { }

  ngOnInit() {
  }

}
