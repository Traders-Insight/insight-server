const assert = require("assert");

function add(a, b) {
  return a + b;
}

function testAdd() {
  const result = add(1, 2);
  assert.strictEqual(result, 3, "1 + 2 should equal 3");
}

testAdd();
console.log("All tests passed!");
