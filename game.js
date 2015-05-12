var Game = {
  score: 0,
  level: 1,
  timeForLevel: 10000,
  gameRunning: false,
  randomDigit: function() {
    return Math.floor((Math.random()*9)) + 1;
  },
  randomOperator: function() {
    var items = ['+', '-', '*', '/'];
    return items[Math.floor(Math.random()*items.length)];
  },
  startGame: function() {
    Game.gameRunning = true;
    Game.startLevel();
  },
  startLevel: function() {
    Game.leftFirst = Game.randomDigit();
    Game.leftSecond = Game.randomDigit();
    Game.rightFirst = Game.randomDigit();
    Game.rightSecond = Game.randomDigit();
    Game.leftOperator = Game.randomOperator();
    Game.rightOperator = Game.randomOperator();
    Game.levelPoints = Math.floor(Game.timeForLevel/10);

    $('#leftFirst').html(Game.leftFirst);
    $('#leftSecond').html(Game.leftSecond);
    $('#leftOperator').html(Game.leftOperator);
    $('#rightFirst').html(Game.rightFirst);
    $('#rightSecond').html(Game.rightSecond);
    $('#rightOperator').html(Game.rightOperator);

    Game.propagateLevel();
  },
  propagateLevel: function() {
    $('#points').html(Game.timeForLevel);
    $('#score').html(Game.score);
    Game.propagator = window.setInterval(
      function() {
        if(Game.levelPoints <= 0) {
          Game.endGame();
          clearInterval(Game.propagator);
        } else {
          $('#points').html(Game.levelPoints);    
          Game.levelPoints -= 3;
        }
      },
      30
    );
  },
  submitAnswer: function(val) {
    if(Game.gameRunning) {
      var leftValue = eval(Game.leftFirst + Game.leftOperator + Game.leftSecond);
      var rightValue = eval(Game.rightFirst + Game.rightOperator + Game.rightSecond);
      if ((val == 1 && rightValue > leftValue) || (val == 0 && rightValue == leftValue) || (val == -1 && rightValue < leftValue)) {
        Game.score += Game.levelPoints;
        Game.level += 1;
        Game.timeForLevel = Math.floor(Game.timeForLevel);
        Game.startLevel();
      } else {
        Game.endGame();
      }
    }
  },
  endGame: function() {
    Game.levelPoints = 0;
    $('#points').html(Game.levelPoints);
    if(Game.gameRunning) {
      alert('Game Over!');
      console.log('Game Over!');
    }
    Game.gameRunning = false;
  }
};

$( document ).ready(function() {
  Game.startGame();
  $(document).bind('keyup', 'right', function(){
    Game.submitAnswer(1);
  });
  $(document).bind('keyup', 'left', function(){
    Game.submitAnswer(-1);
  });
  $(document).bind('keyup', 'down', function(){
    Game.submitAnswer(0);
  });
});