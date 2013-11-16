var makeSet = function(){
  var set = Object.create(makeSet.prototype);
  set._storage = undefined;

  return set;
};

makeSet.prototype.add = function(value){
  if (!this._storage) {
    this._storage = {};
  }

  this._storage[value] = true;
};

makeSet.prototype.contains = function(value){
  return !!this._storage[value];
};

makeSet.prototype.remove = function(value){
  delete this._storage[value];
};
