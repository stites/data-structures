var makeQueue = function(){
  var instance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var size = 0;

  // Implement the methods below

  instance.enqueue = function(value){
    storage[size] = value;
    size++;
  };

  instance.dequeue = function(){
    if (size > 0) {
      var temp = storage[0];
      debugger;
      _.each(storage, function(item, key){
        var newKey = parseInt(key)--;
        if(newKey > -1){
          storage[newKey] = item;
        }
      });

      size--;

      return temp;
    }

  };

  instance.size = function(){
    return size;
  };

  return instance;
};