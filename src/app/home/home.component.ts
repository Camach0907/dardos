import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public Njogadores : number = 1;

  public ShowWarning : boolean = false;
  public ShowWarning2 : boolean = true;

  adiciona({event}: { event: any }){
  this.Njogadores++;
  this.ShowWarning = false;

    this.Njogadores > 4 ? this.ShowWarning2 = true : this.ShowWarning2 = false;
  }

  retira({event}: { event: any }){
    if(this.Njogadores > 1) { this.Njogadores--;} else {this.ShowWarning = true;}

    this.Njogadores >= 2 && this.Njogadores <= 4 ? this.ShowWarning2 = false : this.ShowWarning2 = true;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
