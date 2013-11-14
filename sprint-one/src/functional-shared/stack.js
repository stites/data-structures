var makeStack = function() {
	var instance = {};

	instance.storage = {};
	instance.length = 0;

	instance.push = stackMethods.push;
	instance.pop = stackMethods.pop;
	instance.size = stackMethods.size;
	return instance;
};

var stackMethods = {
	push: function(value){
    this.storage[this.length] = value;
    this.length++;
  },

  pop: function(){
    this.length && this.length--;
    return this.storage[this.length];
  },

  size: function(){
    return this.length;
  }
};
