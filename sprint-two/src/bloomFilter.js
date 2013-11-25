var BloomFilter = function (m, k) {
  this._limit = m;
  this._storage = new Int32Array(this._limit);
  this._hashes = Array(k);
}

BloomFilter.prototype.getHashes = function() {
};

BloomFilter.prototype.add = function() {
};

BloomFilter.prototype.query = function() {
};

var hashFn1 = getIndexBelowMaxForKey; //IN:(str, max) OUT:(hash)