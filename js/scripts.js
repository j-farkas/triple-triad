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

Game.prototype.shuffle = function() {
  var i = 0
  , j = 0
  , temp = null;

  for (i = this.deck.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this.deck[i];
    this.deck[i] = this.deck[j];
    this.deck[j] = temp;
  }
}

Game.prototype.dealToPlayers = function() {
  for(var i = 0; i < 10; i ++){
    if(this.deck[i]%2 ==1){
      this.deck[i].push(this.player1.hand)
    }else{
      this.deck[i].push(this.player2.hand)
    }
  }
}


var game = new Game();

Function Player(){
  this.hand = [],
  this.active = false
}

Player.prototype.displayHand = function(card) {
  game.currentID
  for(var i = 1; i <= 5; i++) {
    this.hand[i]
    $("#player1deck").addClass("#img1");
    $("#player2deck").addClass("#img1")
  }
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


//before deck gets shuffled
Card.prototype.imageID(){
  var giveImageId = [];
  for(var i=0; i<=deck.length; i ++){
    giveImageId.push("<img id =" +this.id + "src=" + i + "_b.png">)
  }
  return giveimageId;
}

var selected = false;

$(document).ready(function() {
  //attachListeners();

})
