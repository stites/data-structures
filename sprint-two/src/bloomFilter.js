var BloomFilter = function (m, k) {
  this._limit = m;
  this._storage = 0;
  this._hashStorage = Array(k);
}

BloomFilter.prototype.getHashes = function() {
};

BloomFilter.prototype.add = function(strVal) {
  var mask = this.getMask(strVal);
  this._storage |= mask;
};

BloomFilter.prototype.query = function(strVal) {
};

BloomFilter.prototype.getMask = function(strVal) {
  var mask = 0;
  for (var i = 0; i < this._hashStorage.length; i++) {
    mask |= 1 << this._hashStorage[i](strVal, this._limit);
  };
  return mask;
};


