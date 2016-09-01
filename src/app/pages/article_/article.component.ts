import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from './../../services/rest.service';
import { NotificationsService } from 'angular2-notifications';

import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';

@Component({
  selector: 'app-article',
  templateUrl: 'article.component.html',
  styleUrls: ['article.component.css'],
  providers:[NotificationsService],
  directives: [FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class ArticleComponent implements OnInit {

  public article = {
    _id:null,
    titre : null,
    rubrique : "cinema",
    contenu : null,
    adulte: false,
    youtubeId:null,
    publish: false,
  }

  public uploader:FileUploader;
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  uploadFile: any;
  options: Object = {
    url: 'http://localhost:8081/upload/upload',
    action: "hello"
  };

  public subRoute = "Ajouter";
  public sub = null

  public voirVideo = false;
  public youtubeUrl = "https://www.youtube.com/embed/";
  public youtubeUrlComplet = null;

  constructor(
    private _route:ActivatedRoute,
    private _rest:RestService,
    private _notif: NotificationsService
  ) { 
    new FileUploader({url: 'http://localhost:8081/upload/upload'});
  }

  ngOnInit() {
    let id = this._route.snapshot.params['id'];
    this.article._id = id;
    if ( id !== "ajouter" ){
      this.subRoute = "Modifier";
      this.chargerArticle(id);
    }
  }

  chargerArticle(id){
    this._rest.get('article', id).subscribe( (res)=>{
      console.log(res);
      this.article = res;
    })
  }

  checkAjouter(){
    if (this.article._id == "ajouter"){
      return true;
    } else {
      return false;
    }
  }

  onSubmit(){
    //console.log( "form", this.article);
    switch(this.subRoute){
      case "Ajouter":
        this._rest.post('article', this.article)
          .then( (res) => {
            console.log('res',res);
            if ( res.code == 'ok'){
              this.article._id = res.id;
              this._notif.success( 'Information',"l'article a été ajouté avec succès.");
            }
            
          })
      break;
      case "Modifier":
        this._rest.put('article', this.article)
          .then( (res) => {
            console.log('res',res);
            this._notif.success( 'Information',"l'article a été modifiée avec succès.");                   
          })
      break;
    }

  }

  ouvrirVideo(status){
    this.voirVideo = status;
    
  }

  fermer(){
    this.voirVideo = false;
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }



}
