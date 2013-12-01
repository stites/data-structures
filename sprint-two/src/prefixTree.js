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
          return; // stop everything
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
  return [];
}