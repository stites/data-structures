var makeBinarySearchTree = function(value) {
  var binarySearchTree = Object.create(baseTree);

  binarySearchTree.value = binarySearchTree.isNum(value);
  binarySearchTree.left = binarySearchTree.isNum(value);
  binarySearchTree.right = binarySearchTree.isNum(value);

  return binarySearchTree;
};

var baseTree = makeTree();

baseTree.isNum = function (value) {
  return typeof value === 'number' ? value : undefined;
};

baseTree.insert = function (value) {

  if (typeof this.isNum(value) === 'number') {
    this.addChild(value);
  }

};

baseTree.contains = function () {

};

baseTree.depthFirstLog = function () {

};

