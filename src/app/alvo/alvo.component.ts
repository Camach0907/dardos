import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-alvo',
  templateUrl: './alvo.component.html',
  styleUrls: ['./alvo.component.scss']
})

export class AlvoComponent implements OnInit {

  public throw = {
    id : 1,
    total : 0,
    currentScore : 701,

    darts : {
      one : 0,
      two : 0,
      three : 0
    }
  }

  public throw2 = {
    id : 1,
    total : 0,
    currentScore : 701,

    darts : {
      one : 0,
      two : 0,
      three : 0
    }
  }

  public SavedScore : number = 0;
  public SavedScore2 : number = 0;

  public player : number = 1;

  private t : any;
  private d : any;
  private s : any;

  toggle({event}: { event: any }) {
    /*var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;*/

    switch (this.player) {

      //Jodador 1 a jogar
      case 1:

        switch (this.throw.id) {

          //Dardo 1
          case 1:

            if (event.target.id == "Bull") {

              this.throw.currentScore = this.throw.currentScore - 50;
              this.throw.darts.one = 50;
              this.throw.total = this.throw.total + this.throw.darts.one;
              this.throw.id = this.throw.id + 1;

              //Se o score for abaixo de 0 ---- Rebenta
              if (this.throw.currentScore < 0) {
                alert('Player 1 REBENTOU!');
                this.throw.currentScore = this.SavedScore;
                this.throw.id = 1;
                this.player = 2;
                this.throw.total = 0;

                this.throw.darts.one = 0;
                this.throw.darts.two = 0;
                this.throw.darts.three = 0;

                //Caso ganhe, renicia as variaveis para recomeçar o jogo
              } else if (this.throw.currentScore == 0) {
                alert('O jogador 1 GANHOU!');

                this.throw.id = 1;
                this.throw2.id = 1;
                this.player = 1;
                this.throw.total = 0;
                this.throw2.total = 0;
                this.throw.darts.one = 0;
                this.throw.darts.two = 0;
                this.throw.darts.three = 0;
                this.throw2.darts.one = 0;
                this.throw2.darts.two = 0;
                this.throw2.darts.three = 0;
                this.throw.currentScore = 701;
                this.throw2.currentScore = 701;
              }

            } else if (event.target.id == 'Outer') {

              this.throw.currentScore = this.throw.currentScore - 25;
              this.throw.darts.one = 25;
              this.throw.total = this.throw.total + this.throw.darts.one;

              this.throw.id = this.throw.id + 1;

              if (this.throw.currentScore < 0) {
                alert('Player 1 REBENTOU!');
                this.throw.currentScore = this.SavedScore;
                this.throw.id = 1;
                this.player = 2;
                this.throw.total = 0;

                this.throw.darts.one = 0;
                this.throw.darts.two = 0;
                this.throw.darts.three = 0;

              } else if (this.throw.currentScore == 0) {
                alert('O jogador 1 GANHOU!');

                this.throw.id = 1;
                this.throw2.id = 1;
                this.player = 1;
                this.throw.total = 0;
                this.throw2.total = 0;
                this.throw.darts.one = 0;
                this.throw.darts.two = 0;
                this.throw.darts.three = 0;
                this.throw2.darts.one = 0;
                this.throw2.darts.two = 0;
                this.throw2.darts.three = 0;
                this.throw.currentScore = 701;
                this.throw2.currentScore = 701;
              }

            } else if (event.target.id[0] == 's') {

              for (this.s = 0; this.s <= 20; this.s++) {

                if (event.target.id == 's' + this.s) {

                  this.throw.currentScore = this.throw.currentScore - this.s;
                  this.throw.darts.one = this.s;
                  this.throw.total = this.throw.total + this.throw.darts.one;

                  this.throw.id = this.throw.id + 1;

                  if (this.throw.currentScore < 0) {
                    alert('Player 1 REBENTOU!');
                    this.throw.currentScore = this.SavedScore;
                    this.throw.id = 1;
                    this.player = 2;
                    this.throw.total = 0;

                    this.throw.darts.one = 0;
                    this.throw.darts.two = 0;
                    this.throw.darts.three = 0;

                  } else if (this.throw.currentScore == 0) {
                    alert('O jogador 1 GANHOU!');

                    this.throw.id = 1;
                    this.throw2.id = 1;
                    this.player = 1;
                    this.throw.total = 0;
                    this.throw2.total = 0;
                    this.throw.darts.one = 0;
                    this.throw.darts.two = 0;
                    this.throw.darts.three = 0;
                    this.throw2.darts.one = 0;
                    this.throw2.darts.two = 0;
                    this.throw2.darts.three = 0;
                    this.throw.currentScore = 701;
                    this.throw2.currentScore = 701;
                  }

                }
              }
            } else if (event.target.id[0] == 't') {

              for (this.t = 1; this.t <= 20; this.t++) {

                if (event.target.id == 't' + this.t) {

                  this.throw.currentScore = this.throw.currentScore - (this.t * 3);
                  this.throw.darts.one = this.t * 3;
                  this.throw.total = this.throw.total + this.throw.darts.one;

                  this.throw.id = this.throw.id + 1;

                  if (this.throw.currentScore < 0) {
                    alert('Player 1 REBENTOU!');
                    this.throw.currentScore = this.SavedScore;
                    this.throw.id = 1;
                    this.player = 2;
                    this.throw.total = 0;

                    this.throw.darts.one = 0;
                    this.throw.darts.two = 0;
                    this.throw.darts.three = 0;

                  } else if (this.throw.currentScore == 0) {
                    alert('O jogador 1 GANHOU!');

                    this.throw.id = 1;
                    this.throw2.id = 1;
                    this.player = 1;
                    this.throw.total = 0;
                    this.throw2.total = 0;
                    this.throw.darts.one = 0;
                    this.throw.darts.two = 0;
                    this.throw.darts.three = 0;
                    this.throw2.darts.one = 0;
                    this.throw2.darts.two = 0;
                    this.throw2.darts.three = 0;
                    this.throw.currentScore = 701;
                    this.throw2.currentScore = 701;
                  }

                }
              }
            } else if (event.target.id[0] == 'd') {

              for (this.d = 1; this.d <= 20; this.d++) {

                if (event.target.id == 'd' + this.d) {

                  this.throw.currentScore = this.throw.currentScore - (this.d * 2);
                  this.throw.darts.one = this.d * 2;
                  this.throw.total = this.throw.total + this.throw.darts.one;

                  this.throw.id = this.throw.id + 1;

                  if (this.throw.currentScore < 0) {
                    alert('Player 1 REBENTOU!');
                    this.throw.currentScore = this.SavedScore;
                    this.throw.id = 1;
                    this.player = 2;
                    this.throw.total = 0;

                    this.throw.darts.one = 0;
                    this.throw.darts.two = 0;
                    this.throw.darts.three = 0;

                  } else if (this.throw.currentScore == 0) {
                    alert('O jogador 1 GANHOU!');

                    this.throw.id = 1;
                    this.throw2.id = 1;
                    this.player = 1;
                    this.throw.total = 0;
                    this.throw2.total = 0;
                    this.throw.darts.one = 0;
                    this.throw.darts.two = 0;
                    this.throw.darts.three = 0;
                    this.throw2.darts.one = 0;
                    this.throw2.darts.two = 0;
                    this.throw2.darts.three = 0;
                    this.throw.currentScore = 701;
                    this.throw2.currentScore = 701;
                  }

                }
              }
            }

            break;

          //Dardo 2
          case 2:

            if (event.target.id == "Bull") {

              this.throw.currentScore = this.throw.currentScore - 50;
              this.throw.darts.two = 50;
              this.throw.total = this.throw.total + this.throw.darts.two;

              this.throw.id = this.throw.id + 1;

              if (this.throw.currentScore < 0) {

                alert('Player 1 REBENTOU!');
                this.throw.currentScore = this.SavedScore;
                this.throw.id = 1;
                this.player = 2;

                this.throw.darts.one = 0;
                this.throw.darts.two = 0;
                this.throw.darts.three = 0;
                this.throw.total = 0;

              } else if (this.throw.currentScore == 0) {
                alert('O jogador 1 GANHOU!');

                this.throw.id = 1;
                this.throw2.id = 1;
                this.player = 1;
                this.throw.total = 0;
                this.throw2.total = 0;
                this.throw.darts.one = 0;
                this.throw.darts.two = 0;
                this.throw.darts.three = 0;
                this.throw2.darts.one = 0;
                this.throw2.darts.two = 0;
                this.throw2.darts.three = 0;
                this.throw.currentScore = 701;
                this.throw2.currentScore = 701;
              }

            } else if (event.target.id == 'Outer') {

              this.throw.currentScore = this.throw.currentScore - 25;
              this.throw.darts.two = 25;
              this.throw.total = this.throw.total + this.throw.darts.two;

              this.throw.id = this.throw.id + 1;

              if (this.throw.currentScore < 0) {
                alert('Player 1 REBENTOU!');
                this.throw.currentScore = this.SavedScore;
                this.throw.id = 1;
                this.player = 2;

                this.throw.darts.one = 0;
                this.throw.darts.two = 0;
                this.throw.darts.three = 0;
                this.throw.total = 0;

              } else if (this.throw.currentScore == 0) {
                alert('O jogador 1 GANHOU!');

                this.throw.id = 1;
                this.throw2.id = 1;
                this.player = 1;
                this.throw.total = 0;
                this.throw2.total = 0;
                this.throw.darts.one = 0;
                this.throw.darts.two = 0;
                this.throw.darts.three = 0;
                this.throw2.darts.one = 0;
                this.throw2.darts.two = 0;
                this.throw2.darts.three = 0;
                this.throw.currentScore = 701;
                this.throw2.currentScore = 701;
              }

            } else if (event.target.id[0] == 's') {

              for (this.s = 0; this.s <= 20; this.s++) {

                if (event.target.id == 's' + this.s) {

                  this.throw.currentScore = this.throw.currentScore - this.s;
                  this.throw.darts.two = this.s;
                  this.throw.total = this.throw.total + this.throw.darts.two;

                  this.throw.id = this.throw.id + 1;

                  if (this.throw.currentScore < 0) {
                    alert('Player 1 REBENTOU!');
                    this.throw.currentScore = this.SavedScore;
                    this.throw.id = 1;
                    this.player = 2;

                    this.throw.darts.one = 0;
                    this.throw.darts.two = 0;
                    this.throw.darts.three = 0;
                    this.throw.total = 0;

                  } else if (this.throw.currentScore == 0) {
                    alert('O jogador 1 GANHOU!');

                    this.throw.id = 1;
                    this.throw2.id = 1;
                    this.player = 1;
                    this.throw.total = 0;
                    this.throw2.total = 0;
                    this.throw.darts.one = 0;
                    this.throw.darts.two = 0;
                    this.throw.darts.three = 0;
                    this.throw2.darts.one = 0;
                    this.throw2.darts.two = 0;
                    this.throw2.darts.three = 0;
                    this.throw.currentScore = 701;
                    this.throw2.currentScore = 701;
                  }

                }
              }
            } else if (event.target.id[0] == 't') {

              for (this.t = 1; this.t <= 20; this.t++) {

                if (event.target.id == 't' + this.t) {

                  this.throw.currentScore = this.throw.currentScore - (this.t * 3);
                  this.throw.darts.two = this.t * 3;
                  this.throw.total = this.throw.total + this.throw.darts.two;

                  this.throw.id = this.throw.id + 1;

                  if (this.throw.currentScore < 0) {
                    alert('Player 1 REBENTOU!');
                    this.throw.currentScore = this.SavedScore;
                    this.throw.id = 1;
                    this.player = 2;

                    this.throw.darts.one = 0;
                    this.throw.darts.two = 0;
                    this.throw.darts.three = 0;
                    this.throw.total = 0;

                  } else if (this.throw.currentScore == 0) {
                    alert('O jogador 1 GANHOU!');

                    this.throw.id = 1;
                    this.throw2.id = 1;
                    this.player = 1;
                    this.throw.total = 0;
                    this.throw2.total = 0;
                    this.throw.darts.one = 0;
                    this.throw.darts.two = 0;
                    this.throw.darts.three = 0;
                    this.throw2.darts.one = 0;
                    this.throw2.darts.two = 0;
                    this.throw2.darts.three = 0;
                    this.throw.currentScore = 701;
                    this.throw2.currentScore = 701;
                  }

                }
              }
            } else if (event.target.id[0] == 'd') {

              for (this.d = 1; this.d <= 20; this.d++) {

                if (event.target.id == 'd' + this.d) {

                  this.throw.currentScore = this.throw.currentScore - (this.d * 2);
                  this.throw.darts.two = this.d * 2;
                  this.throw.total = this.throw.total + this.throw.darts.two;

                  this.throw.id = this.throw.id + 1;

                  if (this.throw.currentScore < 0) {
                    alert('Player 1 REBENTOU!');
                    this.throw.currentScore = this.SavedScore;
                    this.throw.id = 1;
                    this.player = 2;

                    this.throw.darts.one = 0;
                    this.throw.darts.two = 0;
                    this.throw.darts.three = 0;
                    this.throw.total = 0;

                  } else if (this.throw.currentScore == 0) {
                    alert('O jogador 1 GANHOU!');

                    this.throw.id = 1;
                    this.throw2.id = 1;
                    this.player = 1;
                    this.throw.total = 0;
                    this.throw2.total = 0;
                    this.throw.darts.one = 0;
                    this.throw.darts.two = 0;
                    this.throw.darts.three = 0;
                    this.throw2.darts.one = 0;
                    this.throw2.darts.two = 0;
                    this.throw2.darts.three = 0;
                    this.throw.currentScore = 701;
                    this.throw2.currentScore = 701;

                  }

                }
              }
            }
            break;

          //Dardo 3
          case 3:

            if (event.target.id == "Bull") {

              this.throw.currentScore = this.throw.currentScore - 50;
              this.throw.darts.three = 50;
              this.throw.total = this.throw.total + this.throw.darts.three;

              this.player = 2;

              if (this.throw.currentScore < 0) {
                alert('Player 1 REBENTOU!');

                this.throw.currentScore = this.SavedScore;
                this.throw.id = 1;
                this.player = 2;
                this.throw.total = 0;

              } else if (this.throw.currentScore == 0) {
                alert('O jogador 1 GANHOU!');

                this.throw.id = 1;
                this.throw2.id = 1;
                this.player = 1;
                this.throw.total = 0;
                this.throw2.total = 0;
                this.throw.darts.one = 0;
                this.throw.darts.two = 0;
                this.throw.darts.three = 0;
                this.throw2.darts.one = 0;
                this.throw2.darts.two = 0;
                this.throw2.darts.three = 0;
                this.throw.currentScore = 701;
                this.throw2.currentScore = 701;
              }

            } else if (event.target.id == 'Outer') {

              this.throw.currentScore = this.throw.currentScore - 25;
              this.throw.darts.three = 25;
              this.throw.total = this.throw.total + this.throw.darts.three;

              if (this.throw.currentScore < 0) {
                alert('Player 1 REBENTOU!');
                this.throw.currentScore = this.SavedScore;
                this.throw.id = 1;
                this.player = 2;
                this.throw.total = 0;

                this.throw.darts.one = 0;
                this.throw.darts.two = 0;
                this.throw.darts.three = 0;

              } else if (this.throw.currentScore == 0) {
                alert('O jogador 1 GANHOU!');

                this.throw.id = 1;
                this.throw2.id = 1;
                this.player = 1;
                this.throw.total = 0;
                this.throw2.total = 0;
                this.throw.darts.one = 0;
                this.throw.darts.two = 0;
                this.throw.darts.three = 0;
                this.throw2.darts.one = 0;
                this.throw2.darts.two = 0;
                this.throw2.darts.three = 0;
                this.throw.currentScore = 701;
                this.throw2.currentScore = 701;

              }

            } else if (event.target.id[0] == 's') {

              for (this.s = 0; this.s <= 20; this.s++) {

                if (event.target.id == 's' + this.s) {

                  this.throw.currentScore = this.throw.currentScore - this.s;
                  this.throw.darts.three = this.s;
                  this.throw.total = this.throw.total + this.throw.darts.three;

                  if (this.throw.currentScore < 0) {
                    alert('Player 1 REBENTOU!');
                    this.throw.currentScore = this.SavedScore;
                    this.throw.id = 1;
                    this.player = 2;
                    this.throw.total = 0;

                    this.throw.darts.one = 0;
                    this.throw.darts.two = 0;
                    this.throw.darts.three = 0;

                  } else if (this.throw.currentScore == 0) {
                    alert('O jogador 1 GANHOU!');

                    this.throw.id = 1;
                    this.throw2.id = 1;
                    this.player = 1;
                    this.throw.total = 0;
                    this.throw2.total = 0;
                    this.throw.darts.one = 0;
                    this.throw.darts.two = 0;
                    this.throw.darts.three = 0;
                    this.throw2.darts.one = 0;
                    this.throw2.darts.two = 0;
                    this.throw2.darts.three = 0;
                    this.throw.currentScore = 701;
                    this.throw2.currentScore = 701;
                  }

                }
              }
            } else if (event.target.id[0] == 't') {

              for (this.t = 1; this.t <= 20; this.t++) {

                if (event.target.id == 't' + this.t) {

                  this.throw.currentScore = this.throw.currentScore - (this.t * 3);
                  this.throw.darts.three = this.t * 3;
                  this.throw.total = this.throw.total + this.throw.darts.three;

                  if (this.throw.currentScore < 0) {
                    alert('Player 1 REBENTOU!');
                    this.throw.currentScore = this.SavedScore;
                    this.throw.id = 1;
                    this.player = 2;
                    this.throw.total = 0;

                    this.throw.darts.one = 0;
                    this.throw.darts.two = 0;
                    this.throw.darts.three = 0;

                  } else if (this.throw.currentScore == 0) {
                    alert('O jogador 1 GANHOU!');

                    this.throw.id = 1;
                    this.throw2.id = 1;
                    this.player = 1;
                    this.throw.total = 0;
                    this.throw2.total = 0;
                    this.throw.darts.one = 0;
                    this.throw.darts.two = 0;
                    this.throw.darts.three = 0;
                    this.throw2.darts.one = 0;
                    this.throw2.darts.two = 0;
                    this.throw2.darts.three = 0;
                    this.throw.currentScore = 701;
                    this.throw2.currentScore = 701;
                  }

                }
              }
            } else if (event.target.id[0] == 'd') {

              for (this.d = 1; this.d <= 20; this.d++) {

                if (event.target.id == 'd' + this.d) {

                  this.throw.currentScore = this.throw.currentScore - (this.d * 2);
                  this.throw.darts.three = this.d * 2;
                  this.throw.total = this.throw.total + this.throw.darts.three;

                  if (this.throw.currentScore < 0) {
                    alert('Player 1 REBENTOU!');
                    this.throw.currentScore = this.SavedScore;
                    this.throw.id = 1;
                    this.player = 2;
                    this.throw.total = 0;

                    this.throw.darts.one = 0;
                    this.throw.darts.two = 0;
                    this.throw.darts.three = 0;

                  } else if (this.throw.currentScore == 0) {
                    alert('O jogador 1 GANHOU!');

                    this.throw.id = 1;
                    this.throw2.id = 1;
                    this.player = 1;
                    this.throw.total = 0;
                    this.throw2.total = 0;

                    this.throw.darts.one = 0;
                    this.throw.darts.two = 0;
                    this.throw.darts.three = 0;

                    this.throw2.darts.one = 0;
                    this.throw2.darts.two = 0;
                    this.throw2.darts.three = 0;

                    this.throw.currentScore = 701;
                    this.throw2.currentScore = 701;

                  }

                }
              }
            }


            this.SavedScore = this.throw.currentScore;

            this.throw.id = 1;

            this.player = 2;

            this.throw.darts.one = 0;
            this.throw.darts.two = 0;
            this.throw.darts.three = 0;
            this.throw.total = 0;

            break;
          default:
            break;

        }
        break;

      //Jodador 2 a jogar
      case 2:

        switch (this.throw2.id) {

          //Dardo 1
          case 1:

            if (event.target.id == "Bull") {


              this.throw2.currentScore = this.throw2.currentScore - 50;
              this.throw2.darts.one = 50;
              this.throw2.total = this.throw2.total + this.throw2.darts.one;
              this.throw2.id = this.throw2.id + 1;

              //Se o score for abaixo de 0 ---- Rebenta
              if (this.throw2.currentScore < 0) {
                alert('Player 2 REBENTOU!');
                this.throw2.currentScore = this.SavedScore2;
                this.throw2.id = 1;
                this.player = 1;
                this.throw2.total = 0;

                this.throw2.darts.one = 0;
                this.throw2.darts.two = 0;
                this.throw2.darts.three = 0;

                //Caso ganhe, renicia as variaveis para recomeçar o jogo
              } else if (this.throw2.currentScore == 0) {
                alert('O jogador 2 GANHOU!');

                this.throw.id = 1;
                this.throw2.id = 1;
                this.player = 1;
                this.throw.total = 0;
                this.throw2.total = 0;
                this.throw.darts.one = 0;
                this.throw.darts.two = 0;
                this.throw.darts.three = 0;
                this.throw2.darts.one = 0;
                this.throw2.darts.two = 0;
                this.throw2.darts.three = 0;
                this.throw.currentScore = 701;
                this.throw2.currentScore = 701;
              }

            } else if (event.target.id == 'Outer') {

              this.throw2.currentScore = this.throw2.currentScore - 25;
              this.throw2.darts.one = 25;
              this.throw2.total = this.throw2.total + this.throw2.darts.one;

              this.throw2.id = this.throw2.id + 1;

              if (this.throw2.currentScore < 0) {
                alert('Player 2 REBENTOU!');
                this.throw2.currentScore = this.SavedScore2;
                this.throw2.id = 1;
                this.player = 1;
                this.throw2.total = 0;

                this.throw2.darts.one = 0;
                this.throw2.darts.two = 0;
                this.throw2.darts.three = 0;

              } else if (this.throw2.currentScore == 0) {
                alert('O jogador 2 GANHOU!');

                this.throw.id = 1;
                this.throw2.id = 1;
                this.player = 1;
                this.throw.total = 0;
                this.throw2.total = 0;
                this.throw.darts.one = 0;
                this.throw.darts.two = 0;
                this.throw.darts.three = 0;
                this.throw2.darts.one = 0;
                this.throw2.darts.two = 0;
                this.throw2.darts.three = 0;
                this.throw.currentScore = 701;
                this.throw2.currentScore = 701;
              }

            } else if (event.target.id[0] == 's') {

              for (this.s = 0; this.s <= 20; this.s++) {

                if (event.target.id == 's' + this.s) {

                  this.throw2.currentScore = this.throw2.currentScore - this.s;
                  this.throw2.darts.one = this.s;
                  this.throw2.total = this.throw2.total + this.throw2.darts.one;

                  this.throw2.id = this.throw2.id + 1;

                  if (this.throw2.currentScore < 0) {
                    alert('Player 2 REBENTOU!');
                    this.throw2.currentScore = this.SavedScore2;
                    this.throw2.id = 1;
                    this.player = 1;
                    this.throw2.total = 0;

                    this.throw2.darts.one = 0;
                    this.throw2.darts.two = 0;
                    this.throw2.darts.three = 0;

                  } else if (this.throw2.currentScore == 0) {
                    alert('O jogador 2 GANHOU!');

                    this.throw.id = 1;
                    this.throw2.id = 1;
                    this.player = 1;
                    this.throw.total = 0;
                    this.throw2.total = 0;
                    this.throw.darts.one = 0;
                    this.throw.darts.two = 0;
                    this.throw.darts.three = 0;
                    this.throw2.darts.one = 0;
                    this.throw2.darts.two = 0;
                    this.throw2.darts.three = 0;
                    this.throw.currentScore = 701;
                    this.throw2.currentScore = 701;
                  }

                }
              }
            } else if (event.target.id[0] == 't') {

              for (this.t = 1; this.t <= 20; this.t++) {

                if (event.target.id == 't' + this.t) {

                  this.throw2.currentScore = this.throw2.currentScore - (this.t * 3);
                  this.throw2.darts.one = this.t * 3;
                  this.throw2.total = this.throw2.total + this.throw2.darts.one;

                  this.throw2.id = this.throw2.id + 1;

                  if (this.throw2.currentScore < 0) {
                    alert('Player 2 REBENTOU!');
                    this.throw2.currentScore = this.SavedScore2;
                    this.throw2.id = 1;
                    this.player = 1;
                    this.throw2.total = 0;

                    this.throw2.darts.one = 0;
                    this.throw2.darts.two = 0;
                    this.throw2.darts.three = 0;

                  } else if (this.throw2.currentScore == 0) {
                    alert('O jogador 2 GANHOU!');

                    this.throw.id = 1;
                    this.throw2.id = 1;
                    this.player = 1;
                    this.throw.total = 0;
                    this.throw2.total = 0;
                    this.throw.darts.one = 0;
                    this.throw.darts.two = 0;
                    this.throw.darts.three = 0;
                    this.throw2.darts.one = 0;
                    this.throw2.darts.two = 0;
                    this.throw2.darts.three = 0;
                    this.throw.currentScore = 701;
                    this.throw2.currentScore = 701;
                  }

                }
              }
            } else if (event.target.id[0] == 'd') {

              for (this.d = 1; this.d <= 20; this.d++) {

                if (event.target.id == 'd' + this.d) {

                  this.throw2.currentScore = this.throw2.currentScore - (this.d * 2);
                  this.throw2.darts.one = this.d * 2;
                  this.throw2.total = this.throw2.total + this.throw2.darts.one;

                  this.throw2.id = this.throw2.id + 1;

                  if (this.throw2.currentScore < 0) {
                    alert('Player 2 REBENTOU!');
                    this.throw2.currentScore = this.SavedScore2;
                    this.throw2.id = 1;
                    this.player = 1;
                    this.throw2.total = 0;

                    this.throw2.darts.one = 0;
                    this.throw2.darts.two = 0;
                    this.throw2.darts.three = 0;

                  } else if (this.throw2.currentScore == 0) {
                    alert('O jogador 2 GANHOU!');

                    this.throw.id = 1;
                    this.throw2.id = 1;
                    this.player = 1;
                    this.throw.total = 0;
                    this.throw2.total = 0;
                    this.throw.darts.one = 0;
                    this.throw.darts.two = 0;
                    this.throw.darts.three = 0;
                    this.throw2.darts.one = 0;
                    this.throw2.darts.two = 0;
                    this.throw2.darts.three = 0;
                    this.throw.currentScore = 701;
                    this.throw2.currentScore = 701;
                  }

                }
              }
            }

            break;

          //Dardo 2
          case 2:

            if (event.target.id == "Bull") {

              this.throw2.currentScore = this.throw2.currentScore - 50;
              this.throw2.darts.two = 50;
              this.throw2.total = this.throw2.total + this.throw2.darts.two;

              this.throw2.id = this.throw2.id + 1;

              if (this.throw2.currentScore < 0) {
                alert('Player 2 REBENTOU!');
                this.throw2.currentScore = this.SavedScore2;
                this.throw2.id = 1;
                this.player = 1;
                this.throw2.total = 0;

                this.throw2.darts.one = 0;
                this.throw2.darts.two = 0;
                this.throw2.darts.three = 0;

              } else if (this.throw2.currentScore == 0) {
                alert('O jogador 2 GANHOU!');

                this.throw.id = 1;
                this.throw2.id = 1;
                this.player = 1;
                this.throw.total = 0;
                this.throw2.total = 0;
                this.throw.darts.one = 0;
                this.throw.darts.two = 0;
                this.throw.darts.three = 0;
                this.throw2.darts.one = 0;
                this.throw2.darts.two = 0;
                this.throw2.darts.three = 0;
                this.throw.currentScore = 701;
                this.throw2.currentScore = 701;
              }

            } else if (event.target.id == 'Outer') {

              this.throw2.currentScore = this.throw2.currentScore - 25;
              this.throw2.darts.two = 25;
              this.throw2.total = this.throw2.total + this.throw2.darts.two;

              this.throw2.id = this.throw2.id + 1;

              if (this.throw2.currentScore < 0) {
                alert('Player 2 REBENTOU!');
                this.throw2.currentScore = this.SavedScore2;
                this.throw2.id = 1;
                this.player = 1;
                this.throw2.total = 0;

                this.throw2.darts.one = 0;
                this.throw2.darts.two = 0;
                this.throw2.darts.three = 0;

              } else if (this.throw2.currentScore == 0) {
                alert('O jogador 2 GANHOU!');

                this.throw.id = 1;
                this.throw2.id = 1;
                this.player = 1;
                this.throw.total = 0;
                this.throw2.total = 0;
                this.throw.darts.one = 0;
                this.throw.darts.two = 0;
                this.throw.darts.three = 0;
                this.throw2.darts.one = 0;
                this.throw2.darts.two = 0;
                this.throw2.darts.three = 0;
                this.throw.currentScore = 701;
                this.throw2.currentScore = 701;
              }

            } else if (event.target.id[0] == 's') {

              for (this.s = 0; this.s <= 20; this.s++) {

                if (event.target.id == 's' + this.s) {

                  this.throw2.currentScore = this.throw2.currentScore - this.s;
                  this.throw2.darts.two = this.s;
                  this.throw2.total = this.throw2.total + this.throw2.darts.two;

                  this.throw2.id = this.throw2.id + 1;

                  if (this.throw2.currentScore < 0) {
                    alert('Player 2 REBENTOU!');
                    this.throw2.currentScore = this.SavedScore2;
                    this.throw2.id = 1;
                    this.player = 1;
                    this.throw2.total = 0;

                    this.throw2.darts.one = 0;
                    this.throw2.darts.two = 0;
                    this.throw2.darts.three = 0;

                  } else if (this.throw2.currentScore == 0) {
                    alert('O jogador 2 GANHOU!');

                    this.throw.id = 1;
                    this.throw2.id = 1;
                    this.player = 1;
                    this.throw.total = 0;
                    this.throw2.total = 0;
                    this.throw.darts.one = 0;
                    this.throw.darts.two = 0;
                    this.throw.darts.three = 0;
                    this.throw2.darts.one = 0;
                    this.throw2.darts.two = 0;
                    this.throw2.darts.three = 0;
                    this.throw.currentScore = 701;
                    this.throw2.currentScore = 701;
                  }

                }
              }
            } else if (event.target.id[0] == 't') {

              for (this.t = 1; this.t <= 20; this.t++) {

                if (event.target.id == 't' + this.t) {

                  this.throw2.currentScore = this.throw2.currentScore - (this.t * 3);
                  this.throw2.darts.two = this.t * 3;
                  this.throw2.total = this.throw2.total + this.throw2.darts.two;

                  this.throw2.id = this.throw2.id + 1;

                  if (this.throw2.currentScore < 0) {
                    alert('Player 2 REBENTOU!');
                    this.throw2.currentScore = this.SavedScore2;
                    this.throw2.id = 1;
                    this.player = 1;
                    this.throw2.total = 0;

                    this.throw2.darts.one = 0;
                    this.throw2.darts.two = 0;
                    this.throw2.darts.three = 0;

                  } else if (this.throw2.currentScore == 0) {
                    alert('O jogador 2 GANHOU!');

                    this.throw.id = 1;
                    this.throw2.id = 1;
                    this.player = 1;
                    this.throw.total = 0;
                    this.throw2.total = 0;
                    this.throw.darts.one = 0;
                    this.throw.darts.two = 0;
                    this.throw.darts.three = 0;
                    this.throw2.darts.one = 0;
                    this.throw2.darts.two = 0;
                    this.throw2.darts.three = 0;
                    this.throw.currentScore = 701;
                    this.throw2.currentScore = 701;
                  }

                }
              }
            } else if (event.target.id[0] == 'd') {

              for (this.d = 1; this.d <= 20; this.d++) {

                if (event.target.id == 'd' + this.d) {

                  this.throw2.currentScore = this.throw2.currentScore - (this.d * 2);
                  this.throw2.darts.two = this.d * 2;
                  this.throw2.total = this.throw2.total + this.throw2.darts.two;

                  this.throw2.id = this.throw2.id + 1;

                  if (this.throw2.currentScore < 0) {
                    alert('Player 2 REBENTOU!');
                    this.throw2.currentScore = this.SavedScore2;
                    this.throw2.id = 1;
                    this.player = 1;
                    this.throw2.total = 0;

                    this.throw2.darts.one = 0;
                    this.throw2.darts.two = 0;
                    this.throw2.darts.three = 0;

                  } else if (this.throw2.currentScore == 0) {
                    alert('O jogador 2 GANHOU!');

                    this.throw.id = 1;
                    this.throw2.id = 1;
                    this.player = 1;
                    this.throw.total = 0;
                    this.throw2.total = 0;
                    this.throw.darts.one = 0;
                    this.throw.darts.two = 0;
                    this.throw.darts.three = 0;
                    this.throw2.darts.one = 0;
                    this.throw2.darts.two = 0;
                    this.throw2.darts.three = 0;
                    this.throw.currentScore = 701;
                    this.throw2.currentScore = 701;

                  }

                }
              }
            }
            break;

          //Dardo 3
          case 3:

            if (event.target.id == "Bull") {

              this.throw2.currentScore = this.throw2.currentScore - 50;
              this.throw2.darts.three = 50;
              this.throw2.total = this.throw2.total + this.throw2.darts.three;

              this.player = 1;

              if (this.throw2.currentScore < 0) {
                alert('Player 2 REBENTOU!');
                this.throw2.currentScore = this.SavedScore2;
                this.throw2.id = 1;
                this.player = 1;
                this.throw2.total = 0;

                this.throw2.darts.one = 0;
                this.throw2.darts.two = 0;
                this.throw2.darts.three = 0;

              } else if (this.throw2.currentScore == 0) {
                alert('O jogador 2 GANHOU!');

                this.throw.id = 1;
                this.throw2.id = 1;
                this.player = 1;
                this.throw.total = 0;
                this.throw2.total = 0;
                this.throw.darts.one = 0;
                this.throw.darts.two = 0;
                this.throw.darts.three = 0;
                this.throw2.darts.one = 0;
                this.throw2.darts.two = 0;
                this.throw2.darts.three = 0;
                this.throw.currentScore = 701;
                this.throw2.currentScore = 701;
              }

            } else if (event.target.id == 'Outer') {

              this.throw2.currentScore = this.throw2.currentScore - 25;
              this.throw2.darts.three = 25;
              this.throw2.total = this.throw2.total + this.throw2.darts.three;

              this.throw2.id = this.throw2.id + 1;

              this.player = 1;

              if (this.throw2.currentScore < 0) {
                alert('Player 2 REBENTOU!');
                this.throw2.currentScore = this.SavedScore2;
                this.throw2.id = 1;
                this.player = 1;
                this.throw2.total = 0;

                this.throw2.darts.one = 0;
                this.throw2.darts.two = 0;
                this.throw2.darts.three = 0;

              } else if (this.throw2.currentScore == 0) {
                alert('O jogador 2 GANHOU!');

                this.throw.id = 1;
                this.throw2.id = 1;
                this.player = 1;
                this.throw.total = 0;
                this.throw2.total = 0;
                this.throw.darts.one = 0;
                this.throw.darts.two = 0;
                this.throw.darts.three = 0;
                this.throw2.darts.one = 0;
                this.throw2.darts.two = 0;
                this.throw2.darts.three = 0;
                this.throw.currentScore = 701;
                this.throw2.currentScore = 701;
              }

            } else if (event.target.id[0] == 's') {

              for (this.s = 0; this.s <= 20; this.s++) {

                if (event.target.id == 's' + this.s) {

                  this.throw2.currentScore = this.throw2.currentScore - this.s;
                  this.throw2.darts.three = this.s;
                  this.throw2.total = this.throw2.total + this.throw2.darts.three;

                  this.player = 1;

                  this.throw2.id = this.throw2.id + 1;

                  if (this.throw2.currentScore < 0) {
                    alert('Player 2 REBENTOU!');
                    this.throw2.currentScore = this.SavedScore2;
                    this.throw2.id = 1;

                    this.player = 1;

                    this.throw2.darts.one = 0;
                    this.throw2.darts.two = 0;
                    this.throw2.darts.three = 0;

                    this.throw2.total = 0;
                  } else if (this.throw2.currentScore == 0) {
                    alert('O jogador 2 GANHOU!');

                    this.throw.id = 1;
                    this.throw2.id = 1;
                    this.player = 1;
                    this.throw.total = 0;
                    this.throw2.total = 0;
                    this.throw.darts.one = 0;
                    this.throw.darts.two = 0;
                    this.throw.darts.three = 0;
                    this.throw2.darts.one = 0;
                    this.throw2.darts.two = 0;
                    this.throw2.darts.three = 0;
                    this.throw.currentScore = 701;
                    this.throw2.currentScore = 701;
                  }

                }
              }
            } else if (event.target.id[0] == 't') {

              for (this.t = 1; this.t <= 20; this.t++) {

                if (event.target.id == 't' + this.t) {

                  this.throw2.currentScore = this.throw2.currentScore - (this.t * 3);
                  this.throw2.darts.three = this.t * 3;
                  this.throw2.total = this.throw2.total + this.throw2.darts.three;

                  this.player = 1;

                  this.throw2.id = this.throw2.id + 1;

                  if (this.throw2.currentScore < 0) {
                    alert('Player 2 REBENTOU!');
                    this.throw2.currentScore = this.SavedScore2;
                    this.throw2.id = 1;
                    this.player = 1;
                    this.throw2.total = 0;

                    this.throw2.darts.one = 0;
                    this.throw2.darts.two = 0;
                    this.throw2.darts.three = 0;

                  } else if (this.throw2.currentScore == 0) {
                    alert('O jogador 2 GANHOU!');

                    this.throw.id = 1;
                    this.throw2.id = 1;
                    this.player = 1;
                    this.throw.total = 0;
                    this.throw2.total = 0;
                    this.throw.darts.one = 0;
                    this.throw.darts.two = 0;
                    this.throw.darts.three = 0;
                    this.throw2.darts.one = 0;
                    this.throw2.darts.two = 0;
                    this.throw2.darts.three = 0;
                    this.throw.currentScore = 701;
                    this.throw2.currentScore = 701;
                  }

                }
              }
            } else if (event.target.id[0] == 'd') {

              for (this.d = 1; this.d <= 20; this.d++) {

                if (event.target.id == 'd' + this.d) {

                  this.throw2.currentScore = this.throw2.currentScore - (this.d * 2);
                  this.throw2.darts.three = this.d * 2;
                  this.throw2.total = this.throw2.total + this.throw2.darts.three;

                  this.throw2.id = this.throw2.id + 1;

                  this.player = 1;

                  if (this.throw2.currentScore < 0) {
                    alert('Player 2 REBENTOU!');
                    this.throw2.currentScore = this.SavedScore2;
                    this.throw2.id = 1;
                    this.player = 1;
                    this.throw2.total = 0;

                    this.throw2.darts.one = 0;
                    this.throw2.darts.two = 0;
                    this.throw2.darts.three = 0;

                  } else if (this.throw2.currentScore == 0) {
                    alert('O jogador 2 GANHOU!');

                    this.throw.id = 1;
                    this.throw2.id = 1;
                    this.player = 1;
                    this.throw.total = 0;
                    this.throw2.total = 0;
                    this.throw.darts.one = 0;
                    this.throw.darts.two = 0;
                    this.throw.darts.three = 0;
                    this.throw2.darts.one = 0;
                    this.throw2.darts.two = 0;
                    this.throw2.darts.three = 0;
                    this.throw.currentScore = 701;
                    this.throw2.currentScore = 701;

                  }

                }
              }
            }

            this.SavedScore2 = this.throw2.currentScore;
            this.throw2.total = 0;
            this.throw2.id = 1;

            this.throw2.darts.one = 0;
            this.throw2.darts.two = 0;
            this.throw2.darts.three = 0;

            break;
        }
        break;
    }
  }

  constructor() {




  }


  ngOnInit(): void {
  }


}




