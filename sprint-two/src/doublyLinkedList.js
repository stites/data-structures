// Note: don't use an array to do this.
var makeDoublyLinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;

  list.add = function (value, direction) {
    var node = makeNode(value);

    if (list.head === null){
      list.head = node;
      list.tail = list.head;
    } else if (direction === 'head') {
      node.next = list.head;
      list.head.previous = node;
      list.head = node;
    } else if (direction === 'tail') {
      node.previous = list.tail;
      list.tail.next = node;
      list.tail = node;
    }
  }

  list.addToHead = function(value){
    list.add(value, 'head');
  };

  list.addToTail = function(value){
    list.add(value, 'tail');
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
