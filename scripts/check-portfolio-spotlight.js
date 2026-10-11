const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const file = path.join(__dirname, '../portfolio/spotlight.js');
assert.ok(fs.existsSync(file), 'Portfolio must provide the mouse spotlight script');
const source = fs.readFileSync(file, 'utf8');

// Exercise pointer events and frame scheduling without a browser dependency.
function run(enabled) {
  const events = {};
  const frames = new Map();
  const properties = new Map();
  const classes = new Set();
  const preference = { matches: enabled, addEventListener: (_, callback) => { events.preference = callback; } };
  let frameId = 0;
  const document = {
    hidden: false,
    documentElement: {
      style: { setProperty: (name, value) => properties.set(name, value) },
      addEventListener: (name, callback) => { events[name] = callback; }
    },
    body: { classList: { add: name => classes.add(name), remove: name => classes.delete(name) } },
    addEventListener: (name, callback) => { events[name] = callback; }
  };
  vm.runInNewContext(source, {
    document,
    window: {
      matchMedia: () => preference,
      addEventListener: (name, callback) => { events[name] = callback; }
    },
    requestAnimationFrame: callback => { frames.set(++frameId, callback); return frameId; },
    cancelAnimationFrame: id => frames.delete(id)
  });
  const move = (x, y, pointerType = 'mouse') => events.pointermove?.({ clientX: x, clientY: y, pointerType });
  const flush = () => { const pending = [...frames.values()]; frames.clear(); pending.forEach(callback => callback()); };
  return { move, flush, events, frames, properties, classes, preference, document };
}

const mouse = run(true);
mouse.move(100, 200);
mouse.move(320, 480);
assert.equal(mouse.frames.size, 1, 'Batch fast mouse moves into one rendering frame');
mouse.flush();
assert.equal(mouse.properties.get('--spotlight-x'), '320px');
assert.equal(mouse.properties.get('--spotlight-y'), '480px');
assert.ok(mouse.classes.has('spotlight-active'));
mouse.move(500, 600);
mouse.events.pointerleave();
mouse.flush();
assert.ok(!mouse.classes.has('spotlight-active'), 'Leaving the page must remove the glow, including pending frames');
mouse.move(500, 600);
mouse.flush();
mouse.events.blur();
assert.ok(!mouse.classes.has('spotlight-active'), 'Unfocused windows must not retain a glow');
mouse.move(500, 600);
mouse.flush();
mouse.preference.matches = false;
mouse.events.preference();
assert.ok(!mouse.classes.has('spotlight-active'), 'Changing motion or input preferences must remove the glow');
mouse.move(1, 2);
assert.equal(mouse.frames.size, 0);
const touch = run(true);
touch.move(10, 20, 'touch');
assert.equal(touch.frames.size, 0, 'Touch gestures must remain available for scrolling');
const disabled = run(false);
disabled.move(10, 20);
assert.equal(disabled.frames.size, 0, 'Reduced motion and coarse pointers must not animate');
console.log('PASS: spotlight follows the latest mouse position, batches frames, and clears on exit or preference changes.');
