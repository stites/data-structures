describe("hashTable", function() {
  var hashTable;

  beforeEach(function() {
    hashTable = new HashTable();
    v1 = 'val1';
    v2 = 'val2';
    v3 = 'val3';
    v4 = 'val4';
    v5 = 'val5';
    v6 = 'val6';
    v7 = 'val7';
    hash = getIndexBelowMaxForKey(v1,8);
  });

  describe('general functionality', function(){
    it("should have methods named 'insert' and 'retrieve", function() {
      expect(hashTable.insert).toEqual(jasmine.any(Function));
      expect(hashTable.retrieve).toEqual(jasmine.any(Function));
    });

    it("should insert an element into the HashTable", function() {
      hashTable.insert(v1, v1);
      expect(hashTable._storage.get(hash,v1)[0][1]).toEqual(v1);
    });

    it("should retrieve an element from the HashTable", function() {
      hashTable.insert(v1, v1);
      expect(hashTable.retrieve(v1)).toEqual(v1);
    });

    it("should not retrieve an element not in the HashTable", function() {
      hashTable.insert(v1, v1);
      expect(hashTable.retrieve(v2)).toEqual(undefined);
    });

    it("should insert multiple elements into the HashTable", function(){
      hashTable.insert(v1, v1);
      hashTable.insert(v2, v2);
      expect(hashTable.retrieve(v1)).toEqual(v1);
      expect(hashTable.retrieve(v2)).toEqual(v2);
    });

    it("should remove an indicated element from a HashTable with a single value", function() {
      hashTable.insert(v1, v1);
      hashTable.remove(v1);
      expect(hashTable.retrieve(v1)).toEqual(undefined);
    });

    it("should remove an indicated element from a HashTable with multiple values", function() {
      hashTable.insert(v1, v1);
      hashTable.insert(v2, v2);
      hashTable.insert(v3, v3);
      hashTable.insert(v4, v4);
      hashTable.remove(v3);
      expect(hashTable.retrieve(v3)).toEqual(undefined);
    });

    it("should handle hash function collisions", function(){
      spyOn(window, 'getIndexBelowMaxForKey').andReturn(0);
      hashTable.insert(v1, v1);
      hashTable.insert(v2, v2);
      expect(hashTable.retrieve(v1)).toEqual(v1);
      expect(hashTable.retrieve(v2)).toEqual(v2);
    });

    it("should have a _size property on the hash table", function(){
      expect('_size' in hashTable).toEqual(true);
    });

    it("should make _size store the number of items in the hash table", function(){
      hashTable.insert(v1, v1);
      expect(hashTable._size).toEqual(1);
      hashTable.insert(v2, v2);
      expect(hashTable._size).toEqual(2);
      hashTable.insert(v3, v3);
      expect(hashTable._size).toEqual(3);
      hashTable.insert(v4, v4);
      expect(hashTable._size).toEqual(4);
      hashTable.remove(v4);
      expect(hashTable._size).toEqual(3);
      hashTable.insert(v4, v4);
      expect(hashTable._size).toEqual(4);
      hashTable.remove(v4);
      expect(hashTable._size).toEqual(3);

    });
  });

  describe('resize-up functionality', function(){
    it("should have a resize function", function(){
      expect(hashTable.resize).toEqual(jasmine.any(Function));
    });

    it("should double the _limit when size reaches >75% of the _limit", function(){
      hashTable.insert(v1, v1);
      hashTable.insert(v2, v2);
      hashTable.insert(v2, v2);
      hashTable.insert(v1, v1);
      hashTable.insert(v2, v2);
      hashTable.insert(v2, v2);
      expect(hashTable._limit).toEqual(16);
    });

    it("should replace _storage with a new _storage of doubled size", function(){
      hashTable.insert(v1, v1);
      hashTable.insert(v2, v2);
      hashTable.insert(v3, v3);
      hashTable.insert(v4, v4);
      hashTable.insert(v5, v5);
      hashTable.insert(v6, v6);
      hashTable.insert(v7, v7);

      expect(hashTable.retrieve(v1)).toEqual(v1);
      expect(hashTable.retrieve(v2)).toEqual(v2);
      expect(hashTable.retrieve(v3)).toEqual(v3);
      expect(hashTable.retrieve(v4)).toEqual(v4);
      expect(hashTable.retrieve(v5)).toEqual(v5);
      expect(hashTable.retrieve(v6)).toEqual(v6);
      expect(hashTable.retrieve(v7)).toEqual(v7);
      expect(hashTable._limit).toEqual(16);

    });
  });


  describe('resize-down functionality', function(){

    it("should half the _limit when size reaches <25% of the _limit", function(){
      hashTable.insert(v1, v1);
      hashTable.insert(v1, v1);
      hashTable.remove(v1);
      expect(hashTable._limit).toEqual(4);
    });

    it("should replace _storage with a new _storage of half the size", function(){
      hashTable.insert(v1, v1);
      hashTable.insert(v2, v2);
      hashTable.remove(v2);
      expect(hashTable.retrieve(v1)).toEqual(v1);
      expect(hashTable.retrieve(v2)).toNotEqual(v2);
      expect(hashTable._limit).toEqual(4);
    });
  });

});
