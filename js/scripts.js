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
  this.suddenDeathMode = false;
}

function Card(top, bottom, left, right){
  this.up = top,
  this.down = bottom,
  this.left = left,
  this.right = right
  this.id = game.currentID,
  game.currentID++;
  game.deck.push(this);
}

Game.prototype.checkScore = function(){
  var blue = 0;
  this.deck.forEach(function(card){
    if(card.owner === "blue"){
      blue++;
    }
  })
  $(".scoreblue").html("<h1 class='bluescore'>"+blue+"</h1>");
  $(".scorered").html("<h1 class='redscore'>"+(10-blue)+"</h1>");
  if(game.turn%2===0){
    $(".bluescore").addClass("blinker")
  }else{
    $(".redscore").addClass("blinker")
  }
  if(game.turn % 9 === 0 && game.turn > 0){
    $(".winner").toggle();
    if(blue > 5){
      $(".winner").text("Blue Wins");
    }else if(blue <5){
      $(".winner").text("Red Wins");
    }else{
      if(game.suddenDeathMode === true) {
        $(".winner").text("SUDDEN DEATH");
        this.suddenDeath();
      }
      else {
        $(".winner").text("Nobody Wins");
      }
    }
  }
}



Game.prototype.shuffle = function() {
  var i = 0;
  var j = 0;
  var temp = null;
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

function Player(){
  this.hand = [],
  this.active = false
}

Game.prototype.swapActive = function(){
  if(this.player1.active === true){
    this.player2.active = true;
    this.player1.active = false;
  }else{
    this.player2.active = false;
    this.player1.active = true;
  }
}

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
      this.board[location].checkFlip(neighbors[i],direction)
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

function restartGame(){
  $("img.board").removeAttr("src");
  game = new Game();
  cardList();
  $(".p1").removeAttr("src");
  $(".p2").removeAttr("src");
  $(".p1").addClass("card");
  $(".p2").removeClass("card");
  $(".addGlow").removeClass("addGlow");
  $(".winner").hide();
  game.shuffle();
  game.dealToPlayers();
  game.displayHand();
  game.checkScore();
}


Game.prototype.displayHand = function() {
  for(var i = 0; i < 5; i++){
  $(".p1."+(i+1)).attr("src","img/"+game.player1.hand[i].id+"_b.png").attr('id',game.player1.hand[i].id);
  $(".p2."+(i+1)).attr("src","img/"+game.player2.hand[i].id+"_r.png").attr('id',game.player2.hand[i].id);
  }
}

var game = new Game();

Game.prototype.flip = function(location){
  if(game.board[location].owner === 'red'){
    game.board[location].owner = 'blue';
    $("img.board."+location).addClass('animated flip');
    $("img.board."+location).attr("src","img/"+game.board[location].id+"_b.png");
  }else{
    game.board[location].owner = 'red';
    $("img.board."+location).addClass('animated flip');
    $("img.board."+location).attr("src","img/"+game.board[location].id+"_r.png");

  }
  setTimeout(function(){
    $(".animated").removeClass("flip");
    $(".animated").removeClass("animated"); }, 300);
};

Game.prototype.suddenDeath = function() {
  this.player1.hand = [];
  this.player2.hand = [];
  for(var i = 0; i < 10; i++) {
    if(this.deck[i].owner === "blue") {
      this.player1.hand.push(this.deck[i]);
    } else {
      this.player2.hand.push(this.deck[i]);
    }
  }
  game.board = [0,1,2,3,4,5,6,7,8];
  $("img.board").removeAttr("src");
  $(".p1").removeAttr("src");
  $(".p2").removeAttr("src");
  $(".p1").addClass("card");
  $(".p2").removeClass("card");
  $(".addGlow").removeClass("addGlow");
  game.displayHand();
  game.suddenDeath = true;
}

//Player
function Player(){
  this.hand = [],
  this.active = false
}


function addCard(location){
  if(game.selected !== false){
    if(game.board[location] >= 0){
      if(game.turn%2 === 0){
        $("img.board."+location).attr("src","img/"+game.selected+"_b.png");
      }else{
        if(game.turn%2 === 1){
          $("img.board."+location).attr("src","img/"+game.selected+"_r.png");
        }
      }
    $("#"+game.selected).removeAttr("src");
    game.board[location]=game.findCard(game.selected);
    game.turn += 1;
    if(game.turn%2 === 0){
      $(".p1").addClass('card');
      $(".p2").removeClass('card');
    }else{
      $(".p2").addClass('card');
      $(".p1").removeClass('card');
    }
    game.placeCard(parseInt(location));
    game.selected = false;
    game.swapActive();
    game.checkScore();
    }
  }
}

function drag_handler(ev) {
 ev.dataTransfer.setData("text/plain", ev.target.id);
  var drag = ev.path[0].getAttribute("id");
  if((game.findCard(drag).owner === 'red' && game.turn%2 ===1) ||(game.findCard(drag).owner === 'blue' && game.turn%2 ===0)){
   game.selected = drag;
  }
}

function dragover_handler(ev) {
 ev.preventDefault();
}

function drop_handler(ev) {
 ev.preventDefault();
 var location = ev.path[0].getAttribute("class");
 location = location.charAt(location.length-1);
 addCard(location);
 ev.dataTransfer.clearData();
}

function attachListeners() {
  $("body").on("click", "img.card", function() {
    game.selected = this.id;
    $(".addGlow").removeClass("addGlow");
    $("#" + this.id).addClass("addGlow");
  });

  $("body").on("click", "h1.restart", function() {
    restartGame();
  });

  $(".container").on("click", ".col-md-4", function() {
    var location = $(this).attr('class');
    location = location.charAt(location.length-1);
    addCard(location);
  });

  $("#suddenDeathToggle").click(function() {
    if(game.suddenDeathMode === false) {
      game.suddenDeathMode = true;
    } else {
      game.suddenDeathMode = false;
    }
  })
};

$(document).ready(function() {
  cardList();
  game.shuffle();
  game.dealToPlayers();
  attachListeners();
  game.displayHand();
  game.checkScore();
});
