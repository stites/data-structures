var makeBinarySearchTree = function(value) {
  var binarySearchTree = Object.create(baseTree);

  binarySearchTree.value = binarySearchTree.isNum(value);
  binarySearchTree.left = null;
  binarySearchTree.right = null;
  binarySearchTree.depth = 0;

  return binarySearchTree;
};

var baseTree = makeTree();

baseTree.isNum = function (value) {
  return typeof value === 'number' ? value : undefined;
};

baseTree.insert = function (value, node) {
  node = node || this;
  var parentValue = node.value;
  var parentDepth = node.depth;

  if (typeof this.isNum(value) === 'number') {
    if (value < parentValue) {
      if (!node.left) {
        node.addChild(value,'left', true);
        node.children[0].depth = parentDepth + 1;
        node.left = node.children[0];
      } else {
        node.insert(value, node.left);
      }

    } else if (value > parentValue) {
      if (!node.right) {
        node.addChild(value,'right', true);

        if (!node.children[1]){
          node.children[0].depth = parentDepth + 1;
          node.right = node.children[0];
        } else {
          node.children[1].depth = parentDepth + 1;
          node.right = node.children[1];
        }

      } else {
        node.insert(value, node.right);
      }
    }
  }
};

baseTree.contains = function (value) {
  var result = false;

  this.traverse(function(nodeVal){
    if (!result) {
      result = (nodeVal === value);
    }
  });

  return result;
};

baseTree.depthFirstLog = function (cb, node) {
  node = node || this;
  node.value = cb(node.value);

  if (node.children) {
    for (var i = 0; i < node.children.length; i++) {
      this.depthFirstLog(cb, node.children[i]);
    }
  }
};

baseTree.breadthFirstLog = function (cb) {
  var queue = [];

  this.traverse(function(node){
    queue.push(node);
  }, undefined, true);

  queue = queue.sort(function(a,b){
    return a.depth > b.depth;
  });

  for (var i = 0; i < queue.length; i++) {
    queue[i].value = cb(queue[i].value);
  };
};

