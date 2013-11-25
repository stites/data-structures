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

BinarySearchTree.prototype.insert = function (value) {
  var recur = function (value, node) {
    var parentValue = node.value;
    var parentDepth = node.depth;

    if (typeof node.isNum(value) === 'number') {
      if (value < parentValue) {
        if (!node.left) {
          node.addChild(value,'left');
          node.children[0].depth = parentDepth + 1;
          node.left = node.children[0];
        } else {
          recur(value, node.left);
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
          recur(value, node.right);
        }
      }
    }
  };
  recur(value, this);

  var check = this.checkDepth();
  if ((check.max/check.min > 2) && (check.max > 3)) {
    this.rebalance();
  }
};

BinarySearchTree.prototype.rebalance = function() {
  var items = [];
  this.breadthFirstLog(function(item){
    items.push(item);
    return item;
  });
  var orderedItems = [];
  var order = function (array) {
    if(array.length === 0){
      return;
    } else {
      var halfway = ~~(array.length/2);
      orderedItems.push(array[halfway]);
      order( array.slice(0, halfway));
      order( array.slice(halfway+1));
    }
  };
  order(items);
  BinarySearchTree.call(this, orderedItems.shift());
  for (var i = 0; i < orderedItems.length; i++) {
    this.insert(orderedItems[i]);
  };
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
  return {min:min, max:max};
};

var keysToInts = function (array){
  var result = [];
  for (var key in array) {
    result.push(parseInt(key, 10));
  }
  return result;
};

