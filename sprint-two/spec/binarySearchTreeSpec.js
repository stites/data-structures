describe("binarySearchTree", function() {
  var binarySearchTree;

  beforeEach(function() {
    binarySearchTree = makeBinarySearchTree(10);
  });

  it("should have methods named 'insert', 'contains', and 'depthFirstLog", function() {
    expect(binarySearchTree.insert).toEqual(jasmine.any(Function));
    expect(binarySearchTree.contains).toEqual(jasmine.any(Function));
    expect(binarySearchTree.depthFirstLog).toEqual(jasmine.any(Function));
  });

  it("should receive only numeric value as root", function() {
    expect(binarySearchTree.value).toEqual(10);
    binarySearchTree = makeBinarySearchTree("10");
    expect(binarySearchTree.value).toEqual(undefined);
    binarySearchTree = makeBinarySearchTree([]);
    expect(binarySearchTree.value).toEqual(undefined);
  });



  xdescribe("Insert functionality", function() {

    it("should be able to add a root element", function() {
      binarySearchTree.insert(1);
      expect(binarySearchTree.value).toEqual(1);
    });

  });

});
