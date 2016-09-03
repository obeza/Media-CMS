import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from './../../services/rest.service';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-article',
  templateUrl: 'article.component.html',
  styleUrls: ['article.component.css'],
  providers:[NotificationsService]
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

  public subRoute = "Ajouter";
  public sub = null
  checkAjouter = false;

  public voirVideo = false;
  public youtubeUrl = "https://www.youtube.com/embed/";
  public youtubeUrlComplet = null;

  constructor(
    private _route:ActivatedRoute,
    private _rest:RestService,
    private _notif: NotificationsService
  ) {}

  ngOnInit() {
    let id = this._route.snapshot.params['id'];
    this.article._id = id;
    if ( id !== "ajouter" ){
      this.subRoute = "Modifier";
      this.chargerArticle(id);
      this.checkAjouter = true;
    } else {
      this.article._id = null;
      this.subRoute = "Ajouter";
    }
  }

  chargerArticle(id){
    this._rest.get('article', id).subscribe( (res)=>{
      this.article = res;
    })
  }

  onSubmit(){
    switch(this.subRoute){
      case "Ajouter":
      console.log('ajouter ', this.article);
        this._rest.post('article', this.article)
          .then( (res) => {
            console.log('res',res);
            if ( res.code == 'ok'){
              this.article._id = res.id;
              this._notif.success( 'Information',"l'article a été ajouté avec succès.");
              this.subRoute = "Modifier";
              this.article._id = res.id;
              console.log(this.article._id);
              this.checkAjouter = true;
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
  
}
