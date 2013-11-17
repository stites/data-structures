var HashTable = function(){
  this._limit = 8;

  // Use a limited array to store inserted elements.
  // It'll keep you from using too much space. Usage:
  //
  //   limitedArray.set(3, 'hi');
  //   limitedArray.get(3); // alerts 'hi'
  //
  // There's also a '.each' method that you might find
  // handy once you're working on resizing
  this._storage = makeLimitedArray(this._limit);
};

HashTable.prototype.insert = function(key, value){
  var hash = getIndexBelowMaxForKey(key, this._limit);

  var bucket = this._storage.get(hash) || [];

  for (var i = 0; i < bucket.length; i++) {
    var pair = bucket[i];
    if (pair[0] === key) {
      pair[1] = value;
      return;
    }
  }

  bucket.push([key, value]);
  this._storage.set(hash, bucket);
};

HashTable.prototype.retrieve = function(key){
  var hash = getIndexBelowMaxForKey(key, this._limit);
  var bucket = this._storage.get(hash);

  if (bucket) {
    for (var i = 0; i < bucket.length; i++) {
      var pair = bucket[i];
      if (pair[0] === key) {
        return pair[1];
      }
    }
  }

  return undefined;
};

HashTable.prototype.remove = function(key){
  var hash = getIndexBelowMaxForKey(key, this._limit);
  var bucket = this._storage.get(hash);

  if (bucket) {
    for (var i = 0; i < bucket.length; i++) {
      var pair = bucket[i];
      if (pair[0] === key) {
        return bucket.splice(i, 1);
      }
    }
  }

  return undefined;
};

// NOTE: For this code to work, you will NEED the code from hashTableHelpers.js
// Start by loading those files up and playing with the functions it provides.
// You don't need to understand how they work, only their interface is important to you
