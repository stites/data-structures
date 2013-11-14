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
    var next = list[position]['next'];

    result = (value === comparison) ? true : false;

    return (next !== null) ? (result || list.contains(value, next, result)) : result;
  };

  return list;
};

var makeNode = function(value){
  var node = {};
  node.value = value;
  node.next = null;

  return node;
};
