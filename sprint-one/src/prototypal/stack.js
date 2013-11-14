var makeStack = function() {

	var instance = Object.create(stackMethods);

	instance.storage = {};
	instance.length = 0;

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
