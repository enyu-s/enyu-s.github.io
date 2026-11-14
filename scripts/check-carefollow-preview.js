const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../portfolio/carefollow-preview.js'), 'utf8');
const panels = [{ hidden: false }, { hidden: true }];
const tabs = panels.map((_, index) => ({
  attributes: { 'aria-controls': 'panel-' + index, 'aria-selected': String(index === 0) },
  tabIndex: index === 0 ? 0 : -1,
  events: {},
  addEventListener(name, callback) { this.events[name] = callback; },
  getAttribute(name) { return this.attributes[name]; },
  setAttribute(name, value) { this.attributes[name] = value; },
  focus() { focused = index; }
}));
let focused = 0;
const preview = { querySelectorAll: () => tabs };
vm.runInNewContext(source, {
  document: { getElementById: id => id === 'carefollow-preview' ? preview : panels[Number(id.slice(-1))] }
});
function active(index) {
  tabs.forEach((tab, i) => {
    assert.equal(tab.attributes['aria-selected'], String(i === index));
    assert.equal(tab.tabIndex, i === index ? 0 : -1);
    assert.equal(panels[i].hidden, i !== index);
  });
}
function key(index, name, expected) {
  let prevented = false;
  tabs[index].events.keydown({ key: name, preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(focused, expected);
  active(expected);
}
active(0);
tabs[1].events.click();
active(1);
tabs[0].events.click();
active(0);
key(0, 'ArrowRight', 1);
key(1, 'ArrowRight', 0);
key(0, 'ArrowLeft', 1);
key(1, 'Home', 0);
key(0, 'End', 1);
tabs[1].events.keydown({ key: 'Tab', preventDefault() { throw new Error('Normal tab navigation must not be blocked'); } });
active(1);
vm.runInNewContext(source, { document: { getElementById: () => null } });
console.log('PASS: preview clicks and keyboard navigation select one panel, update focus, and preserve normal tab navigation.');
