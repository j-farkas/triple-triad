Function Game(){
  this.deck = [],
  this.score = 5,
  this.player1 = new Player(),
  this.player1.active = true,
  this.player2 = new Player(),
  this.turn = 0,
  this.currentID = 1,
  this.board = [0,1,2,3,4,5,6,7,8]
}

var game = new Game();

Function Player(){
  this.hand = [],
  this.active = false
}

Function Card(top, bottom, left, right){
  this.top = top,
  this.bottom = bottom,
  this.left = left,
  this.right = right
  this.id = game.currentID,
  game.currentID++;
  game.deck.push(this);
}

var selected = false;

$(document).ready(function() {
  //attachListeners();
})
