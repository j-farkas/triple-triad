//Game
function Game(){
  this.deck = [],
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

Game.prototype.checkWinner = function(){
  var blue = 0;
  this.board.forEach(function(card){
    if(card.owner === "blue"){
      blue++;
    }
  })
  if(blue > 5)
  {
    console.log('blue wins')
  }else if(blue < 5){
    console.log('red wins');
  }else{
    console.log('tie');
  }
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


Game.prototype.assignImageIds = function() {
  var player1images = [];
  var player2images = [];
  player1images = Game.player1.imageId();
  player2images = Game.player2.imageId();
}

Game.prototype.findActive = function() {
  if(game.player1.active === true){
    return game.player1;
  }
    return game.player2;
}

//Sudden Death	If the game ends in a draw, a sudden death occurs in which a new game is started but the cards are distributed on the side of the color they were on at the end of the game.
Game.prototype.suddenDeath = function() {

}

Game.prototype.restartGame = function() {
  this.board =
   [0,1,2,
    3,4,5
    ,6,7,8];
  // reset scores to 5 for p1 and p2 after they're initialized
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
        neighbors = neighbors.filter(function(le){
          if(le === location-1){
            return false;
          }else{
            return true;
          }
        })
      }
      if(location % 3 === 2){
        neighbors = neighbors.filter(function(le){
          if(le === location+1){
            return false;
          }else{
            return true;
          }
        })
      }
      if(location <= 2){
        neighbors = neighbors.filter(function(le){
          if(le === location-3){
            return false;
          }else{
            return true;
          }
        })
      }
      if(location >= 6){
        neighbors = neighbors.filter(function(le){
          if(le === location+3){
            return false;
          }else{
            return true;
          }
        })
      }
  for(var i = 0;i<neighbors.length;i++){
      var direction;
      if(neighbors[i] === location - 3){
        direction = 'up';
      } else if(neighbors[i] === location + 3){
        direction = 'down';
      } else if(neighbors[i] === location + 1){
        direction = 'right';
      } else if(neighbors[i] === location - 1){
        direction = 'left';
      }
      console.log(neighbors);
      game.board[location].checkFlip(neighbors[i],direction)
  }
}

Card.prototype.checkFlip = function(location, direction){
  if(isNaN(game.board[location]) === true){
    if(game.board[location].owner != this.owner){
      switch(direction){
        case "right":
         if(this.right > game.board[location].left){
           game.flip(location)
         }
           break;
       case "left":
        if(this.left > game.board[location].right){
          game.flip(location)
        }
          break;
      case "up":
       if(this.up > game.board[location].down){
         game.flip(location)
       }
         break;
     case "down":
      if(this.down > game.board[location].up){
        game.flip(location)
      }
        break;
      }

    }
  }

}

Game.prototype.displayHand = function() {
  for(var i = 0; i < 5; i++){
  $(".p1."+(i+1)).attr("src","img/"+game.player1.hand[i].id+"_b.png").attr('id',game.player1.hand[i].id);
  $(".p2."+(i+1)).attr("src","img/"+game.player2.hand[i].id+"_b.png").attr('id',game.player2.hand[i].id);
  }
}

var game = new Game();

Game.prototype.flip = function(location){
  console.log("You flipped!");
  if(game.board[location].owner === 'red'){
    game.board[location].owner = 'blue';
  }else{
    game.board[location].owner = 'red';
  }
}

//Player
function Player(){
  this.hand = [],
  this.active = false
}


// Player.prototype.displayHand = function(card) {
//   game.currentID
//   for(var i = 1; i <= 5; i++) {
//     this.hand[i]
//     $("#player1deck").addClass("#img1");
//     $("#player2deck").addClass("#img1")
//   }
// }

//before deck gets shuffled
// Player.prototype.imageId= function(){
//   var giveImageId = [];
//   for(var i=0; i<=deck.length; i ++){
//     giveImageId.push("<img id =" +this.id + "src=" + i + "_b.png>")
//   }
//   return giveImageId;
// }


function Card(top, bottom, left, right){
  this.up = top,
  this.down = bottom,
  this.left = left,
  this.right = right
  this.id = game.currentID,
  game.currentID++;
  game.deck.push(this);
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
      game.turn += 1;
      if(game.turn%2 === 0){
        $(".p1").addClass('card');
        $(".p2").removeClass('card');
      }else{
        $(".p2").addClass('card');
        $(".p1").removeClass('card');
      }
      console.log(game);
      game.placeCard(parseInt(location));
      game.selected = false;
      game.swapActive();
      if(game.turn === 9){
        game.checkWinner();
      }
    }
  }
  });
};

$(document).ready(function() {
  game.shuffle();
  game.dealToPlayers();
  attachListeners();
  //game.assignImageIds();
  game.displayHand();
});
