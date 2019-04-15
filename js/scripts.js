function Game(){
  this.deck = [],
  this.score = 5,
  this.player1 = new Player(),
  this.player1.active = true,
  this.player2 = new Player(),
  this.turn = 0,
  this.currentID = 1,
  this.board =
   [0,1,2,
    3,4,5
    ,6,7,8],
  this.selected = false;
}

Game.prototype.shuffle = function() {
  var i = 0;
   j = 0;
  temp = null;

  for (i = this.deck.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this.deck[i];
    this.deck[i] = this.deck[j];
    this.deck[j] = temp;
  }
}

Game.prototype.dealToPlayers = function() {
  for(var i = 0; i < 10; i ++){
    if(i%2 ===1){
      this.deck[i].owner = "blue";
      this.player1.hand.push(this.deck[i]);
    }else{
      this.deck[i].owner = "red";
      this.player2.hand.push(this.deck[i]);
    }
  }
}

Game.prototype.findActive = function() {
  if(game.player1.active === true){
    return game.player1;
  }
    return game.player2;
}


var game = new Game();

function Player(){
  this.hand = [],
  this.active = false
}




Game.prototype.swapActive = function(){
  if(game.player1.active === true){
    game.player2.active = true;
    game.player1.active = false;
  }else{
    game.player2.active = false;
    game.player1.active = true;
  }
}

function Card(top, bottom, left, right){
  this.top = top,
  this.bottom = bottom,
  this.left = left,
  this.right = right
  this.id = game.currentID,
  game.currentID++;
  game.deck.push(this);
}

//before deck gets shuffled
// Card.prototype.imageID(){
//   var giveImageId = [];
//   for(var i=0; i<=deck.length; i ++){
//     giveImageId.push("<img id =" +this.id + "src=" + i + "_b.png">)
//   }
//   return giveimageId;
// }


Game.prototype.findCard = function(id) {
  for (var i=0; i< this.deck.length; i++) {
    if (this.deck[i]) {
      if (this.deck[i].id == id) {
        return this.deck[i];
      }
    }
  };
  return false;
}

Game.prototype.placeCard = function(location){
  var neighbors = [location-3,location+3,location-1,location+1];
      if(location % 3 === 0){
        neighbors.filter(function(le){
          if(le === location-1){
            return false;
          }else{
            return true;
          }
        })
      }
      if(location % 3 === 2){
        neighbors.filter(function(le){
          if(le === location+1){
            return false;
          }else{
            return true;
          }
        })
      }
      if(location <= 2){
        neighbors.filter(function(le){
          if(le === location-3){
            return false;
          }else{
            return true;
          }
        })
      }
      if(location >= 6){
        neighbors.filter(function(le){
          if(le === location+3){
            return false;
          }else{
            return true;
          }
        })
      }

}

Game.prototype.displayHand = function() {
  for(var i = 0; i < 5; i++){
  $(".p1."+(i+1)).attr("src","img/"+game.player1.hand[i].id+"_b.png").attr('id',game.player1.hand[i].id);
  $(".p2."+(i+1)).attr("src","img/"+game.player2.hand[i].id+"_b.png");
  }
}

function attachListeners() {
  $("body").on("click", "img.card", function() {
    game.selected = this.id;
  });
  $(".container").on("click", ".col-md-4", function() {
    if(game.selected !== false){

      var location = $(this).attr('class');
      location = location.charAt(location.length-1);
      if(game.board[location] >= 0){
      console.log(location);
      $("img.board."+location).attr("src","img/"+game.selected+"_b.png");
      $("#"+game.selected).remove();
      game.board[location]=game.findCard(game.selected);
      console.log(game);
      game.selected = false;
      game.swapActive();
    }
  }
  });
};

$(document).ready(function() {
  game.shuffle();
  game.dealToPlayers();
  attachListeners();
  game.displayHand();
});
