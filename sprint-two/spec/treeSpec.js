describe("tree", function() {
  var tree;

  beforeEach(function() {
    tree = makeTree("root");
  });

  it("should have methods named 'addChild' and 'contains', and a property named 'value'", function() {
    expect(tree.addChild).toEqual(jasmine.any(Function));
    expect(tree.contains).toEqual(jasmine.any(Function));
    expect('value' in tree).toBe(true);
  });

  it("should have property named 'parent'", function() {
    expect('parent' in tree).toBe(true);
  });

  it("should not have a child when makeTree() is invoked initially.", function(){
    expect(tree.children).toEqual(undefined);
  });

  it("should not have a value when makeTree() is invoked without arguments.", function(){
    tree = makeTree();
    expect(tree.value).toEqual(undefined);
  });

  it("should be able to receive a value when invoking makeTree().", function(){
    expect(tree.value).toEqual("root");
  });

  describe("addChild", function () {
    it("should be able to add a new leaf to children array", function(){
      tree.addChild(7);
      tree.addChild(8);
      expect(tree.children[0]['value']).toEqual(7);
      expect(tree.children[1]['value']).toEqual(8);
    });

    it("should be able to add a new leaf to a child in the root's children array", function(){
      tree.addChild(7);
      tree.children[0].addChild(8);
      expect(tree.children[0].children[0]['value']).toEqual(8);
    });
  });

  describe("contains", function () {

    it("should return a boolean expressing if the passed value is in the root and only the root exists", function(){
      expect(tree.contains("root")).toEqual(true);
      expect(tree.contains("branch")).toEqual(false);
    });

    it("should return a boolean expressing if the passed value is in the tree", function(){
      tree.addChild(1);
      expect(tree.contains(1)).toEqual(true);
      expect(tree.contains(100)).toEqual(false);
      tree.children[0].addChild(2);
      tree.children[0].addChild(3);
      expect(tree.contains(2)).toEqual(true);
      expect(tree.contains(3)).toEqual(true);
      expect(tree.contains(4)).toEqual(false);
      tree.children[0].children[1].addChild(4);
      tree.children[0].children[1].addChild(5);
      expect(tree.contains(300)).toEqual(false);
      expect(tree.contains(4)).toEqual(true);
      expect(tree.contains(500)).toEqual(false);
    });
  });

  describe("parent functionality", function () {

    it("should contains a parent property that holds null when only the root exists", function(){
      expect(tree.parent).toEqual(null);
    });

    it("should have a single layer of children whose parent property's holds a reference to the parent", function(){
      tree.addChild(1);
      tree.addChild(3);
      expect(tree.children[0].parent).toEqual(tree);
      expect(tree.children[1].parent).toEqual(tree);
    });

    it("should have multi layer of children whose parent property's holds a reference to their parent", function(){
      tree.addChild(1);
      var layer1 = tree.children
      expect(layer1[0].parent).toEqual(tree);

      layer1[0].addChild(2);
      layer1[0].addChild(3);
      var layer2 = layer1[0].children
      expect(layer2[0].parent).toEqual(layer1[0]);
      expect(layer2[1].parent).toEqual(layer1[0]);
    });

  });

  describe("removeFromParent functionality", function () {

    it("should have method named 'removeFromParent'", function(){
      expect(tree.removeFromParent).toEqual(jasmine.any(Function));
    });

    it("should return the tree that it's passed", function(){
      tree.addChild(1);
      var orphan = tree.removeFromParent(tree.children[0]);
      expect(orphan).toEqual(jasmine.any(Object));
      expect(orphan.value).toEqual(1);
    });

    it("should remove a child from the parent's children array with a single node", function(){
      tree.addChild(1);
      tree.removeFromParent(tree.children[0]);
      expect(tree.children).toEqual(undefined);
    });

    it("should remove a child from the parent's children array with multiple nodes", function(){
      tree.addChild(2);
      tree.addChild(4);
      tree.addChild(8);
      tree.removeFromParent(tree.children[0]);
      expect(tree.children[0].value).toEqual(4);
    });

    xit("should remove reference from root and a single child", function(){
      tree.addChild(1);
      var orphan = tree.removeFromParent(tree.children[0]);
      expect(orphan.parent).toEqual(null);
      expect(orphan.children).toEqual(undefined);
      expect(tree.children).toEqual(undefined);
    });

  });
});
