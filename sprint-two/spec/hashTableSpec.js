describe("hashTable", function() {
  var hashTable;

  beforeEach(function() {
    hashTable = new HashTable();
  });

  it("should have methods named 'insert' and 'retrieve", function() {
    expect(hashTable.insert).toEqual(jasmine.any(Function));
    expect(hashTable.retrieve).toEqual(jasmine.any(Function));
  });

  it("should insert an element into the HashTable", function() {
    var v1 = 'val1';
    var hash = getIndexBelowMaxForKey(v1,8);
    hashTable.insert(v1, v1);
    expect(hashTable._storage.get(hash)).toEqual(v1);
  });

  it("should retrieve an element from the HashTable", function() {
    var v1 = 'val1';
    var hash = getIndexBelowMaxForKey(v1,8);
    hashTable.insert(v1, v1);
    expect(hashTable.retrieve(v1)).toEqual(v1);
  });

  it("should not retrieve an element not in the HashTable", function() {
    var v1 = 'val1';
    var v2 = 'val2';
    var hash = getIndexBelowMaxForKey(v1,8);
    hashTable.insert(v1, v1);
    expect(hashTable.retrieve(v2)).toEqual(undefined);
  });

  it("should insert multiple elements into the HashTable", function(){
    var v1 = 'val1', v2 = 'val2';
    hashTable.insert(v1, v1);
    hashTable.insert(v2, v2);
    expect(hashTable.retrieve(v1)).toEqual(v1);
    expect(hashTable.retrieve(v2)).toEqual(v2);
  });

  xit("should handle hash function collisions", function(){
    // force the hash function to return 0
    spyOn(window, 'getIndexBelowMaxForKey').andReturn(0);
    var v1 = 'val1', v2 = 'val2';
    hashTable.insert(v1, v1);
    hashTable.insert(v2, v2);
    expect(hashTable.retrieve(v1)).toEqual(v1);
    expect(hashTable.retrieve(v2)).toEqual(v2);
  });

  // add more tests!
});
