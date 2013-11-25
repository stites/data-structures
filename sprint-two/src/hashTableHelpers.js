/*
 ********** NOTE: **********
 * Do not edit this code unless you see a bug!
 */


//
// Usage:
//   limitedArray.set(3, 'hi');
//   limitedArray.get(3); // returns 'hi'

var makeLimitedArray = function(limit){
  var storage = [];

  var limitedArray = {};
  limitedArray.get = function(index){
    checkLimit(index);
    return storage[index];
  };
  limitedArray.set = function(index, value){
    checkLimit(index);
    storage[index] = value;
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
// Moar Hash Functions!!!
// djb2 Hashource: http://www.cse.yorku.ca/~oz/hash.html
var djb2 = function (s, tableSize) {
  var b = '', i, hash = 5381;
  for (i = 0; i < s.length; i++) {
    b += deciToBin(s[i].charCodeAt());
  }
  for (i = 0; i < b.length; i++) {
    if (b[i] == '1') {
      hash = ((hash << 5) + hash) + 1;
    } else {
      hash = ((hash << 5) + hash) + 0;
    }
  }
  return Math.abs(hash) % tableSize;
};
// Universal Hash
var universalHash = function (s, tableSize) {
  var b = 27183, h = 0, a = 31415;
  if (tableSize > 1) {
    for (i = 0; i < s.length; i++) {
      h = (a * h + s[i].charCodeAt()) % tableSize;
      a = ((a % tableSize) * (b % tableSize)) % (tableSize);
    }
  }
  return h;
};
// Simple Hash
var simpleHash = function (s, tableSize) {
  var i, hash = 0;
  for (i = 0; i < s.length; i++) {
    hash += (s[i].charCodeAt() * (i+1));
  }
  return Math.abs(hash) % tableSize;
};
// Division Hash Function
var divisionHash = function (s, tableSize) {
  return s.length % tableSize;
};


// Hash Helpers
// ==========================
// Decimal to Binary
// Source: http://www.hscripts.com/scripts/JavaScript/decimal-binary-convertor.php

function deciToBin(arg) {
  res1 = 999;
  args = arg;
  while(args>1) {
    arg1 = parseInt(args/2);
    arg2 = args%2;
    args = arg1;
    if(res1 == 999) {
      res1 = arg2.toString();
    } else {
      res1 = arg2.toString()+res1.toString();
    }
  }
  if(args == 1 && res1 != 999) {
    res1 = args.toString()+res1.toString();
  } else if(args == 0 && res1 == 999) {
    res1 = 0;
  } else if(res1 == 999) {
    res1 = 1;
  }
  var ll = res1.length;
  while(ll%4 != 0) {
    res1 = "0"+res1;
    ll = res1.length;
  }
  return res1;
}
