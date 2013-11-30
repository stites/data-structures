var BloomFilter = function (m, k) {
  this._m = m;
  this._k = k;
  this._n = 0;
  this._storage = 0;
  this._removed = 0;
  this._removedStorage = 0;
  this._hashStorage = Array(k);
}

BloomFilter.prototype.add = function(strVal) {
  var mask = this.getMask(strVal);
  var check = this._storage;
  this._storage |= mask;
  if (check !== this._storage){
    this._n += 1;
  }
};

BloomFilter.prototype.query = function(strVal) {
  var mask = this.getMask(strVal);
  var test = mask&this._storage;
  return (test !== mask) ? 0 : 1;
};

BloomFilter.prototype.fp = function() {
  m = this._m;
  k = this._k;
  n = this._n;
  return Math.pow(1 - Math.pow(1-(1/m), k*n), k);
};

BloomFilter.prototype.fn = function() {
  m = this._m;
  k = this._k;
  n = this._removed;
  return Math.pow(1 - Math.pow(1-(1/m), k*n), k);
};

BloomFilter.prototype.remove = function(strVal) {
  var mask = this.getMask(strVal);
  var checkRemoved = this._removedStorage;
  if ((this._storage&mask) === mask){
    this._removedStorage |= mask;
    if (checkRemoved !== this._removedStorage){
      this._removed += 1;
      return strVal;
    }
  }
};

BloomFilter.prototype.getMask = function(strVal) {
  var mask = 0;
  for (var i = 0; i < this._hashStorage.length; i++) {
    if (this._hashStorage[i] === undefined) {
      throw new Error('expected '+this._hashStorage.length+' hash functions');
    }
    mask |= 1 << this._hashStorage[i](strVal, this._m);
  };
  return mask;
};

BloomFilter.prototype.addHash = function(hashFn) {
  var counter = 0;
  var storage = this._hashStorage;
  for (var i = 0; i < storage.length; i++) {
    if (storage[i] === undefined){
      counter++;
    }
  };
  if (counter < storage.length){
    storage.push(hashFn);
  } else {
    throw new Error('Hash storage is full!');
  }
};


