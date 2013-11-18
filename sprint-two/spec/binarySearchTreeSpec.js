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

    it("left's value should always be less than it's parent's value for one level", function() {
      binarySearchTree.insert(1);
      binarySearchTree.insert(11);
      expect(binarySearchTree.left.value).toBeLessThan(binarySearchTree.value);

    });

    it("right's value should always be greater than it's parent's value for one level", function() {
      binarySearchTree.insert(1);
      binarySearchTree.insert(11);
      expect(binarySearchTree.right.value).toBeGreaterThan(binarySearchTree.value);
    });

    it("left's value should always be less than it's parent's value for multiple levels", function() {
      binarySearchTree.insert(5);
      binarySearchTree.insert(1);
      binarySearchTree.insert(12);
      binarySearchTree.insert(15);
      binarySearchTree.insert(6);
      binarySearchTree.insert(11);

      expect(binarySearchTree.left.value).toBeLessThan(binarySearchTree.value);
      expect(binarySearchTree.left.left.value).toBeLessThan(binarySearchTree.left.value);
      expect(binarySearchTree.right.left.value).toBeLessThan(binarySearchTree.right.value);

    });

    it("left's value should always be less than it's parent's value for multiple levels [edge case]", function() {
      binarySearchTree.insert(5);
      binarySearchTree.insert(7);
      binarySearchTree.insert(1);

      expect(binarySearchTree.left.right.value).toBeGreaterThan(binarySearchTree.left.value);
      expect(binarySearchTree.left.left.value).toBeLessThan(binarySearchTree.left.value);

    });

    it("right's value should always be greater than it's parent's value for multiple levels", function() {
      binarySearchTree.insert(5);
      binarySearchTree.insert(1);
      binarySearchTree.insert(12);
      binarySearchTree.insert(15);
      binarySearchTree.insert(6);
      binarySearchTree.insert(11);
      expect(binarySearchTree.right.value).toBeGreaterThan(binarySearchTree.value);
      expect(binarySearchTree.left.right.value).toBeGreaterThan(binarySearchTree.left.value);
      expect(binarySearchTree.right.right.value).toBeGreaterThan(binarySearchTree.right.value);
    });

    it("should not add duplicated values", function() {
      binarySearchTree.insert(10);
      expect(binarySearchTree.children).toEqual(undefined);
      binarySearchTree.insert(5);
      expect(binarySearchTree.children[0].value).toEqual(5);
      binarySearchTree.insert(5);
      expect(binarySearchTree.children[0].value).toEqual(5);
      expect(binarySearchTree.children[1]).toEqual(undefined);
    });

    it("it should not change the left and right properties after they are set", function() {
      binarySearchTree.insert(5);
      var left = binarySearchTree.left;
      binarySearchTree.insert(1);
      expect(binarySearchTree.left).toEqual(left);
      binarySearchTree.insert(11);
      var right = binarySearchTree.right;
      binarySearchTree.insert(15);
      expect(binarySearchTree.right).toEqual(right);
    });
  });

  describe("Contains functionality", function() {
    it("should be able to return a boolean", function() {
      expect(binarySearchTree.contains(10)).toEqual(true);
      expect(binarySearchTree.contains(11)).toEqual(false);
    });

    it("should determine if a number is in a tree", function() {
      binarySearchTree.insert(5);
      binarySearchTree.insert(1);
      binarySearchTree.insert(11);
      binarySearchTree.insert(15);
      expect(binarySearchTree.contains(11)).toEqual(true);
      expect(binarySearchTree.contains(22)).toEqual(false);
    });
  });

  describe("depthFirstLog functionality", function() {
    it("should be able to operate on the first value", function() {

      var cb = function (nodeValue) {
        return nodeValue += 1;
      };
      binarySearchTree.depthFirstLog(cb);
      expect(binarySearchTree.value).toEqual(11);
    });

    it("should be able to operate on every value in a tree", function() {
      binarySearchTree.insert(5);
      binarySearchTree.insert(1);
      binarySearchTree.insert(11);
      binarySearchTree.insert(15);

      var cb = function (nodeValue) {
        return nodeValue += 1;
      };

      binarySearchTree.depthFirstLog(cb);

      expect(binarySearchTree.contains(10)).toEqual(false);
      expect(binarySearchTree.contains(5)).toEqual(false);
      expect(binarySearchTree.contains(1)).toEqual(false);
      expect(binarySearchTree.contains(15)).toEqual(false);

      expect(binarySearchTree.contains(11)).toEqual(true);
      expect(binarySearchTree.contains(6)).toEqual(true);
      expect(binarySearchTree.contains(2)).toEqual(true);
      expect(binarySearchTree.contains(12)).toEqual(true);
      expect(binarySearchTree.contains(16)).toEqual(true);
    });
  });

  describe('depth property', function(){
    it("should have a property named 'depth' defaulted to 0 at the root", function() {
      expect('depth' in binarySearchTree).toEqual(true);
      expect(binarySearchTree.depth).toEqual(0 + 1);
    });

    it("should indicate the level of a node", function() {
      binarySearchTree.insert(5);
      binarySearchTree.insert(2);
      binarySearchTree.insert(7);
      binarySearchTree.insert(15);
      binarySearchTree.insert(12);
      binarySearchTree.insert(17);
      expect(binarySearchTree.left.depth).toEqual(1 + 1);
      expect(binarySearchTree.right.depth).toEqual(1 + 1);
      expect(binarySearchTree.left.left.depth).toEqual(2 + 1);
      expect(binarySearchTree.left.right.depth).toEqual(2 + 1);
      expect(binarySearchTree.right.left.depth).toEqual(2 + 1);
      expect(binarySearchTree.right.right.depth).toEqual(2 + 1);
    });
  });

  describe('breadthFirstLog', function () {
    it("should have a function named 'breadthFirstLog'", function() {
      expect(binarySearchTree.breadthFirstLog).toEqual(jasmine.any(Function));
    });

    it("should be able to operate on the root value", function() {
      var cb = function (nodeValue) {
        return nodeValue += 1;
      };
      binarySearchTree.breadthFirstLog(cb);
      expect(binarySearchTree.value).toEqual(11);
      binarySearchTree.breadthFirstLog(cb);
      expect(binarySearchTree.value).toEqual(12);
    });

    it("should be able to operate on all nodes breadth-first order", function() {
      var result = [];
      var cb = function (nodeValue) {
        result.push(nodeValue)
        return nodeValue;
      };
      binarySearchTree.insert(5);
      binarySearchTree.insert(2);
      binarySearchTree.insert(7);
      binarySearchTree.insert(15);
      binarySearchTree.insert(12);
      binarySearchTree.insert(17);
      binarySearchTree.breadthFirstLog(cb);
      expect(result.slice(0,1)).toContain(10);
      expect(result.slice(1,3)).toContain(5);
      expect(result.slice(1,3)).toContain(15);
      expect(result.slice(3,7)).toContain(2);
      expect(result.slice(3,7)).toContain(7);
      expect(result.slice(3,7)).toContain(12);
      expect(result.slice(3,7)).toContain(17);
    });
  });

  describe("rebalancing functionality", function() {
    it('should have a function called \'rebalance\' and \'checkDepth\'', function () {
      expect(binarySearchTree.rebalance).toEqual(jasmine.any(Function));
      expect(binarySearchTree.checkDepth).toEqual(jasmine.any(Function));
    });

    it('should make \'checkDepth\' return the max and min levels of branches at any given time.', function () {
      spyOn(binarySearchTree, 'rebalance').andReturn(undefined);
      binarySearchTree.insert(5);
      var compare = binarySearchTree.checkDepth();
      expect(compare[1] - compare[0]).toEqual(1);
      binarySearchTree.insert(2);
      compare = binarySearchTree.checkDepth();
      expect(compare[1] - compare[0]).toEqual(2);
      binarySearchTree.insert(7);
      compare = binarySearchTree.checkDepth();
      expect(compare[1] - compare[0]).toEqual(2);
      binarySearchTree.insert(15);
      compare = binarySearchTree.checkDepth();
      expect(compare[1] - compare[0]).toEqual(1);
      binarySearchTree.insert(12);
      compare = binarySearchTree.checkDepth();
      expect(compare[1] - compare[0]).toEqual(0);
    });

    it('should call rebalance when the min branch level is half the depth of the max branch level', function () {
      spyOn(binarySearchTree, 'rebalance');
      binarySearchTree.insert(9);
      binarySearchTree.insert(8);
      expect(binarySearchTree.rebalance).toHaveBeenCalled();
    });

    xit('should change the root to the median value in the tree', function () {
      binarySearchTree.insert(9);
      binarySearchTree.insert(8);
      expect(binarySearchTree.value).toEqual(9);
    });

    xit('should rebalance a skewed tree of 10-9-8-7-6 to have', function () {
    });


  });

});
