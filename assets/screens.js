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
  _map: null,
  enter: function() {
    console.log("Entered Play screen.");
    var map = [];
    for (var x = 0; x < 80; x++) {
      //Create the nested array for the y vals
      map.push([]);
      //add all the tiles
      for (var y = 0; y < 24; y++) {
        map[x].push(Game.Tile.nullTile);
      }
    }
    //Set up map generator
    var generator = new ROT.Map.Cellular(80, 24);
    generator.randomize(0.5);
    var totalIterations = 3;
    //Iteratively smooth map
    for (var i = 0; i < totalIterations - 1; i++) {
      generator.create;
    }
    //Smooth is final time and update map
    generator.create(function(x,y,v) {
      if (v === 1) {
        map[x][y] = Game.Tile.floorTile;
      } else {
        map[x][y] = Game.Tile.wallTile;
      }
    });
    //Create our map from the tiles
    this._map = new Game.Map(map);
   },
  exit: function() {console.log("Exited Play screen."); },
  render: function(display) {
    //display.drawText(3,5, "%c{red}%b{white}WAOW WHAT A GAME.");
    //display.drawText(4,6, "Press [Enter] to win, or [Esc] to lose!");
    //Iterate through all map cells
    for (var x = 0; x < this._map.getWidth(); x++) {
      for (var y = 0; y < this._map.getHeight(); y++) {
        //Fetch the glyph for the tile and render it to screen
        var glyph = this._map.getTile(x, y).getGlyph();
        display.draw(x, y, glyph.getChar(), glyph.getForeground(), glyph.getBackground());
      }
    }
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
