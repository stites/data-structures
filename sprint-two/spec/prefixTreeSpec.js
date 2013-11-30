describe('prefixTree', function () {
  var prefixTree;
  beforeEach(function () {
    prefixTree = new PrefixTree();
  });
  describe('initial properties', function () {
    it('should be an instance of a Tree and a PrefixTree', function() {
      expect(prefixTree instanceof Tree).toBeTruthy();
      expect(prefixTree instanceof PrefixTree).toBeTruthy();
    })
  })

});