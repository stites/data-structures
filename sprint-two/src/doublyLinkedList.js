// Note: don't use an array to do this.
var makeDoublyLinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToHead = function(value){
    var newHead = makeNode(value);

    if (list.head === null){
      list.head = newHead;
      list.tail = list.head;
    } else {
      newHead.next = list.head;
      list.head.previous = newHead;
      list.head = newHead;
    }
  };

  list.addToTail = function(value){
    var newTail = makeNode(value);

    if (list.head === null){
      list.head = newTail;
      list.tail = list.head;
    } else {
      newTail.previous = list.tail;
      list.tail.next = newTail;
      list.tail = newTail;
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
      list.head.previous = null;
    }

    return value;
  };

  list.removeTail = function(){

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
  node.previous = null;
  node.next = null;

  return node;
};
