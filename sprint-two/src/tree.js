var makeTree = function(value){
  var newTree = Object.create(treeMethods);
  newTree.value = value || undefined;
  newTree.children = undefined; // [9,8,7] --> [0,1,3] obj0={value:9}

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value){
	var child = makeTree(value);

	(!this.children) && (this.children = []);

	this.children.push(child);
};

treeMethods.contains = function(){
};
