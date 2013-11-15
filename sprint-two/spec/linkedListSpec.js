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

  it("should have a null head and tail when first instantiated", function() {
    expect(linkedList.head).toEqual(null);
    expect(linkedList.tail).toEqual(null);
  });

  describe('.addToTail()', function () {
    it('should make head and tail point to the same object when run once on an empty list', function(){
      linkedList.addToTail(4);
      expect(linkedList.tail).toEqual(jasmine.any(Object));
      expect(linkedList.head).toEqual(linkedList.tail);
    });
    it('head and tail do not point to the same object if run more than once', function(){
      linkedList.addToTail(4);
      linkedList.addToTail(8);
      expect(linkedList.head).toNotEqual(linkedList.tail);
    });
    it('the first node has a .next property which points to tail when addToTail is run twice', function(){
      linkedList.addToTail(4);
      linkedList.addToTail(8);
      expect(linkedList.head.next).toEqual(linkedList.tail);
    });
    it('the second-to-last node has a .next property which points to tail when addToTail is run more than once', function(){
      linkedList.addToTail(4);
      linkedList.addToTail(8);
      expect(linkedList.head.next).toEqual(linkedList.tail);
      linkedList.addToTail(12);
      expect(linkedList.head.next.next).toEqual(linkedList.tail);
      linkedList.addToTail(16);
      expect(linkedList.head.next.next.next).toEqual(linkedList.tail);
    });
  });

  describe('.removeHead()', function () {
    it('.removeHead() method moves head and tail to `null` if no items are left in list', function(){
      linkedList.addToTail(4);
      linkedList.removeHead();
      expect(linkedList.head).toEqual(null);
      expect(linkedList.tail).toEqual(null);
    });
    it('should change the head to null from a multi-node list', function(){
      linkedList.addToTail(4);
      linkedList.addToTail(8);
      linkedList.addToTail(12);
      linkedList.removeHead();
      expect(linkedList.head.value).toEqual(8);
    });
    it('should moves the head pointer to the next node in the list', function(){
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
    it('.removeHead() method returns the value of the node which was removed', function(){
      linkedList.addToTail(9);
      linkedList.addToTail(8);
      linkedList.addToTail(7);
      var expected0 = linkedList.head.value;
      var head0 = linkedList.removeHead();
      expect(head0).toEqual(expected0);
      var expected1 = linkedList.head.value;
      var head1 = linkedList.removeHead();
      expect(head1).toEqual(expected1);
    });
  });
  describe('.contains()',function () {

    it('should returns a boolean reflecting whether or not the passed-in value is in a single-valued list', function(){
      linkedList.addToTail(9);
      expect(linkedList.contains(9)).toEqual(true);
      expect(linkedList.contains(11)).toEqual(false);
    });

    it('should returns a boolean reflecting whether or not the passed-in value is in a multi-valued list', function(){
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
  })
});