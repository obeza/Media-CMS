import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { routing } from './app.routing';
import { HttpModule } from '@angular/http';
import { RestService } from './services/rest.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotifOptionsService } from './services/notif-options.service';

import { ArticlesComponent } from './pages/articles/articles.component';
import { ArticleComponent } from './pages/article/article.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbargaucheComponent } from './components/navbargauche/navbargauche.component';
import { CentralComponent } from './components/central/central.component';
import { LecteurvideoComponent } from './components/lecteurvideo/lecteurvideo.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    ArticleComponent,
    LoginComponent,
    NavbargaucheComponent,
    CentralComponent,
    LecteurvideoComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    routing,
    HttpModule,
    SimpleNotificationsModule
  ],
  providers: [RestService, NotifOptionsService],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
