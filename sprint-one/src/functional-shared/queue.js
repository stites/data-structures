var makeQueue = function(){
  var instance = {};

  instance.storage = {};
  instance.length = 0;

  instance.enqueue = queueMethods.enqueue;
  instance.dequeue = queueMethods.dequeue;
  instance.size = queueMethods.size;

  return instance;
};

var queueMethods = {
  enqueue: function(value){
    this.storage[this.length] = value;
    this.length++;
  },

  dequeue: function(){
    if (this.length) {
      this.length--;
      var temp = this.storage[0];
      for(var key in this.storage){
        var newKey = parseInt(key) - 1;
        if (newKey > -1) {
          this.storage[newKey]=this.storage[key];
        }
      }
      delete this.storage[this.length];

      return temp;
    }

  },

  size: function(){
    return this.length;
  }

};
