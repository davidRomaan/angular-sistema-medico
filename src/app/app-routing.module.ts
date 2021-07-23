//moduloes
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { PagesRoutingModule } from './pages/pages.routing';

import { NotpagefoundComponent } from './notpagefound/notpagefound.component';
import { AuthRoutingModule } from './auth/auth.routing';



//luego de iniciar sesion, me va a redirigir a PagesComponent donde esta el header, footer, breadcrumbs etc
// y dentro de este tenemos el <router-outlet> que es donde se mostraran las paginas hijas, en este caso dashboard, progress, grafica1
//las paginas publicas seran login, register
const routes: Routes = [

  //path: '/dashboard' esta en PagesRouting
  //path: '/progress' esta en PagesRouting
  //path: '/grafica1' esta en PagesRouting
  //path: '/auth' esta en AuthRouting
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NotpagefoundComponent},
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
