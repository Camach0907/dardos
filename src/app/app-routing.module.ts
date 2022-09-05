import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AlvoComponent} from "./alvo/alvo.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {HomeComponent} from "./home/home.component";
import {PdComponent} from "./pd/pd.component";
import {PmComponent} from "./pm/pm.component";
import {CricketComponent} from "./cricket/cricket.component";
import {PagenotfoundComponent} from "./pagenotfound/pagenotfound.component";

const routes: Routes = [

  {
    path: 'alvo',
    component: AlvoComponent
  },

  {
    path: 'navbar',
    component: NavbarComponent
  },

  {
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'pd',
    component: PdComponent
  },

  {
    path: 'cricket',
    component: CricketComponent
  },

  {
    path: 'pm',
    component: PmComponent
  },

  {
    path: '404',
    component: PagenotfoundComponent
  },

  { path: '',   redirectTo: '/home', pathMatch: 'full' }, // redirect to `home`

  { path: '**', component: PagenotfoundComponent }, // Wildcard route for a 404 page

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
