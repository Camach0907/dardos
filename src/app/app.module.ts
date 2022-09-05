import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlvoComponent } from './alvo/alvo.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PdComponent } from './pd/pd.component';
import { CricketComponent } from './cricket/cricket.component';
import { PmComponent } from './pm/pm.component';
import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    AlvoComponent,
    NavbarComponent,
    HomeComponent,
    PdComponent,
    CricketComponent,
    PmComponent,
    PagenotfoundComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
