describe('prefixTree', function () {
  var prefixTree;
  beforeEach(function () {
    prefixTree = new PrefixTree();
  });
  describe('initial properties', function () {
    it('should be an instance of a Tree and a PrefixTree', function() {
      expect(prefixTree instanceof Tree).toBeTruthy();
      expect(prefixTree instanceof PrefixTree).toBeTruthy();
    });
    it('should not have a root value', function() {
      expect(prefixTree.value).toEqual(undefined);
    });
  });

  describe('uploading a string', function () {
    it('should have a function called "stringUpload."', function () {
      expect(prefixTree.stringUpload).toEqual(jasmine.any(Function))
    });
    it('should convert a single string into a tree with string.length nodes +1 for root', function () {
      prefixTree.stringUpload('this');
      var counter = 0;
      prefixTree.traverse(function () {
        counter++;
      });
      expect(counter).toEqual('this'.length+1);
    });
  });

  xdescribe('batch uploading of words', function () {
    it('should have a function called "batchUpload."', function () {
      expect(prefixTree.batchUpload).toEqual(jasmine.any(Function))
    });
  })
});