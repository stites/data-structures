var HashTable = function(){
  this._limit = 8;
  this._size = 0;
  this._storage = makeLimitedArray(this._limit);
};

HashTable.prototype.insert = function(key, value){
  var hash = getIndexBelowMaxForKey(key, this._limit);
  var bucket = this._storage.get(hash) || [];

  this.iterateBucket(bucket, key, function (context, index) {
    context[index][1] = value;
    return;
  });

  bucket.push([key, value]);
  this._size += 1;
  this._storage.set(hash, bucket);

  if (this._size >= (this._limit * 0.75)){
    this.resize('up');
  }
};

HashTable.prototype.retrieve = function(key){
  var hash = getIndexBelowMaxForKey(key, this._limit);
  var bucket = this._storage.get(hash);

  if (bucket) {
    return this.iterateBucket(bucket, key, function(context, index){
      return context[index][1];
    });
  }

  return undefined;
};

HashTable.prototype.remove = function(key){
  if (this._size <= this._limit*0.25) {
    this.resize('down');
  }

  var hash = getIndexBelowMaxForKey(key, this._limit);
  var bucket = this._storage.get(hash);

  if (bucket) {
    (this._size > 0) && this._size--;
    return this.iterateBucket(bucket, key, function (context, index) {
      return context.splice(index, 1);
    });
  }

  return undefined;
};

HashTable.prototype.iterateBucket = function (bucket, key, cb) {
  for (var i = 0; i < bucket.length; i++) {
    var pair = bucket[i];
    if (pair[0] === key) {
      return cb(bucket, i);
    }
  }
};

HashTable.prototype.resize = function (direction) {
  if (direction === 'up'){
    this._limit = this._limit * 2;
  } else if (direction === 'down') {
    this._limit = this._limit / 2;
  }
  this._size = 0;
  var oldStorage = this._storage;
  this._storage = makeLimitedArray(this._limit);
  var newHash = this;

  oldStorage.each(function(bucket, hash, storage){
    if (Array.isArray(storage[hash])){
      for (var i = 0; i < storage[hash].length; i++) {
        var key = storage[hash][i][0];
        var val = storage[hash][i][1];
        newHash.insert(key, val);
      };
    }
  });
};
