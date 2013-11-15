describe("linkedList", function() {
  var linkedList;

  beforeEach(function() {
    linkedList = makeLinkedList();
  });

  it("should have a head and tail", function() {
    expect(Object.keys(linkedList)).toContain("head");
    expect(Object.keys(linkedList)).toContain("tail");
  });

  it("should have methods named 'addToTail', 'removeHead', and 'contains'", function() {
    expect(linkedList.addToTail).toEqual(jasmine.any(Function));
    expect(linkedList.removeHead).toEqual(jasmine.any(Function));
    expect(linkedList.contains).toEqual(jasmine.any(Function));
  });

  describe('.addToTail()', function () {
    it('.addToTail() method takes a value and adds it to the end of the list', function(){
      linkedList.addToTail(4);
      expect(linkedList[linkedList.tail]['value']).toEqual(4);
      linkedList.addToTail(7);
      expect(linkedList[linkedList.tail]['value']).toEqual(7);
    });
    it('head and tail point to the same value if run once', function(){
      linkedList.addToTail(4);
      expect(linkedList[linkedList.tail]['value']).toEqual(linkedList[linkedList.head]['value']);
    });
    it('head and tail do not point to the same value if run more than once', function(){
      linkedList.addToTail(4);
      linkedList.addToTail(8);
      expect(linkedList[linkedList.head]['value']).toEqual(4);
      expect(linkedList[linkedList.tail]['value']).toEqual(8);
    });
    it('the first node has a .next property which points to tail when addToTail is run twice', function(){
      linkedList.addToTail(4);
      linkedList.addToTail(8);
      expect(linkedList[linkedList.head]['next']).toEqual(linkedList.tail);
    });
    it('the second-to-last node has a .next property which points to tail when addToTail is run more than once', function(){
      linkedList.addToTail(4);
      linkedList.addToTail(8);
      expect(linkedList[linkedList.tail-1]['next']).toEqual(linkedList.tail);
      linkedList.addToTail(8);
      expect(linkedList[linkedList.tail-1]['next']).toEqual(linkedList.tail);
    });
  });

  describe('.removeHead()', function () {
    it('.removeHead() method removes the first node from a one-node list', function(){
      linkedList.addToTail(4);
      linkedList.removeHead();
      expect(Object.keys(linkedList).length).toEqual(5);
    });
    it('.removeHead() method moves the head pointer to the next node in the list', function(){
      linkedList.addToTail(4);
      var firstAdd = linkedList.head;
      linkedList.addToTail(4);
      linkedList.addToTail(4);
      linkedList.removeHead();
      expect(linkedList.head).toNotEqual(firstAdd);
      var secondAdd = linkedList.head;
      linkedList.removeHead();
      expect(linkedList.head).toNotEqual(secondAdd);
    });
    it('.removeHead() method removes the first node from any list', function(){
      var originalLength = 8
      for (var i = 0; i < originalLength; i++){
        linkedList.addToTail(i);
      }
      linkedList.removeHead();
      expect(originalLength).not.toEqual((linkedList.tail-linkedList.head)+1); // +1 for index<>length conversion
    });
    it('.removeHead() method moves head and tail to `null` if no items are left in list', function(){
      linkedList.addToTail(4);
      linkedList.removeHead();
      expect(linkedList.head).toEqual(null);
      expect(linkedList.tail).toEqual(null);
    });
    it('.removeHead() method returns the value of the node which was removed', function(){
      linkedList.addToTail(9);
      linkedList.addToTail(8);
      linkedList.addToTail(7);
      var expected0 = linkedList[linkedList.head]['value'];
      var head0 = linkedList.removeHead();
      expect(head0).toEqual(expected0);
      var expected1 = linkedList[linkedList.head]['value'];
      var head1 = linkedList.removeHead();
      expect(head1).toEqual(expected1);
    });
  });
  it('.contains() method returns a boolean reflecting whether or not the passed-in value is in the linked list', function(){
    linkedList.addToTail(9);
    linkedList.addToTail(8);
    linkedList.addToTail(7);
    linkedList.addToTail(6);
    linkedList.addToTail(5);
    linkedList.addToTail(4);
    linkedList.addToTail(3);
    linkedList.addToTail(2);
    linkedList.addToTail(1);
    linkedList.addToTail(0);
    expect(linkedList.contains(5)).toEqual(true);
    expect(linkedList.contains(11)).toEqual(false);
  });

  it('.contains() method can return the value if passed an optional argument', function(){
    linkedList.addToTail(9);
    linkedList.addToTail(8);
    linkedList.addToTail(7);
    linkedList.addToTail(6);
    linkedList.addToTail(5);
    linkedList.addToTail('5');
    linkedList.addToTail(4);
    linkedList.addToTail(3);
    linkedList.addToTail(2);
    linkedList.addToTail(1);
    linkedList.addToTail(0);
    expect(linkedList.contains(5, true)).toEqual(5);
    expect(linkedList.contains('5', true)).toEqual('5');
    expect(linkedList.contains(11, true)).toEqual(false);
  });
});