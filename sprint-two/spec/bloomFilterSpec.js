describe("bloomFilter", function() {
  var bloomFilter, m, k;

  beforeEach(function() {
    m = 18;
    k = [];
    bloomFilter = new BloomFilter(m, k);
  });
  describe('initial methods and properties of a bloom filter', function(){
    it("should have methods named 'getHashes', 'add', and 'query'", function() {
      expect(bloomFilter.getHashes).toEqual(jasmine.any(Function));
      expect(bloomFilter.add).toEqual(jasmine.any(Function));
      expect(bloomFilter.query).toEqual(jasmine.any(Function));
    });
    xit("should have properties '_storage' & '_hashes' which hold m bits and k hashes", function() {
      expect(bloomFilter._storage).toEqual(jasmine.any(Array));
      expect(bloomFilter._hashes).toEqual(jasmine.any(Array));
    });
    xit("should have '_storage' & '_hashes' hold k items for each hash function", function() {
      expect(bloomFilter._storage.length).toEqual(k);
      expect(bloomFilter._hashes.length).toEqual(k);
    });
  });

});
