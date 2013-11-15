/*
 ********** NOTE: **********
 * Do not edit this code unless you see a bug!
 */


// This class represents an array with limited functionality and a maximum size.
// It will ensure that you don't accidentally try to use up too much space.
//
// Usage:
//   limitedArray.set(3, 'hi');
//   limitedArray.get(3); // returns 'hi'

var makeLimitedArray = function(limit){
  var storage = [];

  var limitedArray = {};
  limitedArray.get = function(index, key){
    checkLimit(index);
    var linkedList = storage[index];
    debugger;
    if (linkedList) {
      var pos = linkedList.head;
      var tail = linkedList.tail;
      var checkNode = linkedList[pos];
      var result;
      do {
        if (key !== undefined && key === linkedList[pos]['value']){
          return linkedList[pos]['value'];
        }
        result = linkedList[pos]['value']
        pos += 1;
      } while (checkNode.next !== null)

      return result;

    } else {
      return undefined;
    }
  };
  limitedArray.set = function(index, value){
    checkLimit(index);
    if (storage[index] !== undefined){
      storage[index].addToTail(value);
    } else {
      var linkedList = makeLinkedList();
      linkedList.addToTail(value);
      storage[index] = linkedList;
    }
  };
  limitedArray.each = function(callback){
    for(var i = 0; i < storage.length; i++){
      callback(storage[i], i, storage);
    }
  };

  var checkLimit = function(index){
    if(typeof index !== 'number'){ throw new Error('setter requires a numeric index for its first argument'); }
    if(limit <= index){ throw new Error('Error trying to access an over-the-limit index'); }
  };

  return limitedArray;
};

// This is a "hashing function". You don't need to worry about it, just use it
// to turn any string into an integer that is well-distributed between the
// numbers 0 and `max`
var getIndexBelowMaxForKey = function(str, max){
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash<<5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};
