var BloomFilter = function (m, k) {
  this._limit = m;
  this._storage = new Int32Array(this._limit);
  this._hashes = Array(k);
  // Initialized Hash Functions
  // IN:(str, max) OUT:(hash)
  this._hashes[0] = getIndexBelowMaxForKey;
  this._hashes[1] = djb2;
  this._hashes[2] = universalHash;
}

BloomFilter.prototype.getHashes = function() {
};

BloomFilter.prototype.add = function() {
};

BloomFilter.prototype.query = function() {
};

