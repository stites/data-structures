describe("bloomFilter", function() {
  var bloomFilter, m, k;

  beforeEach(function() {
    m = 18;
    k = 3;
    bloomFilter = new BloomFilter(m, k);

    v1 = 'val1';
    v2 = 'val2';
    v3 = 'val3';
    v4 = 'val4';
    v5 = 'val5';
    v6 = 'val6';
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
    it("should have methods named 'remove', 'add', 'fp', 'fn', and 'query'", function() {
      expect(bloomFilter.remove).toEqual(jasmine.any(Function));
      expect(bloomFilter.add).toEqual(jasmine.any(Function));
      expect(bloomFilter.query).toEqual(jasmine.any(Function));
      expect(bloomFilter.fp).toEqual(jasmine.any(Function));
      expect(bloomFilter.fn).toEqual(jasmine.any(Function));
    });
    it("should have property '_m' which holds the number of bits in our array", function() {
      expect(bloomFilter._m).toEqual(m);
    });
    it("should have property '_n' which holds the number of items added to our filter", function() {
      expect(bloomFilter._n).toEqual(0);
    });
    it("should have property '_removed' which holds the number of items removed to our filter", function() {
      expect(bloomFilter._removed).toEqual(0);
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
    it("should throw an error if hash functions are not filled", function() {
      bloomFilter._hashStorage[0] = undefined;
      expect(function () {
        bloomFilter.add(v1)
      }).toThrow(new Error ('expected '+k+' hash functions'));
    });
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
    it("should increase the _n property by one for each added value", function() {
      expect(bloomFilter._n).toEqual(0);
      bloomFilter.add(v1);
      expect(bloomFilter._n).toEqual(1);
      bloomFilter.add(v1);
      expect(bloomFilter._n).toEqual(1);
      bloomFilter.add(v2);
      expect(bloomFilter._n).toEqual(2);
      bloomFilter.add(v3);
      expect(bloomFilter._n).toEqual(3);
    });
    it("should not increase the _n property by one if the value does not change _storage", function() {
      bloomFilter.add(v1);
      expect(bloomFilter._n).toEqual(1);
      bloomFilter.add(v1);
      expect(bloomFilter._n).toEqual(1);
      bloomFilter.add(v2);
      expect(bloomFilter._n).toEqual(2);
      bloomFilter.add(v2);
      expect(bloomFilter._n).toEqual(2);
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
  describe('query function', function(){
    it("should return a value of 0 if an item is not in _storage, using bitmasks", function() {
      expect(bloomFilter.query(v1)).toEqual(0);
      expect(bloomFilter.query(v2)).toEqual(0);
      bloomFilter.add(v1);
      expect(bloomFilter.query(v1)).toNotEqual(0);
      expect(bloomFilter.query(v2)).toEqual(0);
    });
    it("should return a value of 1 if an item is in _storage, using bitmasks", function() {
      bloomFilter.add(v1);
      bloomFilter.add(v2);
      expect(bloomFilter.query(v1)).toEqual(1);
      expect(bloomFilter.query(v2)).toEqual(1);
    });
  });
  describe('remove function', function(){
    it("should not remove an item if it's bitmask is not in _storage", function() {
      bloomFilter.remove(v1);
      expect(bloomFilter._removedStorage).toEqual(0);
    });
    it("should return undefined if it's bitmask is not in _storage", function() {
      expect(bloomFilter.remove(v1)).toEqual(undefined);
    });
    it("should remove an item if it's bitmask is in _storage", function() {
      bloomFilter.add(v1);
      bloomFilter.remove(v1);
      expect(bloomFilter._removedStorage).toNotEqual(0);
    });
    it("should return the item if it's bitmask is successfully added to _removedStorage", function() {
      bloomFilter.add(v1);
      expect(bloomFilter.remove(v1)).toEqual(v1);
    });
    it("should change the removeStorage to be a different value", function() {
      bloomFilter.add(v1);
      var previousBitArray = bloomFilter._removedStorage;
      bloomFilter.remove(v1);
      expect(bloomFilter._removedStorage).toNotEqual(previousBitArray);
    });
    it("should make sure that the initialized bitwise masks work on one value", function() {
      bloomFilter.add(v1);
      bloomFilter.remove(v1);
      expect(bloomFilter._removedStorage&maskv1h0).toEqual(maskv1h0);
      expect(bloomFilter._removedStorage&maskv1h1).toEqual(maskv1h1);
      expect(bloomFilter._removedStorage&maskv1h2).toEqual(maskv1h2);
      expect(bloomFilter._removedStorage&fakeMask).toNotEqual(fakeMask);
    });
    it("should increase the _removed property by one for each removed value", function() {
      bloomFilter.add(v1);
      expect(bloomFilter._removed).toEqual(0);
      bloomFilter.remove(v1);
      expect(bloomFilter._removed).toEqual(1);
      bloomFilter.remove(v1);
      expect(bloomFilter._removed).toEqual(1);
      bloomFilter.add(v2);
      bloomFilter.remove(v2);
      expect(bloomFilter._removed).toEqual(2);
      bloomFilter.add(v3);
      bloomFilter.remove(v3);
      expect(bloomFilter._removed).toEqual(3);
    });
    it("should not increase the _removed property by one if the value does not change _removedStorage", function() {
      bloomFilter.add(v1);
      bloomFilter.add(v2);
      bloomFilter.remove(v1);
      expect(bloomFilter._removed).toEqual(1);
      bloomFilter.remove(v1);
      expect(bloomFilter._removed).toEqual(1);
      bloomFilter.remove(v2);
      expect(bloomFilter._removed).toEqual(2);
      bloomFilter.remove(v2);
      expect(bloomFilter._removed).toEqual(2);
    });
    it("should make add multiple items and ensure that the initialized bitwise masks work", function() {
      bloomFilter.add(v1);
      bloomFilter.add(v2);
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
  describe('fp function', function(){
    describe('should return the false-positive rate of the bloom filter (see http://goo.gl/YsbSt8)', function(){
      it('should return 0 when nothing is added to the filter', function () {
        expect(bloomFilter.fp()).toEqual(0);
      });
      it('should return ~0.2530 for (m/n) === 3 and k === 3', function () {
        // n === 6
        bloomFilter.add(v1);
        bloomFilter.add(v2);
        bloomFilter.add(v3);
        bloomFilter.add(v4);
        bloomFilter.add(v5);
        bloomFilter.add(v6);
        expect(bloomFilter.fp()).toBeGreaterThan(0.2530-0.015);
        expect(bloomFilter.fp()).toBeLessThan(0.2530+0.015);
      });
      it('should return 0.0609 for (m/n) === 6 and k === 3', function () {
        // n === 3
        bloomFilter.add(v1);
        bloomFilter.add(v2);
        bloomFilter.add(v3);
        expect(bloomFilter.fp()).toBeGreaterThan(0.0609-0.005);
        expect(bloomFilter.fp()).toBeLessThan(0.0609+0.005);
      });
      it('should return 0.0228 for (m/n) === 9 and k === 3', function () {
        // n === 2
        bloomFilter.add(v1);
        bloomFilter.add(v2);
        expect(bloomFilter.fp()).toBeGreaterThan(0.0228-0.002);
        expect(bloomFilter.fp()).toBeLessThan(0.0228+0.002);
      });
    });
  });
  xdescribe('fn function', function(){
    describe('should return the false-negative rate of the bloom filter (see http://goo.gl/YsbSt8)', function(){
      it('', function () {
        
      });
    });
  });
});
