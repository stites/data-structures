describe("bloomFilter", function() {
  var bloomFilter, m, k;

  beforeEach(function() {
    m = 18;
    k = 3;
    bloomFilter = new BloomFilter(m, k);
  });
  describe('initial methods and properties of a bloom filter', function(){
    it("should have methods named 'getHashes', 'add', and 'query'", function() {
      expect(bloomFilter.getHashes).toEqual(jasmine.any(Function));
      expect(bloomFilter.add).toEqual(jasmine.any(Function));
      expect(bloomFilter.query).toEqual(jasmine.any(Function));
    });
    it("should have property '_limit' which holds the number of bits in our array", function() {
      expect(bloomFilter._limit).toEqual(m);
    });
    it("should have property '_storage' is an instance of Int32Array of length m", function() {
      expect(bloomFilter._storage instanceof Int32Array).toEqual(true);
      expect(bloomFilter._storage.length).toEqual(m);
    });
    it("should have property '_hashes' which holds k number of hash functions", function() {
      expect(bloomFilter._hashes).toEqual(jasmine.any(Array));
      expect(bloomFilter._hashes.length).toEqual(k);
      for (var i = 0; i < bloomFilter._hashes.length; i++) {
        expect(typeof bloomFilter._hashes[i] === 'function' ||
               typeof bloomFilter._hashes[i] === 'undefined').toBeTruthy();
      }
    });
  });

});
