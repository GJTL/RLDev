//Check if rot.js works in this browser
if(!ROT.isSupported()){
alert("The rot.js library is not supported by your browser.");
} else {
//GAME ON BBY
//create a display 80 chars wide and 20 chars high
var display = new ROT.Display({width:80, height:20});
var container = display.getContainer();
//add container to our HTML page
document.body.appendChild(container);
var foreground, background, colors;
for (var i = 0; i <15; i++) {
  //Calcualte the foreground color, getting progressively darker
  //and the background color getting progressively lighter
  foreground = ROT.Color.toRGB([255 - (i*20), 255 - (i*20), 255- (i*20)]);
  background = ROT.Color.toRGB([i*20, i*20, i*20]);
  //Create color format specifier
  colors = "%c{" + foreground + "}%b{" + background + "}";
  //Draw text at col 2, row i
  display.drawText(2, i, colors + "Shiny, Captain.");
}
}
