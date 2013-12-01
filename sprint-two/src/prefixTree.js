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
