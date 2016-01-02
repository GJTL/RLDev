var Game = {
  _display: null,
  _currentScreen: null,
  init: function() {
    //Any necessary initialization goes here
    this._display = new ROT.Display({width: 80, height: 24});
    //Create helper for binding to events
    //and making it sent to screen
    var game = this; //so we dont lose this. wtf
    var bindEventToScreen = function(event) {
      window.addEventListener(event, function(e) {
        //When an event is reveived, send it to the screen if there is one
        if(game._currentScreen !== null) {
          //Send the event type & data to screen
          game._currentScreen.handleInput(event, e);
        }
      });
    }
    //Bind keyboard events
    bindEventToScreen('keydown');
    bindEventToScreen('keyup');
    bindEventToScreen('keypress');
  },
  getDisplay: function() {
    return this._display;
  },
  switchScreen: function(screen) {
    //If we had a screen before, tell it that we exited
    if(this._currentScreen !== null) {
      this._currentScreen.exit();
    }
    //Clear display
    this.getDisplay().clear();
    //Update our current screen, tell it we entered, and then render it
    this._currentScreen = screen;
    if (!this._currentScreen !== null) {
      this._currentScreen.enter();
      this._currentScreen.render(this._display);
    }
  }
}

window.onload = function() {
  //check for rot.js support in this browser
  if (!ROT.isSupported()) {
    alert("The rot.js library is not supported by your browser.");
  } else {
    //init the game
    Game.init();
    //add the container to our html page
    document.body.appendChild(Game.getDisplay().getContainer());
    //Load start screen
    Game.switchScreen(Game.Screen.startScreen);
  }
}
