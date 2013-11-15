// Note: don't use an array to do this.
var makeLinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value){
    var newNode = makeNode(value);

    if (list.head === null){
      list.head = newNode;
      list.tail = list.head;
    } else {
      list.tail.next = newNode;
      list.tail = newNode;
    }

  };

  list.removeHead = function(){
    var newHead = list.head.next;
    var value = list.head.value;
    list.head = null;

    if (newHead === null){
      list.tail = null;
    } else {
      list.head = newHead;
    }
    return value;
  };

  list.contains = function(value){
    var node = list.head;
    do {
      if (node.value === value){
        return true;
      }
      (node.next) && (node = node.next);
    } while (node.next !== null)

    return false;
  };
  return list;
};

var makeNode = function(value){
  var node = {};
  node.value = value;
  node.next = null;

  return node;
};
