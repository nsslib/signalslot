let { signal, slot } = require('../dist');

let counter = 0 // create a mutable value.

signal.create('counter', counter); // we created a signal called "loading" and assigned a value "false"

// we registered multiple listeners to "counter" signal
slot.register('counter', (val) => counter = val); // this will set the counter variable with the called signal value.
slot.register('counter', () => null); // another slot.

test("Change counter's value via slot", () => {
    signal.emit('counter', 1); // update the counter variable with 1.
    expect(counter).toBe(1);
});

test('Get length of listeners of a signal table', () => {
    const len = slot.count('counter');
    expect(len).toBe(2);
});