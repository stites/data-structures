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
    if (size) {
      size--;
      var temp = storage[0];
      for(var key in storage){
        var newKey = parseInt(key) - 1;
        if (newKey > -1) {
          storage[newKey]=storage[key];
        }
      }
      delete storage[size];

      return temp;
    }

  };

  instance.size = function(){
    return size;
  };

  return instance;
};
