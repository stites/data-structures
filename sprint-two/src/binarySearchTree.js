var BinarySearchTree = function(value, parent) {
  Tree.call(this, this.isNum(value), parent);
  this.left = null;
  this.right = null;
  this.depth = 1;
};
BinarySearchTree.prototype = Object.create(Tree.prototype);
BinarySearchTree.prototype.constructor = BinarySearchTree;

BinarySearchTree.prototype.isNum = function (value) {
  return typeof value === 'number' ? value : undefined;
};

BinarySearchTree.prototype.addChild = function(value, direction){
  var child = new BinarySearchTree(value, this);
  (!this.children) && (this.children = []);

  if (this.children.length < 2){
    if (direction === "left") {
      this.children.unshift(child);
    } else {
      this.children.push(child);
    }
  } else {
    throw new Error('problem adding binary Child')
  }
};

BinarySearchTree.prototype.insert = function (value, node) {
  node = node || this;
  var parentValue = node.value;
  var parentDepth = node.depth;

  if (typeof this.isNum(value) === 'number') {
    if (value < parentValue) {
      if (!node.left) {
        node.addChild(value,'left');
        node.children[0].depth = parentDepth + 1;
        node.left = node.children[0];
      } else {
        node.insert(value, node.left);
      }

    } else if (value > parentValue) {
      if (!node.right) {
        node.addChild(value,'right');

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

  var check = this.checkDepth();
  if ((check[0]) * 2 < check[1]) {
    this.rebalance();
  }
};

BinarySearchTree.prototype.rebalance = function() {
  
};

BinarySearchTree.prototype.contains = function (value) {
  var result = false;

  this.traverse(function(nodeVal){
    if (!result) {
      result = (nodeVal === value);
    }
  });

  return result;
};

BinarySearchTree.prototype.depthFirstLog = function (cb, node) {
  node = node || this;
  node.value = cb(node.value);

  if (node.children) {
    for (var i = 0; i < node.children.length; i++) {
      this.depthFirstLog(cb, node.children[i]);
    }
  }
};

BinarySearchTree.prototype.breadthFirstLog = function (cb) {
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

BinarySearchTree.prototype.checkDepth = function () {
  var depths={};
  var min = 1;
  var max = 1;

  this.traverse(function(node){
    if (node.children === null || node.children === undefined) {
      depths[node.depth] = true;
    }
  }, undefined, true);

  depths = keysToInts(depths);

  if (this.children && this.children.length === 1) {
    max = Math.max.apply(null, depths);
  } else if (depths.length === 1) {
    min = depths[0];
    max = min;
  } else {
    min = Math.min.apply(null, depths);
    max = Math.max.apply(null, depths);
  }
  return [min, max];
};

var keysToInts = function (array){
  var result = [];
  for (var key in array) {
    result.push(parseInt(key, 10));
  }
  return result;
};

