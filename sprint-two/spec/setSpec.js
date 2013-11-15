  describe("set", function() {
  var set;

  beforeEach(function() {
    set = makeSet();
  });

  it("should have methods named 'add', 'contains', and 'remove'", function() {
    expect(set.add).toEqual(jasmine.any(Function));
    expect(set.contains).toEqual(jasmine.any(Function));
    expect(set.remove).toEqual(jasmine.any(Function));
  });

  it("should add strings to the set when added with 'add'", function() {
    set.add('string');
    expect(set._storage['string']).toEqual(true);
  });

  it("should add multiple strings to the set", function() {
    set.add('string');
    set.add('tim');
    set.add('jerry');
    expect(set._storage['string']).toEqual(true);
    expect(set._storage['tim']).toEqual(true);
    expect(set._storage['jerry']).toEqual(true);
  });

  it("should remove the specified string that is passed to 'remove'", function() {
    set.add('string');
    set.remove('string');
    expect(set._storage['string']).toEqual(undefined);
  });

  // xit("should return a boolean expressing if the passed string to 'contains' is in the set", function() {

  // });

  xit("should not add anything to the set with 'add' if the string is already in the set", function() {

  });

});