import { Routes, RouterModule }   from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ArticlesComponent } from './pages/articles';
import { ArticleComponent } from './pages/article';

const appRoutes: Routes = [
  { path: 'articles', component: ArticlesComponent },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'article/ajouter', component: ArticleComponent }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);