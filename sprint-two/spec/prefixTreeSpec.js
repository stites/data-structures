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
    it('should convert a single string into a tree with string.length nodes +1 for root and +1 for an end-of-word node containing "eow"', function () {
      prefixTree.stringUpload('this');
      var counter = 0;
      prefixTree.traverse(function () {
        counter++;
      });
      expect(counter).toEqual('this'.length+2);
    });
    it('should create a single branch from the root for an uploaded string', function () {
      prefixTree.stringUpload('this');
      var tNode = prefixTree.children[0];
      var hNode = tNode.children[0];
      var iNode = hNode.children[0];
      var sNode = iNode.children[0];
      var eowNode = sNode.children[0];

      expect(prefixTree.value).toEqual(undefined);
      expect(tNode.value).toEqual('t');
      expect(hNode.value).toEqual('h');
      expect(iNode.value).toEqual('i');
      expect(sNode.value).toEqual('s');
      expect(eowNode.value).toEqual('eow');
    });
    it('should not add new elements to the tree if a duplicate string is uploaded', function () {
      prefixTree.stringUpload('this');
      prefixTree.stringUpload('this');
      var counter = 0;
      prefixTree.traverse(function () {
        counter++;
      });
      expect(counter).toEqual('this'.length+2);
    });
    it('should add new elements to the tree only if they diverge from a common branch', function () {
      prefixTree.stringUpload('this');
      var tNode = prefixTree.children[0];
      var thNode = tNode.children[0];
      var thiNode = thNode.children[0];
      var thisNode = thiNode.children[0];
      var thisEOWNode = thisNode.children[0];
      prefixTree.stringUpload('that');
      var thaNode = thNode.children[1];
      var thatNode = thaNode.children[0];
      var thatEOWNode = thatNode.children[0];
      prefixTree.stringUpload('them');
      var theNode = thNode.children[2];
      var themNode = theNode.children[0];
      var themEOWNode = themNode.children[0];
      prefixTree.stringUpload('cat');
      var cNode = prefixTree.children[1];
      var caNode = cNode.children[0];
      var catNode = caNode.children[0];
      var catEOWNode = catNode.children[0];

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
      expect(thisEOWNode.value).toEqual('eow');
      expect(thatEOWNode.value).toEqual('eow');
      expect(themEOWNode.value).toEqual('eow');
      expect(catEOWNode.value) .toEqual('eow');
    });
  });
  describe('batch uploading of words', function () {
    it('should have a function called "batchUpload."', function () {
      expect(prefixTree.batchUpload).toEqual(jasmine.any(Function))
    });

    it('should stringUpload space-deliminated words', function () {
      prefixTree.batchUpload('this that them  cat');
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

      var thisEOWNode = thisNode.children[0];
      var thatEOWNode = thatNode.children[0];
      var themEOWNode = themNode.children[0];
      var catEOWNode = catNode.children[0];
      expect(thisEOWNode.value).toEqual('eow');
      expect(thatEOWNode.value).toEqual('eow');
      expect(themEOWNode.value).toEqual('eow');
      expect(catEOWNode.value) .toEqual('eow');
    });

    it('should stringUpload comma-deliminated words', function () {
      prefixTree.batchUpload('this,,that,them,cat');
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

      var thisEOWNode = thisNode.children[0];
      var thatEOWNode = thatNode.children[0];
      var themEOWNode = themNode.children[0];
      var catEOWNode = catNode.children[0];
      expect(thisEOWNode.value).toEqual('eow');
      expect(thatEOWNode.value).toEqual('eow');
      expect(themEOWNode.value).toEqual('eow');
      expect(catEOWNode.value) .toEqual('eow');
    });

    it('should be able to upload carraige-returned set of strings', function(){
      prefixTree.batchUpload('this\r\rthat\rthem\rcat');
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

      var thisEOWNode = thisNode.children[0];
      var thatEOWNode = thatNode.children[0];
      var themEOWNode = themNode.children[0];
      var catEOWNode = catNode.children[0];
      expect(thisEOWNode.value).toEqual('eow');
      expect(thatEOWNode.value).toEqual('eow');
      expect(themEOWNode.value).toEqual('eow');
      expect(catEOWNode.value) .toEqual('eow');
    });

    it('should be able to upload someofthewords and the first depth will have 26 children', function(){
      prefixTree.batchUpload(someofthewords);
      expect(prefixTree.children.length).toEqual(26);
    });
  });
  describe('merging a branch', function () {
    it('should have a function called mergeBranches', function () {
      expect(prefixTree.mergeBranches).toEqual(jasmine.any(Function));
    });
    it('should merge one-branched tree into the uploaded word', function () {
      prefixTree.stringUpload('this');
      var result = prefixTree.mergeBranches();
      expect(result[0]).toEqual('this');
    });
    it('should merge a multi-word tree and push both results to the resulting array', function () {
      var result;
      prefixTree.stringUpload('the');
      prefixTree.stringUpload('that');
      result = prefixTree.mergeBranches();

      expect(result.length).toEqual(2);
      expect(result).toContain('the');
      expect(result).toContain('that');

      prefixTree.stringUpload('these');
      result = prefixTree.mergeBranches();

      expect(result.length).toEqual(3);
      expect(result).toContain('these');
      expect(result).toContain('the');
      expect(result).toContain('that');

      prefixTree.stringUpload('cat');
      result = prefixTree.mergeBranches();

      expect(result.length).toEqual(4);
      expect(result).toContain('these');
      expect(result).toContain('cat');
      expect(result).toContain('the');
      expect(result).toContain('that');
    });
  });
  describe('autocompleting', function () {
    it('should have a function called "autocomplete"', function () {
      expect(prefixTree.autocomplete).toEqual(jasmine.any(Function));
    });
    it('should take in a string and return an array of strings, or an empty array', function () {
      prefixTree.stringUpload('testing');
      var result = prefixTree.autocomplete('testing');
      expect(result).toEqual(jasmine.any(Array));
      if (result.length === 0){
        expect(result).toEqual([]);
      } else {
        for (var i = 0; i < result.length; i++) {
          expect(result[i]).toEqual(jasmine.any(String));
        };
      }
    });
    it('if the string is a complete word, it should return that word as the first item in the array', function () {
      prefixTree.stringUpload('testing');
      var result = prefixTree.autocomplete('testing');
      expect(result[0]).toEqual('testing');
    });

    it('should return an array of words prefixed by the input', function () {
      prefixTree.stringUpload('test');
      prefixTree.stringUpload('testing');
      prefixTree.stringUpload('tested');
      prefixTree.stringUpload('testable');
      prefixTree.stringUpload('testosterone');
      prefixTree.stringUpload('tes');
      var test = 'test';
      var result = prefixTree.autocomplete(test);
      for (var i = 0; i < result.length; i++) {
        expect(result[i].substring(0,test.length)).toEqual(test);
      };
      expect(result).not.toContain('tes');
    });

    it('should return multiple items array for an input of a single character', function () {
      prefixTree.stringUpload('a');
      prefixTree.stringUpload('able');
      prefixTree.stringUpload('ally');
      prefixTree.stringUpload('alcatraz');
      prefixTree.stringUpload('all');
      var test = 'a';
      var result = prefixTree.autocomplete(test);
      expect(result.length).toBeGreaterThan(1);
    });

    it('should return as many words in the array as there are \'eow\' nodes in the subtree.', function () {
      prefixTree.batchUpload(someofthewords);
      var test = 'a'; var subtree;
      for (var i = 0; i < prefixTree.children.length; i++) {
        if (prefixTree.children[i].value === test){
          subtree = prefixTree.children[i];
        }
      };
      var result = prefixTree.autocomplete(test);
      var eowNodeCounter = 0;
      var cb = function (nodeValue) {
        if (nodeValue === 'eow') eowNodeCounter++;
      };
      subtree.traverse(cb);
      expect(result.length).toEqual(eowNodeCounter);
    });
  });
  describe('T9 autocompletion', function () {
    describe('findT9Elements', function () {
      it('has a T9 helper function called "findT9Elements"', function () {
        expect(prefixTree.findT9Elements).toEqual(jasmine.any(Function));
      });
      it('converts a number into an array of character combinations', function () {
        var arr = prefixTree.findT9Elements(234);
        expect(arr).toEqual(jasmine.any(Array));
        for (var i = 0; i < arr.length; i++) {
          expect(arr[i]).toEqual(jasmine.any(String));
        };
      });
    });
    describe('finding user intent', function () {
      it('has a T9 helper function called "getT9Combinations"', function () {
        expect(prefixTree.getT9Combinations).toEqual(jasmine.any(Function));
      });
      it('returns an array of combinations where a character of every element option is used.', function () {
        prefixTree.batchUpload('the them thesis test');
        var the = 843; // ('the' --> 843) , you could also do ('test' --> 8378)
        expect((the+"").length).toBeGreaterThan(0);
        var elementArray = prefixTree.findT9Elements(the);
        expect(elementArray.length).toBeGreaterThan(0);
        var combos = prefixTree.getT9Combinations(elementArray.slice(0));
        expect(combos.length).toBeGreaterThan(0);
        expect(combos).toContain('the');
        for (var combo = 0; combo < combos.length; combo++) {
          for (var characterLevel = 0; characterLevel < combos[combo].length; characterLevel++) {
            for (var i = 0; i < elementArray[characterLevel].length; i++) {
              expect(elementArray[characterLevel].indexOf(combos[combo][characterLevel]) > -1).toEqual(true);
            };
          };
        };
      });
    });
    describe('filtering user intent with bloomfilters', function () {
      it('has a bloomFilter which is accessible at ._bloomFilter', function () {
        expect(prefixTree._bloomFilter instanceof BloomFilter).toEqual(true);
      });
      it('should have a function which regenerates the bloomfilter for large uploads called "genNewBloomFilter"', function () {
        expect(prefixTree.genNewBloomFilter).toEqual(jasmine.any(Function));
      });
      it('should call bloomfilter.add when uploading a string', function () {
        spyOn(BloomFilter.prototype, 'add');
        prefixTree.stringUpload('this');
        expect(BloomFilter.prototype['add']).toHaveBeenCalled();
      });
    });
    it('should have a function called "t9"', function () {
      expect(prefixTree.t9).toEqual(jasmine.any(Function));
    });
  })
});