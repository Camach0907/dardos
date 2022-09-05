import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

export interface Throw {
  play : number;
  currentScore: number;
  darts : Array<number>;

  casas :  {
          vinte : number,
          dezanove : number,
          dezoito : number,
          dezassete : number,
          dezasseis : number,
          quinze : number,
          Bull : number
      }
}

@Component({
  selector: 'app-cricket',
  templateUrl: './cricket.component.html',
  styleUrls: ['./cricket.component.scss']
})

export class CricketComponent implements OnInit {

// VARIÁVEIS -----------------------------------------------------------------------------------------------------------
  //Inicialização da ‘interface’ do jogador
  throw: Throw[] = [];
  //Warning das rondas
  public ShowWarning : boolean = false;
  //variavel para mostrar as tabelas
  public show : boolean = false;
  //Nr de rondas
  public round : number = 0;
  public roundCounter : number = 1;
  //Agarra a opção das rondas
  public optRound : any;
  //Variavel que indica qual o jogador a jogar
  public playerId : number = 0;
  public showPlayerId : number = 1;
  public showPlayerPlay : number = 1;
  //Nr de players
  public playerCount : number = 0;
  //Variavel que vai comparar os scores no fim das rondas
  public getScore : Array<number> = [];
  //Vars para agarrar a div em questão e criar a img
  public mark : any;
  public element : any;
  public closeElement : any;
  //Var que bloqueia o ecrã
  public removedarts : boolean = false;
  //Casas abertas ou fechadas
  public bull : boolean = false;
  public vinte : boolean = false;
  public dezanove : boolean = false;
  public dezoito : boolean = false;
  public dezassete : boolean = false;
  public dezasseis : boolean = false;
  public quinze : boolean = false;
  //Vars que agarram o modal popup
  public modal : any;
  public span : any;
// FIM VARIÁVEIS -------------------------------------------------------------------------------------------------------

  //Click do botão jogar. Escolhe as rondas.
  rounds() {
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
          darts : [0,0,0],

          casas : {
            vinte : 0,
            dezanove : 0,
            dezoito : 0,
            dezassete : 0,
            dezasseis : 0,
            quinze : 0,
            Bull : 0
          }
        });
      }
      //Esconde o Warning e começa o jogo.
      this.ShowWarning = false;
      this.show = true;
    } else {this.ShowWarning = true;}
  }

  //Click no Alvo
  toggle({event}: { event: any }) {

    if(this.roundCounter <= this.round){
        //Se for Bull
      if(event.target.id == 'Bull') { this.Bull();
        //Se for Outer
      } else if(event.target.id == 'Outer'){ this.Outer();
        //Se for single
      } else if(event.target.id[0] == 's') { this.Single(event);
        //Se for double
      } else if(event.target.id[0] == 'd') { this.Double(event);
        //Se for triple
      } else if(event.target.id[0] == 't') { this.Triple(event);
        //Se for Miss ou casa fechada
      } else if (event.target.id[0] == '0'){
        this.throw[this.playerId].play ++;
        this.showPlayerPlay++;
      }
      //Se estivermos na última jogada do ultimo jogador ----> voltamos ao primeiro jogador e ao primeiro dardo e Soma-se a ronda.
      if(this.throw[this.playerCount-1].play == 3) { this.removeDarts2(); }
      //Se estivermos na última jogada dos restantes jogadores, passa ao jogador seguinte
      else if(this.throw[this.playerId].play == 3) { this.removeDarts(); }
    }
  }

//----------------------------------------------------------------------------------------------------------------------
  constructor(private route: ActivatedRoute) {}
//----------------------------------------------------------------------------------------------------------------------

  //Assim que o componente inicia, agarra o nr de jogadores e grava numa Var
  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
          this.playerCount = params['players'];
        }
      );

  }

// Funções para calculo das jogadas ------------------------------------------------------------------------------------
  public Bull() : void{

    //Agarra a img em questão
    this.element = 'cell8' + this.playerId;
    this.mark = document.getElementById(this.element);

    this.throw[this.playerId].darts[this.throw[this.playerId].play] = 50;

    if(this.throw[this.playerId].casas['Bull'] == 0)
    {
      this.mark.src = './assets/img/mark2.svg'
      this.throw[this.playerId].casas['Bull'] = 2;
    }
    else if (this.throw[this.playerId].casas['Bull'] == 1)
    {
        this.mark.src = './assets/img/mark3.svg'
        this.throw[this.playerId].casas['Bull'] = 3;

        //Se for a ultima casa a ser fechada
        this.CheckBull();
        if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}

    }
    else if (this.throw[this.playerId].casas['Bull'] == 2)
    {
      this.mark.src = './assets/img/mark3.svg';
      this.throw[this.playerId].casas['Bull'] = 3;

      //Checka se as casas estão fechadas. Se não estiverem, soma pontos. ----- Caso estejam fechadas, checka se foi a última casa a ser fechada e termina o jogo.
      if(!this.CheckBull()) {this.throw[this.playerId].currentScore += 25} else {if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}}
    }
    else if (this.throw[this.playerId].casas['Bull'] == 3) { if(!this.CheckBull()) {this.throw[this.playerId].currentScore += 50} }

    //Próximo Dardo
    this.throw[this.playerId].play ++;
    this.showPlayerPlay++;
  }
  public Outer() : void{

    //Agarra a img em questão
    this.element = 'cell8' + this.playerId;
    this.mark = document.getElementById(this.element);

    this.throw[this.playerId].darts[this.throw[this.playerId].play] = 25;

    if(this.throw[this.playerId].casas['Bull'] == 0)
    {

      this.mark.src = './assets/img/mark1.svg'
      this.throw[this.playerId].casas['Bull'] = 1;

    }
    else if (this.throw[this.playerId].casas['Bull'] == 1)
    {

      this.mark.src = './assets/img/mark2.svg'
      this.throw[this.playerId].casas['Bull'] = 2;

    }
    else if (this.throw[this.playerId].casas['Bull'] == 2)
    {

      this.mark.src = './assets/img/mark3.svg'
      this.throw[this.playerId].casas['Bull'] = 3;

      //Se for a ultima casa a ser fechada, termina o jogo
      this.CheckBull();
      if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}

    }
    else if (this.throw[this.playerId].casas['Bull'] == 3) { if(!this.CheckBull()) {this.throw[this.playerId].currentScore += 25}}

    //Próximo Dardo
    this.throw[this.playerId].play ++;
    this.showPlayerPlay++;

  }
  public Single(event: { target: { id: string; }; }) : void{

    if (event.target.id == 's20') {
      //Agarra a img em questão
      this.element = 'cell2' + this.playerId;
      this.mark = document.getElementById(this.element);

      this.throw[this.playerId].darts[this.throw[this.playerId].play] = 20;

      if(this.throw[this.playerId].casas['vinte'] == 0)
      {
        this.mark.src = './assets/img/mark1.svg'
        this.throw[this.playerId].casas['vinte'] = 1;
      }
      else if (this.throw[this.playerId].casas['vinte'] == 1)
      {
        this.mark.src = './assets/img/mark2.svg';
        this.throw[this.playerId].casas['vinte'] = 2;
      }
      else if (this.throw[this.playerId].casas['vinte'] == 2)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['vinte'] = 3;
        //Se for a ultima casa a ser fechada, termina o jogo
        this.Check20();
        if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}
      }
      else if (this.throw[this.playerId].casas['vinte'] == 3) {if(!this.Check20()) {this.throw[this.playerId].currentScore += 20;}}
      //Próximo Dardo
      this.throw[this.playerId].play ++;
      this.showPlayerPlay++;
    }
    else if (event.target.id == 's19') {

      this.throw[this.playerId].darts[this.throw[this.playerId].play] = 19;
      //Agarra a img em questão
      this.element = 'cell3' + this.playerId;
      this.mark = document.getElementById(this.element);

      if(this.throw[this.playerId].casas['dezanove'] == 0)
      {
        this.mark.src = './assets/img/mark1.svg';
        this.throw[this.playerId].casas['dezanove'] = 1;
      }
      else if (this.throw[this.playerId].casas['dezanove'] == 1)
      {
        this.mark.src = './assets/img/mark2.svg';
        this.throw[this.playerId].casas['dezanove'] = 2;
      }
      else if (this.throw[this.playerId].casas['dezanove'] == 2)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['dezanove'] = 3;

        //Se for a última casa a ser fechada, termina o jogo
        this.Check19();
        if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}

      }
      else if (this.throw[this.playerId].casas['dezanove'] == 3){if(!this.Check19()) {this.throw[this.playerId].currentScore += 19;}}

      //Próximo Dardo
      this.throw[this.playerId].play ++;
      this.showPlayerPlay++;

    }
    else if (event.target.id == 's18') {

      this.throw[this.playerId].darts[this.throw[this.playerId].play] = 18;

      //Agarra a img em questão
      this.element = 'cell4' + this.playerId;
      this.mark = document.getElementById(this.element);

      if(this.throw[this.playerId].casas['dezoito'] == 0)
      {
        this.mark.src = './assets/img/mark1.svg';
        this.throw[this.playerId].casas['dezoito'] = 1;
      }
      else if (this.throw[this.playerId].casas['dezoito'] == 1)
      {
        this.mark.src = './assets/img/mark2.svg';
        this.throw[this.playerId].casas['dezoito'] = 2;
      }
      else if (this.throw[this.playerId].casas['dezoito'] == 2)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['dezoito'] = 3;

        //Se for a ultima casa a ser fechada, termina o jogo
        this.Check18();
        if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}

      }
      else if (this.throw[this.playerId].casas['dezoito'] == 3){if(!this.Check18()) {this.throw[this.playerId].currentScore += 18;}}

      //Próximo Dardo
      this.throw[this.playerId].play ++;
      this.showPlayerPlay++;

    }
    else if (event.target.id == 's17') {

      this.throw[this.playerId].darts[this.throw[this.playerId].play] = 17;

      //Agarra a img em questão
      this.element = 'cell5' + this.playerId;
      this.mark = document.getElementById(this.element);

      if(this.throw[this.playerId].casas['dezassete'] == 0)
      {
        this.mark.src = './assets/img/mark1.svg';
        this.throw[this.playerId].casas['dezassete'] = 1;
      }
      else if (this.throw[this.playerId].casas['dezassete'] == 1)
      {
        this.mark.src = './assets/img/mark2.svg';
        this.throw[this.playerId].casas['dezassete'] = 2;
      }
      else if (this.throw[this.playerId].casas['dezassete'] == 2)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['dezassete'] = 3;

        //Se for a ultima casa a ser fechada, termina o jogo
        this.Check17();
        if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}

      }
      else if (this.throw[this.playerId].casas['dezassete'] == 3) {if(!this.Check17()){this.throw[this.playerId].currentScore += 17;}}

      //Próximo Dardo
      this.throw[this.playerId].play ++;
      this.showPlayerPlay++;

    }
    else if (event.target.id == 's16') {

      this.throw[this.playerId].darts[this.throw[this.playerId].play] = 16;

      //Agarra a img em questão
      this.element = 'cell6' + this.playerId;
      this.mark = document.getElementById(this.element);

      if(this.throw[this.playerId].casas['dezasseis'] == 0)
      {
        this.mark.src = './assets/img/mark1.svg';
        this.throw[this.playerId].casas['dezasseis'] = 1;
      }
      else if (this.throw[this.playerId].casas['dezasseis'] == 1)
      {
        this.mark.src = './assets/img/mark2.svg';
        this.throw[this.playerId].casas['dezasseis'] = 2;
      }
      else if (this.throw[this.playerId].casas['dezasseis'] == 2)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['dezasseis'] = 3;

        //Se for a ultima casa a ser fechada, termina o jogo
        this.Check16();
        if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}

      }
      else if (this.throw[this.playerId].casas['dezasseis'] == 3){if(!this.Check16()) {this.throw[this.playerId].currentScore += 16;}}

      //Próximo Dardo
      this.throw[this.playerId].play ++;
      this.showPlayerPlay++;

    }
    else if (event.target.id == 's15') {

      this.throw[this.playerId].darts[this.throw[this.playerId].play] = 15;

      //Agarra a img em questão
      this.element = 'cell7' + this.playerId;
      this.mark = document.getElementById(this.element);

      if(this.throw[this.playerId].casas['quinze'] == 0)
      {
        this.mark.src = './assets/img/mark1.svg';
        this.throw[this.playerId].casas['quinze'] = 1;
      }
      else if (this.throw[this.playerId].casas['quinze'] == 1)
      {
        this.mark.src = './assets/img/mark2.svg';
        this.throw[this.playerId].casas['quinze'] = 2;
      }
      else if (this.throw[this.playerId].casas['quinze'] == 2)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['quinze'] = 3;

        //Se for a ultima casa a ser fechada, termina o jogo
        this.Check15();
        if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}

      }
      else if (this.throw[this.playerId].casas['quinze'] == 3){if(!this.Check15()) {this.throw[this.playerId].currentScore += 15;}}

      //Próximo Dardo
      this.throw[this.playerId].play ++;
      this.showPlayerPlay++;

    }

  }
  public Double(event: { target: { id: string; }; }):void{

    if (event.target.id == 'd20') {

      //Agarra a img em questão
      this.element = 'cell2' + this.playerId;
      this.mark = document.getElementById(this.element);

      this.throw[this.playerId].darts[this.throw[this.playerId].play] = 40;

      if(this.throw[this.playerId].casas['vinte'] == 0)
      {
        this.mark.src = './assets/img/mark2.svg'
        this.throw[this.playerId].casas['vinte'] = 2;
      }
      else if (this.throw[this.playerId].casas['vinte'] == 1)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['vinte'] = 3;

        //Se for a ultima casa a ser fechada, termina o jogo
        this.Check20();
        if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}

      }
      else if (this.throw[this.playerId].casas['vinte'] == 2)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['vinte'] = 3;
        //Checka se as casas estão fechadas e se não estiverem, soma pontos. ----- Se estiverem, cehcka se foi a última a ser fechada e termina o jogo.
        if(!this.Check20()) {this.throw[this.playerId].currentScore += 20;} else { if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();} }
      }
      else if (this.throw[this.playerId].casas['vinte'] == 3) {if(!this.Check20()) {this.throw[this.playerId].currentScore += 40;}}

      //Próximo Dardo
      this.throw[this.playerId].play ++;
      this.showPlayerPlay++;

    }
    else if (event.target.id == 'd19') {

      this.throw[this.playerId].darts[this.throw[this.playerId].play] = 19;

      //Agarra a img em questão
      this.element = 'cell3' + this.playerId;
      this.mark = document.getElementById(this.element);

      if(this.throw[this.playerId].casas['dezanove'] == 0)
      {
        this.mark.src = './assets/img/mark2.svg';
        this.throw[this.playerId].casas['dezanove'] = 2;
      }
      else if (this.throw[this.playerId].casas['dezanove'] == 1)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['dezanove'] = 3;

        //Se for a ultima casa a ser fechada, termina o jogo
        this.Check19();
        if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}

      }
      else if (this.throw[this.playerId].casas['dezanove'] == 2)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['dezanove'] = 3;
        //Checka se as casas estão fechadas e se não estiverem, soma pontos. ---- Se estiverem, checka se foi a ultima a fechar e termina o jogo.
        if(!this.Check19()) {this.throw[this.playerId].currentScore += 19;} else {if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}}
      }
      else if (this.throw[this.playerId].casas['dezanove'] == 3){if(!this.Check19()) {this.throw[this.playerId].currentScore += 38;}}

      //Próximo Dardo
      this.throw[this.playerId].play ++;
      this.showPlayerPlay++;

    }
    else if (event.target.id == 'd18') {

      this.throw[this.playerId].darts[this.throw[this.playerId].play] = 18;

      //Agarra a img em questão
      this.element = 'cell4' + this.playerId;
      this.mark = document.getElementById(this.element);

      if(this.throw[this.playerId].casas['dezoito'] == 0)
      {
        this.mark.src = './assets/img/mark2.svg';
        this.throw[this.playerId].casas['dezoito'] = 2;
      }
      else if (this.throw[this.playerId].casas['dezoito'] == 1)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['dezoito'] = 3;

        //Se for a ultima casa a ser fechada, termina o jogo
        this.Check18();
        if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}

      }
      else if (this.throw[this.playerId].casas['dezoito'] == 2)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['dezoito'] = 3;
        //Checka se as casas estão fechadas e se não estiverem, soma pontos. Caso contrario cehcka se foi a última a ser fechada e termina o jogo
        if(!this.Check18()) {this.throw[this.playerId].currentScore += 18;} else {if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}}
      }
      else if (this.throw[this.playerId].casas['dezoito'] == 3){if(!this.Check18()) {this.throw[this.playerId].currentScore += 36;}}

      //Próximo Dardo
      this.throw[this.playerId].play ++;
      this.showPlayerPlay++;

    }
    else if (event.target.id == 'd17') {

      this.throw[this.playerId].darts[this.throw[this.playerId].play] = 17;

      //Agarra a img em questão
      this.element = 'cell5' + this.playerId;
      this.mark = document.getElementById(this.element);

      if(this.throw[this.playerId].casas['dezassete'] == 0)
      {
        this.mark.src = './assets/img/mark2.svg';
        this.throw[this.playerId].casas['dezassete'] = 2;
      }
      else if (this.throw[this.playerId].casas['dezassete'] == 1)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['dezassete'] = 3;

        //Se for a ultima casa a ser fechada, termina o jogo
        this.Check17();
        if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}

      }
      else if (this.throw[this.playerId].casas['dezassete'] == 2)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['dezassete'] = 3;
        //Checka se as casas estão fechadas e se não estiverem, soma pontos. ---- Caso contrário, checka se foi a ultima a ser fechada para terminar o jogo.
        if(!this.Check17()) {this.throw[this.playerId].currentScore += 17;} else {if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}}
      }
      else if (this.throw[this.playerId].casas['dezassete'] == 3) {if(!this.Check17()){this.throw[this.playerId].currentScore += 34;}}

      //Próximo Dardo
      this.throw[this.playerId].play ++;
      this.showPlayerPlay++;

    }
    else if (event.target.id == 'd16') {

      this.throw[this.playerId].darts[this.throw[this.playerId].play] = 16;

      //Agarra a img em questão
      this.element = 'cell6' + this.playerId;
      this.mark = document.getElementById(this.element);

      if(this.throw[this.playerId].casas['dezasseis'] == 0)
      {
        this.mark.src = './assets/img/mark2.svg';
        this.throw[this.playerId].casas['dezasseis'] = 2;
      }
      else if (this.throw[this.playerId].casas['dezasseis'] == 1)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['dezasseis'] = 3;

        //Se for a ultima casa a ser fechada, termina o jogo
        this.Check16();
        if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}

      }
      else if (this.throw[this.playerId].casas['dezasseis'] == 2)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['dezasseis'] = 3;
        //Checka se as casas estão fechadas e se não estiverem, soma pontos.
        if(!this.Check16()) {this.throw[this.playerId].currentScore += 16;} else {if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}}
      }
      else if (this.throw[this.playerId].casas['dezasseis'] == 3){if(!this.Check16()) {this.throw[this.playerId].currentScore += 32;}}

      //Próximo Dardo
      this.throw[this.playerId].play ++;
      this.showPlayerPlay++;

    }
    else if (event.target.id == 'd15') {

      this.throw[this.playerId].darts[this.throw[this.playerId].play] = 15;
      //Agarra a img em questão
      this.element = 'cell7' + this.playerId;
      this.mark = document.getElementById(this.element);

      if(this.throw[this.playerId].casas['quinze'] == 0)
      {
        this.mark.src = './assets/img/mark2.svg';
        this.throw[this.playerId].casas['quinze'] = 2;
      }
      else if (this.throw[this.playerId].casas['quinze'] == 1)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['quinze'] = 3;

        //Se for a ultima casa a ser fechada, termina o jogo
        this.Check15();
        if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}

      }
      else if (this.throw[this.playerId].casas['quinze'] == 2)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['quinze'] = 3;
        //Checka se as casas estão fechadas e se não estiverem, soma pontos.
        if(!this.Check15()) {this.throw[this.playerId].currentScore += 15;} else {if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}}
      }
      else if (this.throw[this.playerId].casas['quinze'] == 3){if(!this.Check15()) {this.throw[this.playerId].currentScore += 30;}}

      //Próximo Dardo
      this.throw[this.playerId].play ++;
      this.showPlayerPlay++;

    }

  }
  public Triple (event: { target: { id: string; }; }): void {

    if (event.target.id == 't20') {
      //Agarra a img em questão
      this.element = 'cell2' + this.playerId;
      this.mark = document.getElementById(this.element);

      this.throw[this.playerId].darts[this.throw[this.playerId].play] = 60;

      if(this.throw[this.playerId].casas['vinte'] == 0)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['vinte'] = 3;
        //Se for a última casa a ser fechada, termina o jogo
        this.Check20();
        if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}
      }
      else if (this.throw[this.playerId].casas['vinte'] == 1)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['vinte'] = 3;
        //Checka se as casas estão fechadas e se não estiverem, soma pontos.
        if(!this.Check20()) {this.throw[this.playerId].currentScore += 20;} else {if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}}
      }
      else if (this.throw[this.playerId].casas['vinte'] == 2)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['vinte'] = 3;
        //Checka se as casas estão fechadas e se não estiverem, soma pontos.
        if(!this.Check20()) {this.throw[this.playerId].currentScore += 40;} else {if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}}
      }
      else if (this.throw[this.playerId].casas['vinte'] == 3) {if(!this.Check20()) {this.throw[this.playerId].currentScore += 60;}}

      //Próximo Dardo
      this.throw[this.playerId].play ++;
      this.showPlayerPlay++;
    }
    else if (event.target.id == 't19') {

      this.throw[this.playerId].darts[this.throw[this.playerId].play] = 57;

      //Agarra a img em questão
      this.element = 'cell3' + this.playerId;
      this.mark = document.getElementById(this.element);

      if(this.throw[this.playerId].casas['dezanove'] == 0)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['dezanove'] = 3;

        //Se for a última casa a ser fechada, termina o jogo
        this.Check19();
        if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}

      }
      else if (this.throw[this.playerId].casas['dezanove'] == 1)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['dezanove'] = 3;
        //Checka se as casas estão fechadas e se não estiverem, soma pontos.
        if(!this.Check19()) {this.throw[this.playerId].currentScore += 19;} else {if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}}
      }
      else if (this.throw[this.playerId].casas['dezanove'] == 2)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['dezanove'] = 3;
        //Checka se as casas estão fechadas e se não estiverem, soma pontos.
        if(!this.Check19()) {this.throw[this.playerId].currentScore += 38;} else {if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}}
      }
      else if (this.throw[this.playerId].casas['dezanove'] == 3){if(!this.Check19()) {this.throw[this.playerId].currentScore += 57;}}

      //Próximo Dardo
      this.throw[this.playerId].play ++;
      this.showPlayerPlay++;

    }
    else if (event.target.id == 't18') {

      this.throw[this.playerId].darts[this.throw[this.playerId].play] = 54;

      //Agarra a img em questão
      this.element = 'cell4' + this.playerId;
      this.mark = document.getElementById(this.element);

      if(this.throw[this.playerId].casas['dezoito'] == 0)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['dezoito'] = 3;

        //Se for a última casa a ser fechada, termina o jogo
        this.Check18();
        if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}

      }
      else if (this.throw[this.playerId].casas['dezoito'] == 1)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['dezoito'] = 3;
        //Checka se as casas estão fechadas e se não estiverem, soma pontos.
        if(!this.Check18()) {this.throw[this.playerId].currentScore += 18;} else {if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}}
      }
      else if (this.throw[this.playerId].casas['dezoito'] == 2)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['dezoito'] = 3;
        //Checka se as casas estão fechadas e se não estiverem, soma pontos.
        if(!this.Check18()) {this.throw[this.playerId].currentScore += 36;} else {if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}}
      }
      else if (this.throw[this.playerId].casas['dezoito'] == 3){if(!this.Check18()) {this.throw[this.playerId].currentScore += 54;}}

      //Próximo Dardo
      this.throw[this.playerId].play ++;
      this.showPlayerPlay++;

    }
    else if (event.target.id == 't17') {

      this.throw[this.playerId].darts[this.throw[this.playerId].play] = 51;

      //Agarra a img em questão
      this.element = 'cell5' + this.playerId;
      this.mark = document.getElementById(this.element);

      if(this.throw[this.playerId].casas['dezassete'] == 0)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['dezassete'] = 3;

        //Se for a última casa a ser fechada, termina o jogo
        this.Check17();
        if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}

      }
      else if (this.throw[this.playerId].casas['dezassete'] == 1)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['dezassete'] = 3;
        //Checka se as casas estão fechadas e se não estiverem, soma pontos.
        if(!this.Check17()) {this.throw[this.playerId].currentScore += 17;} else if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}
      }
      else if (this.throw[this.playerId].casas['dezassete'] == 2)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['dezassete'] = 3;
        //Checka se as casas estão fechadas e se não estiverem, soma pontos.
        if(!this.Check17()) {this.throw[this.playerId].currentScore += 34;} else if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}
      }
      else if (this.throw[this.playerId].casas['dezassete'] == 3) {if(!this.Check17()){this.throw[this.playerId].currentScore += 51;}}

      //Próximo Dardo
      this.throw[this.playerId].play ++;
      this.showPlayerPlay++;

    }
    else if (event.target.id == 't16') {

      this.throw[this.playerId].darts[this.throw[this.playerId].play] = 48;

      //Agarra a img em questão
      this.element = 'cell6' + this.playerId;
      this.mark = document.getElementById(this.element);

      if(this.throw[this.playerId].casas['dezasseis'] == 0)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['dezasseis'] = 3;

        //Se for a última casa a ser fechada, termina o jogo
        this.Check16();
        if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}

      }
      else if (this.throw[this.playerId].casas['dezasseis'] == 1)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['dezasseis'] = 3;
        //Checka se as casas estão fechadas e se não estiverem, soma pontos.
        if(!this.Check16()) {this.throw[this.playerId].currentScore += 16;} else {if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}}
      }
      else if (this.throw[this.playerId].casas['dezasseis'] == 2)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['dezasseis'] = 3;
        //Checka se as casas estão fechadas e se não estiverem, soma pontos.
        if(!this.Check16()) {this.throw[this.playerId].currentScore += 32;} else {if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}}
      }
      else if (this.throw[this.playerId].casas['dezasseis'] == 3){if(!this.Check16()) {this.throw[this.playerId].currentScore += 48;}}

      //Próximo Dardo
      this.throw[this.playerId].play ++;
      this.showPlayerPlay++;

    }
    else if (event.target.id == 't15') {

      this.throw[this.playerId].darts[this.throw[this.playerId].play] = 45;

      //Agarra a img em questão
      this.element = 'cell7' + this.playerId;
      this.mark = document.getElementById(this.element);

      if(this.throw[this.playerId].casas['quinze'] == 0)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['quinze'] = 3;

        //Se for a última casa a ser fechada, termina o jogo
        this.Check15();
        if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}

      }
      else if (this.throw[this.playerId].casas['quinze'] == 1)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['quinze'] = 3;
        //Checka se as casas estão fechadas e se não estiverem, soma pontos.
        if(!this.Check15()) {this.throw[this.playerId].currentScore += 15;} else {if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}}
      }
      else if (this.throw[this.playerId].casas['quinze'] == 2)
      {
        this.mark.src = './assets/img/mark3.svg';
        this.throw[this.playerId].casas['quinze'] = 3;
        //Checka se as casas estão fechadas e se não estiverem, soma pontos.
        if(!this.Check15()) {this.throw[this.playerId].currentScore += 30;} else {if(this.bull && this.quinze && this.dezasseis && this.dezassete && this.dezoito && this.dezanove && this.vinte) {this.Reset();}}
      }
      else if (this.throw[this.playerId].casas['quinze'] == 3){if(!this.Check15()) {this.throw[this.playerId].currentScore += 45;}}

      //Próximo Dardo
      this.throw[this.playerId].play ++;
      this.showPlayerPlay++;
    }
  }
// ---------------------------------------------------------------------------------------------------------------------
// Funções para controlar o jogo ---------------------------------------------------------------------------------------
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
  //Limpa a board do jogador em questão, atualiza o ‘player’, a jogada e grava a pontuação para quando rebenta
  public ClearBoard(){
    //Limpa
    this.throw[this.playerId].darts[0] = 0;
    this.throw[this.playerId].darts[1] = 0;
    this.throw[this.playerId].darts[2] = 0;
    this.throw[this.playerId].play = 0;

    //Atualiza o jogador
    this.throw[this.playerId].play = 0;
    this.showPlayerPlay = 1;
    this.playerId ++;
    this.showPlayerId ++;


  }
  //O mesmo de cima, mas para o último jogador
  public ClearBoard2(){

    //Soma a ronda
    this.roundCounter ++;

    //Se estivermos na última ronda e for o último player a jogar o jogo acaba.
    if(this.roundCounter > this.round){this.removedarts = false; this.Reset2(); this.showPlayerPlay = 1;} else {
      //Limpa
      this.throw[this.playerCount-1].darts[0] = 0;
      this.throw[this.playerCount-1].darts[1] = 0;
      this.throw[this.playerCount-1].darts[2] = 0;
      this.throw[this.playerCount-1].play = 0;
      //Atualiza
      this.playerId = 0;
      this.showPlayerId = 1;
      this.showPlayerPlay = 1;
      this.throw[this.playerCount-1].play = 0;
    }

  }
  //Reset ---- fim do jogo
  public Reset(){

    //Gravas os scores de todos os jogadores num array
    for(let i = 0;i<this.playerCount;i ++) {this.getScore[i] = this.throw[i].currentScore;}

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

        if (confirm('O vencedor é o Jogador '+ (i+1) +'. \n\n Ok -> jogar novamente || Cancel -> voltar ao início.')) {

          //Reset Às vars
          this.playerId = 0;
          this.showPlayerPlay = 0;
          this.showPlayerId = 1;
          this.roundCounter = 0;

          this.closeElement = document.getElementById('020s');
          this.closeElement.id = 's20';
          this.closeElement = document.getElementById('020d');
          this.closeElement.id = 'd20';
          this.closeElement = document.getElementById('020t');
          this.closeElement.id = 't20';
          this.vinte = false;

          this.closeElement = document.getElementById('019s');
          this.closeElement.id = 's19';
          this.closeElement = document.getElementById('019d');
          this.closeElement.id = 'd19';
          this.closeElement = document.getElementById('019t');
          this.closeElement.id = 't19';
          this.dezanove = false;

          this.closeElement = document.getElementById('018s');
          this.closeElement.id = 's18';
          this.closeElement = document.getElementById('018d');
          this.closeElement.id = 'd18';
          this.closeElement = document.getElementById('018t');
          this.closeElement.id = 't18';
          this.dezoito = false;

          this.closeElement = document.getElementById('017s');
          this.closeElement.id = 's17';
          this.closeElement = document.getElementById('017d');
          this.closeElement.id = 'd17';
          this.closeElement = document.getElementById('017t');
          this.closeElement.id = 't17';
          this.dezassete = false;

          this.closeElement = document.getElementById('016s');
          this.closeElement.id = 's16';
          this.closeElement = document.getElementById('016d');
          this.closeElement.id = 'd16';
          this.closeElement = document.getElementById('016t');
          this.closeElement.id = 't16';
          this.dezasseis = false;

          this.closeElement = document.getElementById('015s');
          this.closeElement.id = 's15';
          this.closeElement = document.getElementById('015d');
          this.closeElement.id = 'd15';
          this.closeElement = document.getElementById('015t');
          this.closeElement.id = 't15';
          this.quinze = false;

          this.closeElement = document.getElementById('0Bull');
          this.closeElement.id = 'Bull';
          this.closeElement = document.getElementById('0Outer');
          this.closeElement.id = 'Outer';
          this.bull = false;

          for (let i = 0; i < this.playerCount; i++) {

            this.throw[i].darts[0] = 0;
            this.throw[i].darts[1] = 0;
            this.throw[i].darts[2] = 0;
            this.throw[i].play = 0;
            this.throw[i].currentScore = 0;

            //Agarra a img em questão
            this.element = 'cell2' + i;
            this.mark = document.getElementById(this.element);
            this.mark.src = '';

            this.element = 'cell3' + i;
            this.mark = document.getElementById(this.element);
            this.mark.src = '';

            this.element = 'cell4' + i;
            this.mark = document.getElementById(this.element);
            this.mark.src = '';

            this.element = 'cell5' + i;
            this.mark = document.getElementById(this.element);
            this.mark.src = '';

            this.element = 'cell6' + i;
            this.mark = document.getElementById(this.element);
            this.mark.src = '';

            this.element = 'cell7' + i;
            this.mark = document.getElementById(this.element);
            this.mark.src = '';

            this.element = 'cell8' + i;
            this.mark = document.getElementById(this.element);
            this.mark.src = '';

          }
        } else {
          window.location.href = "/";
        }
      }
    }
  }
  //Reset ---- fim do jogo
  public Reset2(){

    //Gravas os scores de todos os jogadores num array
    for(let i = 0;i<this.playerCount;i ++) {this.getScore[i] = this.throw[i].currentScore;}

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

        if (confirm('O vencedor é o Jogador '+ (i+1) +'. \n\n Ok -> jogar novamente || Cancel -> voltar ao início.')) {

          for (let i = 0; i < this.playerCount; i++) {

            this.throw[i].darts[0] = 0;
            this.throw[i].darts[1] = 0;
            this.throw[i].darts[2] = 0;
            this.throw[i].play = 0;
            this.throw[i].currentScore = 0;

            //Agarra a img em questão
            this.element = 'cell2' + i;
            console.log(this.element);
            this.mark = document.getElementById(this.element);
            this.mark.src = '';

            this.element = 'cell3' + i;
            this.mark = document.getElementById(this.element);
            this.mark.src = '';

            this.element = 'cell4' + i;
            this.mark = document.getElementById(this.element);
            this.mark.src = '';

            this.element = 'cell5' + i;
            this.mark = document.getElementById(this.element);
            this.mark.src = '';

            this.element = 'cell6' + i;
            this.mark = document.getElementById(this.element);
            this.mark.src = '';

            this.element = 'cell7' + i;
            this.mark = document.getElementById(this.element);
            this.mark.src = '';

            this.element = 'cell8' + i;
            this.mark = document.getElementById(this.element);
            this.mark.src = '';

          }

          //Reset Às vars
          this.playerId = 0;
          this.showPlayerPlay = 1;
          this.showPlayerId = 1;
          this.roundCounter = 0;

          this.closeElement = document.getElementById('020s');
          this.closeElement.id = 's20';
          this.closeElement = document.getElementById('020d');
          this.closeElement.id = 'd20';
          this.closeElement = document.getElementById('020t');
          this.closeElement.id = 't20';
          this.vinte = false;

          this.closeElement = document.getElementById('019s');
          this.closeElement.id = 's19';
          this.closeElement = document.getElementById('019d');
          this.closeElement.id = 'd19';
          this.closeElement = document.getElementById('019t');
          this.closeElement.id = 't19';
          this.dezanove = false;

          this.closeElement = document.getElementById('018s');
          this.closeElement.id = 's18';
          this.closeElement = document.getElementById('018d');
          this.closeElement.id = 'd18';
          this.closeElement = document.getElementById('018t');
          this.closeElement.id = 't18';
          this.dezoito = false;

          this.closeElement = document.getElementById('017s');
          this.closeElement.id = 's17';
          this.closeElement = document.getElementById('017d');
          this.closeElement.id = 'd17';
          this.closeElement = document.getElementById('017t');
          this.closeElement.id = 't17';
          this.dezassete = false;

          this.closeElement = document.getElementById('016s');
          this.closeElement.id = 's16';
          this.closeElement = document.getElementById('016d');
          this.closeElement.id = 'd16';
          this.closeElement = document.getElementById('016t');
          this.closeElement.id = 't16';
          this.dezasseis = false;

          this.closeElement = document.getElementById('015s');
          this.closeElement.id = 's15';
          this.closeElement = document.getElementById('015d');
          this.closeElement.id = 'd15';
          this.closeElement = document.getElementById('015t');
          this.closeElement.id = 't15';
          this.quinze = false;

          this.closeElement = document.getElementById('0Bull');
          this.closeElement.id = 'Bull';
          this.closeElement = document.getElementById('0Outer');
          this.closeElement.id = 'Outer';
          this.bull = false;

        } else {
          window.location.href = "/";
        }
      }
    }
  }
//----------------------------------------------------------------------------------------------------------------------
//Checka o fecho das casas ---------------------------------------------------------------------------------------------
  public CheckBull(){
    var counter : number = 0;
    for(let i = 0; i < this.playerCount; i++){
      this.throw[i].casas['Bull'] == 3 ? counter++ : counter = 0;
    }

    if(counter == this.playerCount){
      this.closeElement = document.getElementById('Bull');
      this.closeElement.id = '0Bull';
      this.closeElement = document.getElementById('Outer');
      this.closeElement.id = '0Outer';
      this.bull = true;
      return true;
    } else {
      return false;
    }
  }
  public Check20(){
    var counter : number = 0;
    for(let i = 0; i < this.playerCount; i++){
      this.throw[i].casas['vinte'] == 3 ? counter++ : counter = 0;
    }

    if(counter == this.playerCount){
      this.closeElement = document.getElementById('s20');
      this.closeElement.id = '020s';
      this.closeElement = document.getElementById('d20');
      this.closeElement.id = '020d';
      this.closeElement = document.getElementById('t20');
      this.closeElement.id = '020t';
      this.vinte = true;
      return true;
    } else {
      return false;
    }
  }
  public Check19(){
    var counter : number = 0;
    for(let i = 0; i < this.playerCount; i++){
      this.throw[i].casas['dezanove'] == 3 ? counter++ : counter = 0;
    }

    if(counter == this.playerCount){
      this.closeElement = document.getElementById('s19');
      this.closeElement.id = '019s';
      this.closeElement = document.getElementById('d19');
      this.closeElement.id = '019d';
      this.closeElement = document.getElementById('t19');
      this.closeElement.id = '019t';
      this.dezanove = true;
      return true;
    } else {
      return false;
    }
  }
  public Check18(){
    var counter : number = 0;
    for(let i = 0; i < this.playerCount; i++){
      this.throw[i].casas['dezoito'] == 3 ? counter++ : counter = 0;
    }

    if(counter == this.playerCount){
      this.closeElement = document.getElementById('s18');
      this.closeElement.id = '018s';
      this.closeElement = document.getElementById('d18');
      this.closeElement.id = '018d';
      this.closeElement = document.getElementById('t18');
      this.closeElement.id = '018t';
      this.dezoito = true;
      return true;
    } else {
      return false;
    }
  }
  public Check17(){

    var counter : number = 0;
    for(let i = 0; i < this.playerCount; i++){
      this.throw[i].casas['dezassete'] == 3 ? counter++ : counter = 0;
    }

    if(counter == this.playerCount){
      this.closeElement = document.getElementById('s17');
      this.closeElement.id = '017s';
      this.closeElement = document.getElementById('d17');
      this.closeElement.id = '017d';
      this.closeElement = document.getElementById('t17');
      this.closeElement.id = '017t';
      this.dezassete = true;
      return true;
    } else {
      return false;
    }
  }
  public Check16(){
    var counter : number = 0;
    for(let i = 0; i < this.playerCount; i++){
      this.throw[i].casas['dezasseis'] == 3 ? counter++ : counter = 0;
    }

    if(counter == this.playerCount){
      this.closeElement = document.getElementById('s16');
      this.closeElement.id = '016s';
      this.closeElement = document.getElementById('d16');
      this.closeElement.id = '016d';
      this.closeElement = document.getElementById('t16');
      this.closeElement.id = '016t';
      this.dezasseis = true;
      return true;
    } else {
      return false;
    }
  }
  public Check15(){
    var counter : number = 0;
    for(let i = 0; i < this.playerCount; i++){
      this.throw[i].casas['quinze'] == 3 ? counter++ : counter = 0;
    }

    if(counter == this.playerCount){
      this.closeElement = document.getElementById('s15');
      this.closeElement.id = '015s';
      this.closeElement = document.getElementById('d15');
      this.closeElement.id = '015d';
      this.closeElement = document.getElementById('t15');
      this.closeElement.id = '015t';
      this.quinze = true;
      return true;
    } else {
      return false;
    }
  }
//----------------------------------------------------------------------------------------------------------------------
}
