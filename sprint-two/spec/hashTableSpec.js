describe("hashTable", function() {
  var hashTable;

  beforeEach(function() {
    hashTable = new HashTable();
    v1 = 'val1';
    v2 = 'val2';
    v3 = 'val3';
    v4 = 'val4';
    hash = getIndexBelowMaxForKey(v1,8);
  });

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
    hashTable.insert(v2, v2);
    expect(hashTable._size).toEqual(3);
  });

  describe('resize functionality', function(){

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
      hashTable.insert(v2, v2);
      expect(hashTable._limit).toEqual(16);
    });

  });



});
