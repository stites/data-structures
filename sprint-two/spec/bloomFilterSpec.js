describe("bloomFilter", function() {
  var bloomFilter, m, k;

  beforeEach(function() {
    m = 18;
    k = 3;
    bloomFilter = new BloomFilter(m, k);

    v1 = 'val1';
    v2 = 'val2';
    maskv1h0 = parseInt('000000000000010000',2); //[4, 10, 4]
    maskv1h1 = parseInt('000000010000000000',2); //[4, 10, 4]
    maskv1h2 = parseInt('000000000000010000',2); //[4, 10, 4]
    maskv2h0 = parseInt('000000000000100000',2); // [5, 6, 5]
    maskv2h1 = parseInt('000000000001000000',2); // [5, 6, 5]
    maskv2h2 = parseInt('000000000000100000',2); // [5, 6, 5]
    fakeMask = parseInt('010000000000000000',2); // [5, 6, 5]
    // Initialized Hash Functions
    // IN:(str, max) OUT:(hash)
    bloomFilter._hashStorage[0] = getIndexBelowMaxForKey;
    bloomFilter._hashStorage[1] = djb2;
    bloomFilter._hashStorage[2] = universalHash;
  });

  describe('initial methods and properties of a bloom filter', function(){
    it("should have methods named 'remove', 'add', and 'query'", function() {
      expect(bloomFilter.remove).toEqual(jasmine.any(Function));
      expect(bloomFilter.add).toEqual(jasmine.any(Function));
      expect(bloomFilter.query).toEqual(jasmine.any(Function));
    });
    it("should have property '_limit' which holds the number of bits in our array", function() {
      expect(bloomFilter._limit).toEqual(m);
    });
    it("should have property '_storage' which is initialized to 0", function() {
      expect(typeof bloomFilter._storage).toEqual('number');
      expect(bloomFilter._storage).toEqual(0);
    });
    it("should have property '_removedStorage' which is initialized to 0", function() {
      expect(typeof bloomFilter._removedStorage).toEqual('number');
      expect(bloomFilter._removedStorage).toEqual(0);
    });
    it("should have property '_hashStorage' which holds k number of hash functions", function() {
      expect(bloomFilter._hashStorage).toEqual(jasmine.any(Array));
      expect(bloomFilter._hashStorage.length).toEqual(k);
      for (var i = 0; i < bloomFilter._hashStorage.length; i++) {
        expect(typeof bloomFilter._hashStorage[i] === 'function').toBeTruthy();
      }
    });
  });
  describe('add function', function(){
    it("should change the storage to be a different value", function() {
      var previousBitArray = bloomFilter._storage;
      bloomFilter.add(v1);
      expect(bloomFilter._storage).toNotEqual(previousBitArray);
    });
    it("should make sure that the initialized bitwise masks work on one value", function() {
      bloomFilter.add(v1);
      expect(bloomFilter._storage&maskv1h0).toEqual(maskv1h0);
      expect(bloomFilter._storage&maskv1h1).toEqual(maskv1h1);
      expect(bloomFilter._storage&maskv1h2).toEqual(maskv1h2);
      expect(bloomFilter._storage&fakeMask).toNotEqual(fakeMask);
    });
    it("should make add multiple items and ensure that the initialized bitwise masks work", function() {
      bloomFilter.add(v1);
      bloomFilter.add(v2);
      expect(bloomFilter._storage&maskv1h0).toEqual(maskv1h0);
      expect(bloomFilter._storage&maskv1h1).toEqual(maskv1h1);
      expect(bloomFilter._storage&maskv1h2).toEqual(maskv1h2);
      expect(bloomFilter._storage&maskv2h0).toEqual(maskv2h0);
      expect(bloomFilter._storage&maskv2h1).toEqual(maskv2h1);
      expect(bloomFilter._storage&maskv2h2).toEqual(maskv2h2);
      expect(bloomFilter._storage&fakeMask).toNotEqual(fakeMask);
    });
  });
  describe('remove function', function(){
    it("should change the removeStorage to be a different value", function() {
      var previousBitArray = bloomFilter._removedStorage;
      bloomFilter.remove(v1);
      expect(bloomFilter._removedStorage).toNotEqual(previousBitArray);
    });
    it("should make sure that the initialized bitwise masks work on one value", function() {
      bloomFilter.remove(v1);
      expect(bloomFilter._removedStorage&maskv1h0).toEqual(maskv1h0);
      expect(bloomFilter._removedStorage&maskv1h1).toEqual(maskv1h1);
      expect(bloomFilter._removedStorage&maskv1h2).toEqual(maskv1h2);
      expect(bloomFilter._removedStorage&fakeMask).toNotEqual(fakeMask);
    });
    it("should make add multiple items and ensure that the initialized bitwise masks work", function() {
      bloomFilter.remove(v1);
      bloomFilter.remove(v2);
      expect(bloomFilter._removedStorage&maskv1h0).toEqual(maskv1h0);
      expect(bloomFilter._removedStorage&maskv1h1).toEqual(maskv1h1);
      expect(bloomFilter._removedStorage&maskv1h2).toEqual(maskv1h2);
      expect(bloomFilter._removedStorage&maskv2h0).toEqual(maskv2h0);
      expect(bloomFilter._removedStorage&maskv2h1).toEqual(maskv2h1);
      expect(bloomFilter._removedStorage&maskv2h2).toEqual(maskv2h2);
      expect(bloomFilter._removedStorage&fakeMask).toNotEqual(fakeMask);
    });
  });
  describe('query function', function(){
    it("should return a value of 0 if an item is not in _storage using bitmasks", function() {
    });
    it("should return a positive float if an item is in _storage using bitmasks", function() {
    });
    it("should return the probability of an item being in _storage", function() {
    });
  });

});
