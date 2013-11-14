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

  it('.addToTail() method takes a value and adds it to the end of the list', function(){
    linkedList.addToTail(4);
    expect(linkedList.tail).toEqual(4);
    linkedList.addToTail(7);
    expect(linkedList.tail).toEqual(7);
  });
  // it('.removeHead() method removes the first node from the list and returns its value', function(){
  //   expect(linkedList.).removeHead().
  // });
  // it('.contains() method returns boolean reflecting whether or not the passed-in value is in the linked list', function(){
  //   expect(linkedList.contains()).
  // });
});