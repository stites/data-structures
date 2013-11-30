var PrefixTree = function PrefixTree(value, parent) {
  Tree.apply(this, arguments);
}

PrefixTree.prototype = Object.create(Tree.prototype);
PrefixTree.prototype.constructor = PrefixTree;

PrefixTree.prototype.stringUpload = function(str) {
  var charsToAdd = str.split('');
  for (var i = 0; i < charsToAdd.length; i++) {
    this.addChild(charsToAdd[i]);
  };
};

PrefixTree.prototype.batchUpload = function() {
};