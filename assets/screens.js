Game.Screen = {};

//Define start screen
Game.Screen.startScreen = {
  enter: function() {console.log("Entered start screen."); },
  exit: function() {console.log("Exited start screen."); },
  render: function(display) {
    //Renders prompt to screen
    display.drawText(1,1, "%c{yellow}Javascript Roguelike");
    display.drawText(1,2, "Press [Enter] to start!");
  },
  handleInput: function(inputType, inputData) {
    //When [Enter] is pressed, go to play screen
    if (inputType === 'keydown') {
      if(inputData.keyCode === ROT.VK_RETURN) {
        Game.switchScreen(Game.Screen.playScreen);
      }
    }
  }
}

//Define Play screen
Game.Screen.playScreen = {
  enter: function() {console.log("Entered Play screen."); },
  exit: function() {console.log("Exited Play screen."); },
  render: function(display) {
    display.drawText(3,5, "%c{red}%b{white}WAOW WHAT A GAME.");
    display.drawText(4,6, "Press [Enter] to win, or [Esc] to lose!");
  },
  handleInput: function(inputType, inputData) {
    if (inputType === 'keydown') {
      //If [Enter] is pressed, go to win screen
      //If [Esc] is pressed, go to lose screen
      if (inputData.keyCode === ROT.VK_RETURN) {
        Game.switchScreen(Game.Screen.winScreen);
      } else if (inputData.keyCode === ROT.VK_ESCAPE) {
        Game.switchScreen(Game.Screen.loseScreen);
      }
    }
  }
}

//Define the Win screen
Game.Screen.winScreen = {
  enter: function() {console.log("Entered Win screen."); },
  exit: function() {console.log("Exited Win screen."); },
  render: function(display) {
    //render our prompt to the screen
    for (var i = 0; i < 22; i++) {
      //Generate random background colors
      var r = Math.round(Math.random() * 255);
      var g  = Math.round(Math.random() * 255);
      var b = Math.round(Math.random() * 255);
      var background = ROT.Color.toRGB([r, g, b]);
      display.drawText(2, i + 1, "%b{" + background + "}You win!");
    }
  },
  handleInput: function(inputType, inputData) {
    //nada to do here
  }
}

//Define losing screen
Game.Screen.loseScreen = {
  enter: function() {console.log("Entered lose screen/"); },
  exit: function() {console.log("Exited lose screen."); },
  render: function(display) {
    //Render out prompt to the screen
    for (var i = 0; i < 22; i++) {
      display.drawText(2, i + 1, "%b{red}You lose! D:");
    }
  },
  handleInput: function(inputType, inputData) {
    //Nothing to do here either
  }
}
