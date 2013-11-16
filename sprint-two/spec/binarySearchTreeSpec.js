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

  it("should have properties named 'left' and 'right'", function() {
    expect('left' in binarySearchTree).toEqual(true);
    expect('right' in binarySearchTree).toEqual(true);
  });

  describe("Insert functionality", function() {

    it("should be able to add only numeric values", function() {
      binarySearchTree.insert(1);
      expect(binarySearchTree.children[0].value).toEqual(1);
      binarySearchTree.insert("1");
      expect(binarySearchTree.children[1]).toEqual(undefined);
      binarySearchTree.insert([]);
      expect(binarySearchTree.children[1]).toEqual(undefined);
    });

    it("should change the parent's left and right property to hold pointers to nodes", function() {
      binarySearchTree.insert(1);
      expect(binarySearchTree.left).toEqual(binarySearchTree.children[0]);
      binarySearchTree.insert(11);
      expect(binarySearchTree.right).toEqual(binarySearchTree.children[1]);
    });

    it("it should not add more than two children", function() {
      binarySearchTree.insert(9);
      binarySearchTree.insert(110);
      binarySearchTree.insert(150);
      expect(binarySearchTree.children.length).toEqual(2);
    });

    xit("it should not change the left and right properties after they are set", function() {
      binarySearchTree.insert(1);
      expect(binarySearchTree.left).toEqual(binarySearchTree.children[0]);
      binarySearchTree.insert(11);
      expect(binarySearchTree.right).toEqual(binarySearchTree.children[1]);
    });
  });

});
