// Note: don't use an array to do this.
var makeLinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value){

    (list.tail === null) && (list.tail = -1);
    (list.head === null) && (list.head = 0);
    list.tail += 1;
    // debugger;
    list[list.tail] = makeNode(value);

  };

  list.removeHead = function(){
    return list.head;
  };

  list.contains = function(){
  };

  return list;
};

var makeNode = function(value){
  var node = {};
  node.value = value;
  node.next = null;

  return node;
};
