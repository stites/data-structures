var PrefixTree = function PrefixTree(value, parent) {
  Tree.apply(this, arguments);
}

PrefixTree.prototype = Object.create(Tree.prototype);
PrefixTree.prototype.constructor = PrefixTree;

PrefixTree.prototype.stringUpload = function(str) {

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
  return (subtree === undefined) ?[] : this.mergeBranches(subtree, str);
};

PrefixTree.prototype.findSubTree = function(node, str) {
  var firstChar = str.substr(0,1);
  var restOfStr = str.substr(1);
  var path;
  if (!node) {
    return path;
  } else {
    for (var i = 0; i < node.children.length; i++) {
      if (node.children[i].value === firstChar){
        path = node.children[i];
        break;
      }
    }
    if (restOfStr === ''){
      return path;
    }
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
  var recursionFunTime = function (aggregation, remainingOptions) {
    var currentOptions = remainingOptions.shift().split('');
    for (var option = 0; option < currentOptions.length; option++) {
      var comboCopy = aggregation.slice(0);
      comboCopy.push(currentOptions[option]);

      if (remainingOptions.length === 0) {
        results.push(comboCopy.join(''));
      } else {
        var remainingCopy = remainingOptions.slice(0);
        recursionFunTime(comboCopy, remainingCopy);
      }
    };
  };
  recursionFunTime([], depthOptions);
  return results;
};

PrefixTree.prototype.t9 = function(number) {
  var t9ele = this.findT9Elements(number);
  var userCombinations = this.getT9Combinations(t9ele);
  var results = [];
  for (var i = 0; i < userCombinations.length; i++) {
    var part1 = this.autocomplete(userCombinations[i]);
    results = results.concat(part1);
  };
  return results;
};
