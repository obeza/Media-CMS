import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from './../../services/rest.service';
import { NotificationsService } from 'angular2-notifications';

import {UPLOAD_DIRECTIVES} from 'ng2-uploader/ng2-uploader';

@Component({
  selector: 'app-article',
  templateUrl: 'article.component.html',
  styleUrls: ['article.component.css'],
  providers:[NotificationsService],
  directives: [UPLOAD_DIRECTIVES],
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

  uploadProgress: number;
  uploadResponse: Object;
  zone: NgZone;
  uploadFile: any;
/*  optionsPoster:Object;
  optionsFond:Object;*/
/*  options: Object = {
    url: 'http://localhost:8081/upload/upload'
  };*/

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
    this.uploadProgress = 0;
    this.uploadResponse = {};
    this.zone = new NgZone({ enableLongStackTrace: false });

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

  optionsUpl(option){
    let url = 'http://localhost:8081/upload/upload/' + this.article._id;
    let opt = {
      url: url,
      fieldName: option  
    }
    return opt;
  }

  handleUpload(data): void {
    this.uploadFile = data;
    this.zone.run(() => {
      this.uploadProgress = data.progress.percent;
    });
    let resp = data.response;
    if (resp) {
      resp = JSON.parse(resp);
      this.uploadResponse = resp;
      this.uploadFile = null;
      console.log('response server', resp);
    }
  }

}
