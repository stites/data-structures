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

  it("should return a boolean expressing if the passed string to 'contains' is in the set", function() {
    set.add('string0');
    set.add('string1');
    set.add('string2');
    set.add('string3');
    expect(set.contains('string3')).toEqual(true);
    expect(set.contains('string8')).toEqual(false);
  });

  it("should not add anything to the set with 'add' if the string is already in the set", function() {
    set.add('string0');
    set.add('string0');
    set.remove('string0');
    expect(set.contains('string0')).toEqual(false);
  });

  it("should add number to the set when added with 'add'", function() {
    set.add(1);
    expect(set._storage[1]).toEqual(true);
  });

  it("should add Arrays to the set when added with 'add'", function() {
    set.add([]);
    expect(set._storage[[]]).toEqual(true);
  });

  it("should add Objects to the set when added with 'add'", function() {
    set.add({});
    expect(set._storage[{}]).toEqual(true);
  });

  it("should add the null and undefined types to the set when added with 'add'", function() {
    set.add(null);
    expect(set._storage[null]).toEqual(true);
    set.add(undefined);
    expect(set._storage[undefined]).toEqual(true);
  });

  it("should add Boolean types to the set when added with 'add'", function() {
    set.add(false);
    expect(set._storage[false]).toEqual(true);
    set.add(true);
    expect(set._storage[true]).toEqual(true);
  });

  it("should return a boolean expressing if any passed value to 'contains' is in the set", function() {
    set.add('string');
    set.add(1);
    set.add([]);
    set.add({});
    set.add(null);
    set.add(false);
    set.add(true);
    expect(set.contains('string')).toEqual(true);
    expect(set.contains(1)).toEqual(true);
    expect(set.contains([])).toEqual(true);
    expect(set.contains({})).toEqual(true);
    expect(set.contains(null)).toEqual(true);
    expect(set.contains(true)).toEqual(true);
    expect(set.contains(false)).toEqual(true);
  });

  it("should remove any specified value that is passed to 'remove'", function() {
    set.add('string');
    set.add(1);
    set.add([]);
    set.add({});
    set.add(null);
    set.remove('string');
    set.remove(1);
    set.remove([]);
    set.remove({});
    set.remove(null);
    expect(set.contains('string')).toEqual(false);
    expect(set.contains(1)).toEqual(false);
    expect(set.contains([])).toEqual(false);
    expect(set.contains({})).toEqual(false);
    expect(set.contains(null)).toEqual(false);
    expect(set.contains(true)).toEqual(false);
    expect(set.contains(false)).toEqual(false);
  });


});