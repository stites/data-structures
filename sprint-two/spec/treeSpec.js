describe("tree", function() {
  var tree;

  beforeEach(function() {
    tree = makeTree();
  });

  it("should have methods named 'addChild' and 'contains', and a property named 'value'", function() {
    expect(tree.addChild).toEqual(jasmine.any(Function));
    expect(tree.contains).toEqual(jasmine.any(Function));
    expect('value' in tree).toBe(true);
  });
  it("should not have a child when makeTree() is invoked initially.", function(){
    expect(tree.children).toEqual(undefined);
  });
  it("should be able to receive a value when invoking makeTree().", function(){
    tree = makeTree("this is a value");
    expect(tree.value).toEqual("this is a value");
  });
});
