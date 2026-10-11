const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const file = path.join(__dirname, '../portfolio/tagline.js');
assert.ok(fs.existsSync(file), 'Portfolio must provide the rotating tagline script');
const source = fs.readFileSync(file, 'utf8');
const slogans = [
  'Turning AI into meaningful products.',
  'Make Something People Want',
  "Do Things That Don't Scale",
  'AI for Everyone'
];

function run(reducedMotion, element = { textContent: slogans[0] }) {
  const timers = [];
  vm.runInNewContext(source, {
    document: { getElementById: () => element },
    window: { matchMedia: () => ({ matches: reducedMotion }) },
    setTimeout: (callback, delay) => timers.push({ callback, delay })
  });
  return { element, timers };
}

const { element, timers } = run(false);
assert.equal(element.textContent, '');
// Exercise the actual script through two complete cycles, including deletion.
for (const slogan of [...slogans, ...slogans]) {
  for (let length = 1; length <= slogan.length; length++) {
    assert.equal(timers.length, 1, 'There must be only one typing timer');
    timers.shift().callback();
    assert.equal(element.textContent, slogan.slice(0, length));
  }
  assert.ok(timers[0].delay >= 1500, 'Keep the completed slogan readable before erasing');
  for (let length = slogan.length - 1; length >= 0; length--) {
    timers.shift().callback();
    assert.equal(element.textContent, slogan.slice(0, length));
  }
}
const reduced = run(true);
assert.equal(reduced.element.textContent, slogans[0]);
assert.equal(reduced.timers.length, 0, 'Reduced motion must keep a static slogan');
assert.equal(run(false, null).timers.length, 0, 'Other pages must not start typing');
console.log('PASS: all four slogans type, pause, erase and repeat; reduced motion remains static.');
