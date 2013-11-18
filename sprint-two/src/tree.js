var makeTree = function(value, parent){
  var newTree = Object.create(treeMethods);
  newTree.value = value || undefined;
  newTree.parent = parent || null;
  newTree.children = undefined;

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value, direction, binary){
  var child = makeTree(value, this);

  (!this.children) && (this.children = []);

  if (binary && (this.children.length < 2)){
    if (direction === "left") {
      this.children.unshift(child);
    } else {
      this.children.push(child);
    }
  } else if (!binary) {
    this.children.push(child);
  }
};

treeMethods.removeFromParent = function (node) {
  var parent = node.parent;
  var result;
  for (var i = 0; i < parent.children.length; i++) {
    if (parent.children[i] === node) {
      result = parent.children.splice(i, 1)[0];
      result.parent = null;
    }
  }
  if (parent.children.length === 0){
    parent.children = undefined;
  }
  return result;
};


treeMethods.traverse = function(cb, node, breadthHelper){
  node = node || this;
  if (breadthHelper && (node.depth >= 0)) {
    cb(node);
  } else {
    cb(node.value);
  }

  if (node.children) {
    for (var i = 0; i < node.children.length; i++) {
      this.traverse(cb, node.children[i], breadthHelper);
    }
  }
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
