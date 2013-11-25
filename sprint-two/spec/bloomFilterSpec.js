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
    it("should have methods named 'getHashes', 'add', and 'query'", function() {
      expect(bloomFilter.getHashes).toEqual(jasmine.any(Function));
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
    it("should have property '_hashStorage' which holds k number of hash functions", function() {
      expect(bloomFilter._hashStorage).toEqual(jasmine.any(Array));
      expect(bloomFilter._hashStorage.length).toEqual(k);
      for (var i = 0; i < bloomFilter._hashStorage.length; i++) {
        expect(typeof bloomFilter._hashStorage[i] === 'function').toBeTruthy();
      }
    });
  });

  describe('add function', function(){
    xit("should run the input against each hash function in the bloomfilter", function() {
      // spyOn(window, 'getIndexBelowMaxForKey');
      for (var i = 0; i < bloomFilter._hashStorage.length; i++) {
        spy = sinon.spy(bloomFilter._hashStorage[i]);
        bloomFilter.add(v1);
        expect(spy.called).toBeTruthy();
      };
      // expect(window.getIndexBelowMaxForKey).toHaveBeenCalled();
    });
    it("should change the storage to be a different value", function() {
      var previousBitArray = bloomFilter._storage;
      bloomFilter.add(v1);
      expect(bloomFilter._storage).toNotEqual(previousBitArray);
    });
    it("should have property '_hashStorage' which holds k number of hash functions", function() {
      expect(bloomFilter._hashStorage).toEqual(jasmine.any(Array));
      expect(bloomFilter._hashStorage.length).toEqual(k);
      for (var i = 0; i < bloomFilter._hashStorage.length; i++) {
        expect(typeof bloomFilter._hashStorage[i] === 'function').toBeTruthy();
      }
    });
    it("should make sure that the initialized bitwise masks work", function() {
      bloomFilter.add(v1);
      expect(bloomFilter._storage&maskv1h0).toEqual(maskv1h0);
      expect(bloomFilter._storage&maskv1h1).toEqual(maskv1h1);
      expect(bloomFilter._storage&maskv1h2).toEqual(maskv1h2);
      expect(bloomFilter._storage&fakeMask).toNotEqual(fakeMask);
    });
  });

});
