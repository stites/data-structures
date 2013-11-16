var makeBinarySearchTree = function(value) {
  var binarySearchTree = Object.create(baseTree);

  binarySearchTree.value = binarySearchTree.isNum(value);
  binarySearchTree.left = null;
  binarySearchTree.right = null;

  return binarySearchTree;
};

var baseTree = makeTree();

baseTree.isNum = function (value) {
  return typeof value === 'number' ? value : undefined;
};

baseTree.insert = function (value) {
  var parentValue = this.value;

  if (typeof this.isNum(value) === 'number') {
    if (parentValue > value) {
      this.addChild(value,'left');
      this.left = this.children[0];
    } else {
      this.addChild(value,'right');
      this.right = this.children[1];
    }
  }

};

baseTree.contains = function () {

};

baseTree.depthFirstLog = function () {

};

