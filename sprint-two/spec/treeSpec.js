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
      // debugger;
      expect(tree.children[0].children[0]['value']).toEqual(8);
    });
  });

  xit("", function(){
    expect(tree.value).toEqual("this is a value");
  });
});
