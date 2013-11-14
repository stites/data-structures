// Note: don't use an array to do this.
var makeLinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value){

    (list.tail === null) && (list.tail = -1);
    (list.head === null) && (list.head = 0);

    var previousTail = list.tail;

    list.tail += 1;

    if (list.tail) {
      list[previousTail]['next'] = list.tail;
    }
    list[list.tail] = makeNode(value);

  };

  list.removeHead = function(){
    var newHead = list[list.head]['next'];
    var headValue = list[list.head]['value'];
    delete list[list.head];

    if (newHead === null){
      list.tail = null;
      list.head = null;
    } else {
      list.head = newHead;
    }
    return headValue;
  };

  list.contains = function(value, position, result){
    position = position || list.head;
    result = result || false;
    var comparison = list[position]['value'];
    // use recursion:
    // --> CHECK PASSED VALUE
    if(value === comparison){
      return true;
    } else {
      return false;
    }
    // --> SEND FUNCTION TO CHECK THE CHILDREN (children===next)
    return result || list.contains(value, position, result);
  };

  return list;
};

var makeNode = function(value){
  var node = {};
  node.value = value;
  node.next = null;

  return node;
};
