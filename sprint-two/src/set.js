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

makeSet.prototype.contains = function(){
};

makeSet.prototype.remove = function(value){
	delete this._storage[value];
};
