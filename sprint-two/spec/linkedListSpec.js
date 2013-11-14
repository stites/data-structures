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
      expect(linkedList.tail).toEqual(4);
      linkedList.addToTail(7);
      expect(linkedList.tail).toEqual(7);
    });
    it('head and tail point to the same value if run once', function(){
      linkedList.addToTail(4);
      expect(linkedList.tail).toEqual(4);
      expect(linkedList.head).toEqual(4);
    });
  });
  // Pending
  xit('.removeHead() method removes the first node from the list and returns its value', function(){
    linkedList.addToTail(4);
    var head1 = linkedList.removeHead();
    expect(head1).toEqual(4);
  });
  // it('.contains() method returns boolean reflecting whether or not the passed-in value is in the linked list', function(){
  //   expect(linkedList.contains()).
  // });
});