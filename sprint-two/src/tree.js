var makeTree = function(value){
  var newTree = Object.create(treeMethods);
  newTree.value = value || undefined;
  newTree.children = undefined;

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(){
};

treeMethods.contains = function(){
};
