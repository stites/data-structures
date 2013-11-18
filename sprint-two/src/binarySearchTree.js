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

  if (typeof this.isNum(value) === 'number') {
    if (value < parentValue) {

      if (!node.left) {
        node.addChild(value,'left', true);
        node.left = node.children[0];
      } else {
        node.insert(value, node.left);
      }

    } else if (value > parentValue) {
      if (!node.right) {
        node.addChild(value,'right', true);

        if (!node.children[1]){
          node.right = node.children[0];
        } else {
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

baseTree.breadthFirstLog = function () {
};

