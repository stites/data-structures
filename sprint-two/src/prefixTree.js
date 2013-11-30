var PrefixTree = function PrefixTree(value, parent) {
  Tree.apply(this, arguments);
}

PrefixTree.prototype = Object.create(Tree.prototype);
PrefixTree.prototype.constructor = PrefixTree;

PrefixTree.prototype.stringUpload = function(str) {

  var traversalChildAdd = function (node, word) {
    if (word === ''){
      return;
    } else {
      var firstChar = word.substr(0,1);
      var addChar = true;
      if (node.children !== undefined){
        for (var existingParentIdx = 0; existingParentIdx < node.children.length; existingParentIdx++) {
          if (node.children[existingParentIdx].value === firstChar) {
            addChar = false;
            break;
          }
        }
      }
      if (addChar) {
        node.addChild(firstChar);
        var newParentIdx = node.children.length - 1;
        traversalChildAdd(node.children[newParentIdx], word.substr(1));
      } else {
        traversalChildAdd(node.children[existingParentIdx], word.substr(1));
      }
    }
  }

  traversalChildAdd(this, str);
};

PrefixTree.prototype.batchUpload = function(bigStr) {
  littleStrings = bigStr.split(/,|\s/);
  for (var word = 0; word < littleStrings.length; word++) {
    this.stringUpload(littleStrings[word]);
  };
};