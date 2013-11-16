var makeBinarySearchTree = function(value) {
  var binarySearchTree = Object.create(baseTree);

  binarySearchTree.value = typeof value === 'number' ? value : undefined;

  return binarySearchTree;
};

var baseTree = makeTree();

baseTree.insert = function () {

};

baseTree.contains = function () {

};

baseTree.depthFirstLog = function () {

};

