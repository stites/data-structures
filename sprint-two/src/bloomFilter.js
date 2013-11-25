var BloomFilter = function (m, k) {
  this._limit = m;
  this._storage = 0;
  this._hashStorage = Array(k);
}

BloomFilter.prototype.getHashes = function() {
};

BloomFilter.prototype.add = function(strVal) {
  var results = [];
  for (var i = 0; i < this._hashStorage.length; i++) {
    results.push(this._hashStorage[i](strVal, this._limit));
  };
  var mask = 0;
  for (var i = 0; i < results.length; i++) {
    mask |= (1 << results[i]);
  };
  this._storage |= mask;
};

BloomFilter.prototype.query = function() {
};

