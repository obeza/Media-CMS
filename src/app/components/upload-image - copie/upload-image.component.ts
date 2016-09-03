import { Component, OnInit, Input, NgZone } from '@angular/core';

import {UPLOAD_DIRECTIVES} from 'ng2-uploader/ng2-uploader';
import { RestService } from './../../services/rest.service';

@Component({
  selector: 'comp-upload-image',
  templateUrl: 'upload-image.component.html',
  styleUrls: ['upload-image.component.css'],
  directives: [UPLOAD_DIRECTIVES],
})
export class UploadImageComponent implements OnInit {

  urlImages = "http://localhost:8081/images/";
  uploadFile: any;
  zones = [ ];
  uploadProgress: number;
  uploadResponse: Object;

  optionUpload = [];

  @Input() type;
  @Input() id;

  constructor(
    private _rest:RestService
  ) { }

  ngOnInit() {

    this.optionUpload.push( {
      fieldName: 'poster',
      url: 'http://localhost:8081/upload/upload/' + this.id,
      imageUrl: this.urlImages + 'poster-' + this.id + '.jpg',
      etat:true    
    },{
      fieldName: 'back',
      url: 'http://localhost:8081/upload/upload/' + this.id,
      imageUrl: this.urlImages + 'back-' + this.id + '.jpg',
      etat:true
    });

    let urlUp = 'http://localhost:8081/upload/upload/' + this.id;
    this.uploadProgress = 0;
    this.uploadResponse = {};
    this.zones.push( new NgZone({ enableLongStackTrace: false }) );
    this.zones.push( new NgZone({ enableLongStackTrace: false }) );
  }

  getUrlimage(type){
    console.log('url image ' + this.urlImages + type + '-' + this.id + '.jpg');
    return this.urlImages + type + '-' + this.id + '.jpg';
  };

  optionUploadSelect(index){
    return this.optionUpload[index];
  }

  errorHandler(event, image, index) {
    console.debug("image -> " + event.type + ' ' + image);
    this.optionUpload[index].etat = false;
  }

  handleUpload(data, index): void {
    console.log('optionUpload ', this.optionUpload[index]);
    this.uploadFile = data;
    console.log('this.uploadFile' , this.uploadFile );
    this.zones[index].run(() => {
      this.uploadProgress = data.progress.percent;
    });
    let resp = data.response;
    
    if (resp) {
      resp = JSON.parse(resp);
      this.uploadResponse = resp;
      this.uploadFile = null;
      console.log('response server', resp);
      console.log('index', index);
      this.optionUpload[index].etat = true;
      // on genere un cb aléatoire pour donner un nouveau lien à l'image
      let random = (new Date()).toString();
      this.optionUpload[index].imageUrl = this.optionUpload[index].imageUrl + '?cb=' + random;
    }
  }

  remove(index, type){
    let urlImage = type + '-' + this.id + '.jpg';
    this._rest.get( 'remove', urlImage ).subscribe( (res)=>{
      console.log('remove : ' + res);
      this.optionUpload[index].etat = false;
    });
  }

}
