var HashTable = function(){
  this._limit = 8;
  this._size = 0;
  // There's also a '.each' method that you might find
  // handy once you're working on resizing
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
  var hash = getIndexBelowMaxForKey(key, this._limit);
  var bucket = this._storage.get(hash);

  if (bucket) {
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

HashTable.prototype.resize = function (limit) {
};
