var PrefixTree = function PrefixTree(value, parent) {
  Tree.apply(this, arguments);
  this._bloomFilter = new BloomFilter(1000000, 3); //1M entries
  this._bloomFilter._hashStorage[0] = getIndexBelowMaxForKey;
  this._bloomFilter._hashStorage[1] = djb2;
  this._bloomFilter._hashStorage[2] = universalHash;
}

PrefixTree.prototype = Object.create(Tree.prototype);
PrefixTree.prototype.constructor = PrefixTree;

PrefixTree.prototype.stringUpload = function(str) {
  this._bloomFilter.add(str);

  var traversalChildAdd = function (node, word) {
    var endOfWord = false;
    var firstChar = word.substr(0,1);
    var addChar = true;
    var comparisonVal;

    if (word === ''){
      endOfWord = true;
    }

    if (node.children !== undefined){
      for (var existingParentIdx = 0; existingParentIdx < node.children.length; existingParentIdx++) {
        comparisonVal = node.children[existingParentIdx].value;
        if (comparisonVal === firstChar) {
          addChar = false;
          break;
        }
        if (endOfWord && comparisonVal === 'eow') {
          return;
        }
      }
    }

    if (addChar && endOfWord) {
      node.addChild('eow');
      return;
    } else if (addChar){
      node.addChild(firstChar);
      var newParentIdx = node.children.length - 1;
      traversalChildAdd(node.children[newParentIdx], word.substr(1));
    } else {
      traversalChildAdd(node.children[existingParentIdx], word.substr(1));
    }
  }

  traversalChildAdd(this, str);
};

PrefixTree.prototype.batchUpload = function(bigStr) {
  var littleStrings = bigStr.split(/,+|\s+|\r+/);
  for (var word = 0; word < littleStrings.length; word++) {
    this.stringUpload(littleStrings[word]);
  };
};

PrefixTree.prototype.autocomplete = function (str) {
  var subtree = this.findSubTree(this, str);
  return this.mergeBranches(subtree, str);
};

PrefixTree.prototype.findSubTree = function(node, str) {
  var firstChar = str.substr(0,1);
  var restOfStr = str.substr(1);
  var path;
  for (var i = 0; i < node.children.length; i++) {
    if (node.children[i].value === firstChar){
      path = node.children[i];
      break;
    }
  }
  if (restOfStr === ''){
    return path;
  }
  return this.findSubTree(path, restOfStr);
};

PrefixTree.prototype.mergeBranches = function(treeRoot, prefix) {
  treeRoot = treeRoot || this;
  prefix = prefix || '';
  var result = [];
  (function depthFirstMerge (node, str) {
    str = str || '';
    var child;
    if (node.children){
      for (var i = 0; i < node.children.length; i++) {
        child = node.children[i];
        if (child.value === 'eow'){
          result.push(str);
          if (node.children.length === 1){
            return;
          }
        }
      }
      for (var i = 0; i < node.children.length; i++) {
        child = node.children[i];
        depthFirstMerge(child, str+child.value);
      }
    }
  })(treeRoot, prefix);
  return result;
};

PrefixTree.prototype.t9 = function(number) {
};

PrefixTree.prototype.findT9Elements = function(number) {
  var userInput = number + '';
  var userIntent;
  if (userInput.indexOf('e') > -1) {
    // t9 will not work on scientific notation
    throw new Error('input is in scientific notation');
  } else if (userInput.indexOf(1) > -1 || userInput.indexOf(0) > -1) {
    // t9 does not include 0 or 1.
    throw new Error('t9 does not support 0 or 1.')
  }
  userIntent = userInput.replace(/2/g, 'abc,' ).replace(/3/g, 'def,' ).replace(/4/g, 'ghi,' )
                        .replace(/5/g, 'jkl,' ).replace(/6/g, 'mno,' ).replace(/7/g, 'pqrs,')
                        .replace(/8/g, 'tuv,' ).replace(/9/g, 'wxyz,').split(',').slice(0,-1);
  return userIntent;
};

PrefixTree.prototype.getT9Combinations = function(depthOptions) {
  var results = [];
  var filter = this._bloomFilter;
  var recursionFunTime = function (aggregation, remainingOptions) {
    var currentOptions = remainingOptions.shift().split('');
    for (var option = 0; option < currentOptions.length; option++) {
      var comboCopy = aggregation.slice(0);
      comboCopy.push(currentOptions[option]);

      if (remainingOptions.length === 0) {
        var newEntry = comboCopy.join('');
        debugger;
        if (filter.query(newEntry)){
          results.push(newEntry);
        }
      } else {
        var remainingCopy = remainingOptions.slice(0);
        recursionFunTime(comboCopy, remainingCopy);
      }
    };
  };
  recursionFunTime([], depthOptions);


  return results;
};

PrefixTree.prototype.genNewBloomFilter = function(m) {
  var allWords = this.mergeBranches();
  if (m < allWords.length) throw new Error('make your bloomFilter larger');
  this._bloomFilter = new BloomFilter(m, 3);
  this._bloomFilter._hashStorage[0] = getIndexBelowMaxForKey;
  this._bloomFilter._hashStorage[1] = djb2;
  this._bloomFilter._hashStorage[2] = universalHash;
  for (var i = 0; i < allWords.length; i++) {
    this._bloomFilter.add(allWords[i]);
  };
};
