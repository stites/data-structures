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
        for (var i = 0; i < node.children.length; i++) {
          if (node.children[i].value === firstChar){
            addChar = false;
            break;
          }
        }
      }
      if (addChar) {
        node.addChild(firstChar);
        traversalChildAdd(node.children[0], word.substr(1));
      } else {
        traversalChildAdd(node.children[0], word.substr(1));
      }
    }
  }

  traversalChildAdd(this, str);
};

PrefixTree.prototype.batchUpload = function() {
};