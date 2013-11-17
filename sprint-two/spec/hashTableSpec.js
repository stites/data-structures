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
    // force the hash function to return 0
    spyOn(window, 'getIndexBelowMaxForKey').andReturn(0);
    hashTable.insert(v1, v1);
    hashTable.insert(v2, v2);
    expect(hashTable.retrieve(v1)).toEqual(v1);
    expect(hashTable.retrieve(v2)).toEqual(v2);
  });

});
