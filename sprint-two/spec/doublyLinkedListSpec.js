describe("doublyLinkedList", function() {
  var dlinkedList;

  beforeEach(function() {
    dlinkedList = makeDoublyLinkedList();
  });

  it("should have a head and tail", function() {
    expect(Object.keys(dlinkedList)).toContain("head");
    expect(Object.keys(dlinkedList)).toContain("tail");
  });

  it("should have methods named 'addToTail', 'addToHead', 'removeTail', 'removeHead', and 'contains'", function() {
    expect(dlinkedList.addToTail).toEqual(jasmine.any(Function));
    expect(dlinkedList.addToHead).toEqual(jasmine.any(Function));
    expect(dlinkedList.removeTail).toEqual(jasmine.any(Function));
    expect(dlinkedList.removeHead).toEqual(jasmine.any(Function));
    expect(dlinkedList.contains).toEqual(jasmine.any(Function));
  });

  it("should have a null head and tail when first instantiated", function() {
    expect(dlinkedList.head).toEqual(null);
    expect(dlinkedList.tail).toEqual(null);
  });

  describe('.addToTail()', function () {
    it('should make head and tail point to the same object when run once on an empty list', function(){
      dlinkedList.addToTail(4);
      expect(dlinkedList.tail).toEqual(jasmine.any(Object));
      expect(dlinkedList.head).toEqual(dlinkedList.tail);
    });

    it('head and tail do not point to the same object if run more than once', function(){
      dlinkedList.addToTail(4);
      dlinkedList.addToTail(8);
      expect(dlinkedList.head).toNotEqual(dlinkedList.tail);
    });

    it('the first node has a .next property which points to tail when addToTail is run twice', function(){
      dlinkedList.addToTail(4);
      dlinkedList.addToTail(8);
      expect(dlinkedList.head.next).toEqual(dlinkedList.tail);
    });

    it('should make previous point to null when only one element on the list', function(){
      dlinkedList.addToTail(4);
      expect(dlinkedList.head.previous).toEqual(null);
    });

    it('the second node has a .previous property which points to head when addToTail is run twice', function(){
      dlinkedList.addToTail(4);
      dlinkedList.addToTail(8);
      expect(dlinkedList.tail.previous).toEqual(dlinkedList.head);
    });

    it('should make previous property points to the previous element when list has many elements', function(){
      dlinkedList.addToTail(4);
      dlinkedList.addToTail(8);
      dlinkedList.addToTail(12);
      dlinkedList.addToTail(16);
      expect(dlinkedList.tail.previous).toEqual(dlinkedList.head.next.next);
    });

    it('the second-to-last node has a .next property which points to tail when addToTail is run more than once', function(){
      dlinkedList.addToTail(4);
      dlinkedList.addToTail(8);
      expect(dlinkedList.head.next).toEqual(dlinkedList.tail);
      dlinkedList.addToTail(12);
      expect(dlinkedList.head.next.next).toEqual(dlinkedList.tail);
      dlinkedList.addToTail(16);
      expect(dlinkedList.head.next.next.next).toEqual(dlinkedList.tail);
    });
  });

  describe('.removeHead()', function () {
    it('.removeHead() method moves head and tail to `null` if no items are left in list', function(){
      dlinkedList.addToTail(4);
      dlinkedList.removeHead();
      expect(dlinkedList.head).toEqual(null);
      expect(dlinkedList.tail).toEqual(null);
    });

    it('should change the head to the next node in the list', function(){
      dlinkedList.addToTail(4);
      dlinkedList.addToTail(8);
      dlinkedList.removeHead();
      expect(dlinkedList.head.value).toEqual(8);
    });

    it('should change the head.previous value to null', function(){
      dlinkedList.addToTail(4);
      dlinkedList.addToTail(8);
      dlinkedList.removeHead();
      expect(dlinkedList.head.previous).toEqual(null);
    });

    it('should moves the head pointer to the next node in the list', function(){
      dlinkedList.addToTail(4);
      var firstAdd = dlinkedList.head;
      dlinkedList.addToTail(4);
      dlinkedList.addToTail(4);
      dlinkedList.removeHead();
      expect(dlinkedList.head).toNotEqual(firstAdd);
      var secondAdd = dlinkedList.head;
      dlinkedList.removeHead();
      expect(dlinkedList.head).toNotEqual(secondAdd);
    });

    it('.removeHead() method returns the value of the node which was removed', function(){
      dlinkedList.addToTail(9);
      dlinkedList.addToTail(8);
      dlinkedList.addToTail(7);
      var expected0 = dlinkedList.head.value;
      var head0 = dlinkedList.removeHead();
      expect(head0).toEqual(expected0);
      var expected1 = dlinkedList.head.value;
      var head1 = dlinkedList.removeHead();
      expect(head1).toEqual(expected1);
    });
  });

  describe('.contains()',function () {
    it('should returns a boolean reflecting whether or not the passed-in value is in a single-valued list', function(){
      dlinkedList.addToTail(9);
      expect(dlinkedList.contains(9)).toEqual(true);
      expect(dlinkedList.contains(11)).toEqual(false);
    });

    it('should returns a boolean reflecting whether or not the passed-in value is in a multi-valued list', function(){
      dlinkedList.addToTail(9);
      dlinkedList.addToTail(8);
      dlinkedList.addToTail(7);
      dlinkedList.addToTail(6);
      dlinkedList.addToTail(5);
      dlinkedList.addToTail(4);
      dlinkedList.addToTail(3);
      dlinkedList.addToTail(2);
      dlinkedList.addToTail(1);
      dlinkedList.addToTail(0);
      expect(dlinkedList.contains(5)).toEqual(true);
      expect(dlinkedList.contains(11)).toEqual(false);
    });
  })

  describe('.addToHead()', function () {
    it('should make head and tail point to the same object when run once on an empty list', function(){
      dlinkedList.addToHead(4);
      expect(dlinkedList.tail).toEqual(jasmine.any(Object));
      expect(dlinkedList.head).toEqual(dlinkedList.tail);
    });

    it('head and tail do not point to the same object if run more than once', function(){
      dlinkedList.addToHead(4);
      dlinkedList.addToHead(8);
      expect(dlinkedList.head).toNotEqual(dlinkedList.tail);
    });

  });













});