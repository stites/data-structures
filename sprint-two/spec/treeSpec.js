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
});
