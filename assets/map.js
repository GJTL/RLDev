Game.Map = function(tiles) {
  this._tiles = tiles;
  //cache the width & height based on the length
  //of the dimensions of the tiles array
  this._width = tiles.length;
  this._height = tiles[0].length;
};

//Ye Olde Standarde Getters
Game.Map.prototype.getWidth = function() {
  return this._width;
};
Game.Map.prototype.getHeight = function() {
  return this._height;
};

//Gets the tile for a given coordinate sent
Game.Map.prototype.getTile =  function(x, y) {
  //Make sure we are inside the bounds. If !, return null tile
  if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
    return Game.Tile.nullTile;
  } else {
    return this._tiles[x][y] || Game.Tiles.nullTile;
  }
};
