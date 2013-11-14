var Queue = function() {
  this.storage = {};
  this.length = 0;
};

Queue.prototype.enqueue = function (value) {
  this.storage[this.length] = value;
  this.length++;
};

Queue.prototype.dequeue = function(){
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
};

Queue.prototype.size = function () {
  return this.length;
};
