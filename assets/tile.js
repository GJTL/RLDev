Game.Tile = function(properties) {
    properties = properties || {};
    //call the Glyph constructor w/our properties
    Game.Glyph.call(this, properties);
    //set up the properties. We use false by default.
    this._isWalkable = properties['isWalkable'] || false;
    this._isDiggable = properties['isDiggable'] || false;
};

//Make tiles inherit all Glyph functionality
Game.Tile.extend(Game.Glyph);

//Yo str8 up basic gettas
Game.Tile.prototype.isWalkable = function() {
  return this._isWalkable;
}
Game.Tile.prototype.isDiggable = function() {
  return this._isDiggable;
}


Game.Tile.nullTile = new Game.Tile(new Game.Glyph());
Game.Tile.floorTile = new Game.Tile({
    character: '.',
    isWalkable: true
});
Game.Tile.wallTile = new Game.Tile({
    character: '#',
    foreground: 'goldenrod',
    isDiggable: true
});
