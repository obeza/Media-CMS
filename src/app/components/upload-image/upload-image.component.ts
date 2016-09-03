import { Component, OnInit, Input,  } from '@angular/core';

import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';

import { RestService } from './../../services/rest.service';

@Component({
  selector: 'comp-upload-image',
  templateUrl: 'upload-image.component.html',
  styleUrls: ['upload-image.component.css'],
  directives: [FILE_UPLOAD_DIRECTIVES]
})

export class UploadImageComponent implements OnInit {

  urlImages = "http://localhost:8081/images/";
  
  public uploaders = [];
  public images = [];

  @Input() type;
  @Input() id;

  constructor(
    private _rest:RestService
    
  ) {
   }

  ngOnInit() {
    let urlApi = 'http://localhost:8081/upload/upload/';
    
    let upload1 = new FileUploader({
      url: urlApi + 'poster/' + this.id ,
      authToken: 'dfgdfgdfgdfggd',
      etat:true
    });

    let upload2 = new FileUploader({
      url: urlApi + 'back/' + this.id ,
      authToken: 'dfgdfgdfgdfggd',
      etat:true
    });

    this.uploaders.push( upload1, upload2 );

      this.images = [ { 
        url: this.urlImages + 'poster-' + this.id + '.jpg',
        etat:true,
        type:'poster'
      },
      { 
        url: this.urlImages + 'back-' + this.id + '.jpg',
        etat:true,
        type:'back'
      }
      ];


/*    this.uploader[0].onBuildItemForm = function(fileItem, form){ 
      form.append('type', 'poster'); 
      return {fileItem, form}; 
      //this.uploader[0].queue[0].upload(); 
    }

    this.uploader[1].onBuildItemForm = function(fileItem, form){ 
      form.append('type', 'back'); 
      return {fileItem, form}; 
      //this.uploader[0].queue[0].upload(); 
    }*/


    this.uploaders[0].onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(response, status);
      this.images[0].etat = true;
    };

    this.uploaders[1].onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(response, status);
      this.images[1].etat = true;
    };

}

  errorHandler(event, index) {
    console.debug("image -> " + event.type + ' ' + index);
    this.images[index].etat = false;
  }

  remove(index){
    let urlImage = this.images[index].type + '-' + this.id + '.jpg';
    this._rest.get( 'remove', urlImage ).subscribe( (res)=>{
      console.log('remove : ' + res);
      this.images[index].etat = false;
    });
  }

}
