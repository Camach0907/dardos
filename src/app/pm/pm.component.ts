import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

export interface Throw {
  play : number;
  currentScore: number;
  total: number;
  darts : Array<number>;
}

@Component({
  selector: 'app-pm',
  templateUrl: './pm.component.html',
  styleUrls: ['./pm.component.scss']
})
export class PmComponent implements OnInit {

  // VARIÁVEIS ---------------------------------------

  //Warning das rondas
  public ShowWarning : boolean = false;

  //Nr de rondas
  public round : number = 0;
  public roundCounter : number = 1;

  //Agarra a opção das rondas
  public optRound : any;

  //Variavel que indica qual o jogador a jogar
  public playerId : number = 0;
  public showPlayerId : number = 1;
  public showPlayerPlay : number = 1;

  //variavel para mostrar as tabelas
  public show : boolean = false;

  //Inicialização da interface do jogador
  throw: Throw[] = [];

  //Variavel que vai comparar os score no fim das rondas
  public getScore : Array<number> = [];

  //Variaveis que agarram os singles, doubles e triples
  private t : any;
  private d : any;
  private s : any;

  //Variavel que decide se é para remover os dardos ou não
  public antiClean : boolean = false;

  //Vars que agarram o modal popup
  public modal : any;
  public span : any;

  //---------------------------------------------------------------------
  //---------------------------------------------------------------------

  //Click da escolha da pontuação
  Score({event}: { event: any }){

    //Agarra a opção das rondas
    this.optRound = document.getElementById("inputGroupSelect04");
    this.round = this.optRound.options[this.optRound.selectedIndex].text;

    //Verifica se escolheu o Nr de Rondas e caso não tenha escolhido, apresenta um Warning
    if(this.round > 0)
    {
      //Cria os arrays dos jogadores
      for(let i = 0; i<this.playerCount;i++){
        this.throw.push({
          play: 0,
          currentScore: 0,
          total: 0,
          darts : [0,0,0]
        });
      }
      //Esconde o Warning e começa o jogo.
      this.ShowWarning = false;
      this.show = true;

    } else {this.ShowWarning = true;}

  }

  //Click no alvo
  toggle({event}: { event: any }) {

    if(this.roundCounter <= this.round){
      this.antiClean = false;
      //Se for Bull
      if(event.target.id == 'Bull') {
        this.Bull();
        //Se for Outer
      } else if(event.target.id == 'Outer') {
        this.Outer();
        //Se for single
      } else if(event.target.id[0] == 's') {
        this.Single(event);
        //Se for double
      } else if(event.target.id[0] == 'd') {
        this.Double(event);
        //Se for triple
      } else if(event.target.id[0] == 't') {
        this.Triple(event);
      //Se for Miss ou casa fechada
    } else if (event.target.id[0] == '0'){
      this.throw[this.playerId].play ++;
      this.showPlayerPlay++;
    }

      //Se estivermos na ultima jogada do ultimo jogador --> voltamos ao primeiro jogador e ao primeiro dardo e Soma-se a ronda.
      if(this.throw[this.playerCount-1].play == 3 && !this.antiClean) { this.removeDarts2();}
      //Se estivermos na ultima jogada dos restantes jogadores, passa ao jogador seguinte e grava-se o score para quando rebenta
      else if(this.throw[this.playerId].play == 3 && !this.antiClean) { this.removeDarts(); }
    }
  }

  constructor(private route: ActivatedRoute) {

  }

  //Variavel que agarra o numero de jogadores escolhidos
  public playerCount : number = 0;

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          this.playerCount = params['players'];
        }
      );
  }

  // funções para calculo das jogadas ---------------------------------------------------------------
  public Bull() : void{

    //Score
    this.throw[this.playerId].currentScore = this.throw[this.playerId].currentScore + 50;
    this.throw[this.playerId].darts[this.throw[this.playerId].play] = 50;
    this.throw[this.playerId].total = this.throw[this.playerId].total + this.throw[this.playerId].darts[this.throw[this.playerId].play];

    //Próximo Dardo
    this.throw[this.playerId].play ++;
    this.showPlayerPlay++;

  }
  public Outer() : void{

    //Score
    this.throw[this.playerId].currentScore = this.throw[this.playerId].currentScore + 25;
    this.throw[this.playerId].darts[this.throw[this.playerId].play] = 25;
    this.throw[this.playerId].total = this.throw[this.playerId].total + this.throw[this.playerId].darts[this.throw[this.playerId].play];

    //Próximo Dardo
    this.throw[this.playerId].play ++;
    this.showPlayerPlay++;

  }
  public Single(event: { target: { id: string; }; }) : void{
    for (this.s = 0; this.s <= 20; this.s++) {
      if (event.target.id == 's' + this.s) {

        //Score
        this.throw[this.playerId].currentScore = this.throw[this.playerId].currentScore + this.s;
        this.throw[this.playerId].darts[this.throw[this.playerId].play] = this.s;
        this.throw[this.playerId].total = this.throw[this.playerId].total + this.throw[this.playerId].darts[this.throw[this.playerId].play];

        //Próximo Dardo
        this.throw[this.playerId].play ++;
        this.showPlayerPlay++;

      }
    }
  }
  public Double(event: { target: { id: string; }; }):void{
    for (this.d = 0; this.d <= 20; this.d++) {
      if (event.target.id == 'd' + this.d) {

        //Score
        this.throw[this.playerId].currentScore = this.throw[this.playerId].currentScore + (this.d * 2);
        this.throw[this.playerId].darts[this.throw[this.playerId].play] = this.d * 2;
        this.throw[this.playerId].total = this.throw[this.playerId].total + this.throw[this.playerId].darts[this.throw[this.playerId].play];

        //Próximo Dardo
        this.throw[this.playerId].play ++;
        this.showPlayerPlay++;

      }
    }
  }
  public Triple (event: { target: { id: string; }; }): void {
    for (this.t = 0; this.t <= 20; this.t++) {
      if (event.target.id == 't' + this.t) {

        //Score
        this.throw[this.playerId].currentScore = this.throw[this.playerId].currentScore + (this.t * 3);
        this.throw[this.playerId].darts[this.throw[this.playerId].play] = this.t * 3;
        this.throw[this.playerId].total = this.throw[this.playerId].total + this.throw[this.playerId].darts[this.throw[this.playerId].play];

        //Próximo Dardo
        this.throw[this.playerId].play ++;
        this.showPlayerPlay++;

      }
    }
  }

// ---------------------------------------------------------------------------------------------------

  //Remover os dardos
  public removeDarts(){

    this.showPlayerPlay = 3;
    this.throw[this.playerId].play = 2;

    this.modal = document.getElementById("myModal");
    console.log(this.modal);

    this.modal.style.display = "block";

    this.span = document.getElementsByClassName("close")[0];
    this.span.onclick = () => {
      this.ClearBoard();
      this.modal.style.display = "none";
    }

  }
  //O mesmo de cima, mas para o último jogador
  public removeDarts2(){

    this.showPlayerPlay = 3;
    this.throw[this.playerId].play = 2;

    this.modal = document.getElementById("myModal");
    console.log(this.modal);

    this.modal.style.display = "block";

    this.span = document.getElementsByClassName("close")[0];
    this.span.onclick = () => {
      this.ClearBoard2();
      this.modal.style.display = "none";
    }

  }
  //Limpa a board do jogador em questão, atualiza o player, a jogada e grava o score para quando rebenta
  public ClearBoard(){


    //Limpa
    this.throw[this.playerId].darts[0] = 0;
    this.throw[this.playerId].darts[1] = 0;
    this.throw[this.playerId].darts[2] = 0;
    this.throw[this.playerId].total = 0;
    this.throw[this.playerId].play = 0;

    //Atualiza
    this.throw[this.playerId].play = 0;
    this.showPlayerPlay = 1;
    this.playerId ++;
    this.showPlayerId ++;

  }
  //O mesmo de cima mas para o último jogador
  public ClearBoard2(){

    //Se estivermos na última ronda e for o último player a jogar
    if(this.roundCounter == this.round){this.Reset();} else {

      //Limpa
      this.throw[this.playerCount-1].darts[0] = 0;
      this.throw[this.playerCount-1].darts[1] = 0;
      this.throw[this.playerCount-1].darts[2] = 0;
      this.throw[this.playerCount-1].total = 0;
      this.throw[this.playerCount-1].play = 0;

      //Atualiza
      this.playerId = 0;
      this.showPlayerId = 1;
      this.showPlayerPlay = 1;
      this.throw[this.playerCount-1].play = 0;
    }

    this.roundCounter ++;

  }
  //Reset
  public Reset(){

    //Gravas os scores de todos os jogadores num array
    for(let i = 0;i<this.playerCount;i ++)
    {
      this.getScore[i] = this.throw[i].currentScore;
    }

    //Checka qual o maior score e grava numa var Temporária
    let temp = 0;
    this.getScore.forEach((element) => {
      if (temp < element) {
        temp = element;
      }
    });

    //Checka qual jogador tem o maior score
    for(let i = 0;i<this.playerCount;i ++)
    {
      //Quando encontrar, executa a mensagem de fim de jogo
      if(this.throw[i].currentScore == temp){

        if (confirm('Acabaram as rondas!! O vencedor é o Jogador '+ (i+1) +'. \n\n Ok -> jogar novamente || Cancel -> voltar ao início.')) {

          this.playerId = 0;
          this.showPlayerPlay = 1;
          this.showPlayerId = 1;
          this.roundCounter = 0;

          for (let i = 0; i < this.playerCount; i++) {
            this.throw[i].darts[0] = 0;
            this.throw[i].darts[1] = 0;
            this.throw[i].darts[2] = 0;
            this.throw[i].play = 0;
            this.throw[i].total = 0;
          }

        } else {
          window.location.href = "/";
        }

      }
    }
  }

}
