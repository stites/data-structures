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
    it('should create a single branch from the root for an uploaded string', function () {
      prefixTree.stringUpload('this');
      var tNode = prefixTree.children[0];
      var hNode = tNode.children[0];
      var iNode = hNode.children[0];
      var sNode = iNode.children[0];

      expect(prefixTree.value).toEqual(undefined);
      expect(tNode.value).toEqual('t');
      expect(hNode.value).toEqual('h');
      expect(iNode.value).toEqual('i');
      expect(sNode.value).toEqual('s');
    });
    it('should not add new elements to the tree if a duplicate string is uploaded', function () {
      prefixTree.stringUpload('this');
      prefixTree.stringUpload('this');
      var counter = 0;
      prefixTree.traverse(function () {
        counter++;
      });
      expect(counter).toEqual('this'.length+1);
    });
    it('should add new elements to the tree only if they diverge from a common branch', function () {
      prefixTree.stringUpload('this');
      var tNode = prefixTree.children[0];
      var thNode = tNode.children[0];
      var thiNode = thNode.children[0];
      var thisNode = thiNode.children[0];
      prefixTree.stringUpload('that');
      var thaNode = thNode.children[1];
      var thatNode = thaNode.children[0];
      prefixTree.stringUpload('them');
      var theNode = thNode.children[2];
      var themNode = theNode.children[0];
      prefixTree.stringUpload('cat');
      var cNode = prefixTree.children[1];
      var caNode = cNode.children[0];
      var catNode = caNode.children[0];

      expect(prefixTree.value).toEqual(undefined);
      expect(tNode.value)   .toEqual('t');
      expect(thNode.value)  .toEqual('h');
      expect(thiNode.value) .toEqual('i');
      expect(thisNode.value).toEqual('s');
      expect(thaNode.value) .toEqual('a');
      expect(thatNode.value).toEqual('t');
      expect(theNode.value) .toEqual('e');
      expect(themNode.value).toEqual('m');
      expect(cNode.value)   .toEqual('c');
      expect(caNode.value)  .toEqual('a');
      expect(catNode.value) .toEqual('t');
    });
  });

  describe('batch uploading of words', function () {
    it('should have a function called "batchUpload."', function () {
      expect(prefixTree.batchUpload).toEqual(jasmine.any(Function))
    });

    it('should stringUpload space-deliminated words', function () {
      prefixTree.batchUpload('this that them cat');
      var tNode = prefixTree.children[0];
      var thNode = tNode.children[0];
      var thiNode = thNode.children[0];
      var thisNode = thiNode.children[0];
      var thaNode = thNode.children[1];
      var thatNode = thaNode.children[0];
      var theNode = thNode.children[2];
      var themNode = theNode.children[0];
      var cNode = prefixTree.children[1];
      var caNode = cNode.children[0];
      var catNode = caNode.children[0];

      expect(prefixTree.value).toEqual(undefined);
      expect(tNode.value)   .toEqual('t');
      expect(thNode.value)  .toEqual('h');
      expect(thiNode.value) .toEqual('i');
      expect(thisNode.value).toEqual('s');
      expect(thaNode.value) .toEqual('a');
      expect(thatNode.value).toEqual('t');
      expect(theNode.value) .toEqual('e');
      expect(themNode.value).toEqual('m');
      expect(cNode.value)   .toEqual('c');
      expect(caNode.value)  .toEqual('a');
      expect(catNode.value) .toEqual('t');
    });

  })
});