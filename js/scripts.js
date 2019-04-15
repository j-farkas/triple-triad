function Game(){
  this.deck = [],
  this.score = 5,
  this.player1 = new Player(),
  this.player1.active = true,
  this.player2 = new Player(),
  this.turn = 0,
  this.currentID = 1,
  this.board = [0,1,2,3,4,5,6,7,8],
  this.selected = false;
}

var game = new Game();

function Player(){
  this.hand = [],
  this.active = false
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


function attachListeners() {
  $("body").on("click", "img.card", function() {
    game.selected = this.id;
  });
  $(".container").on("click", ".col-md-4", function() {
    if(game.selected !== false){
      var location = $(this).attr('class');
      location = location.charAt(location.length-1);
      console.log(location);
      $("img."+location).attr("src","img/"+game.selected+"_b.png");
      $("#"+game.selected).remove();
      game.selected = false;
      console.log(game.selected);
    }
  });
};

$(document).ready(function() {
  attachListeners();
});
