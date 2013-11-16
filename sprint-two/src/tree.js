var makeTree = function(value, parent){
  var newTree = Object.create(treeMethods);
  newTree.value = value || undefined;
  newTree.parent = parent || null;
  newTree.children = undefined;

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value){
  var child = makeTree(value, this);

  (!this.children) && (this.children = []);

  this.children.push(child);
};

treeMethods.contains = function(value, node, result){
  result = result || false;
  node = node || this;

  if (value === node.value) {
    result = true;
  } else {
    if (node.children !== undefined) {
      for (var i = 0; i < node.children.length; i++) {
        result = node.contains(value, node.children[i], result);
      }
    }
  }

  return result;
};
