import EmberObject from '@ember/object';
import PestoPopoverUiMixin from 'ember-pesto/mixins/pesto-popover-ui';
import { module, test } from 'qunit';

module('Unit | Mixin | pesto popover ui');

// Replace this with your real tests.
test('it works', function(assert) {
  let PestoPopoverUiObject = EmberObject.extend(PestoPopoverUiMixin);
  let subject = PestoPopoverUiObject.create();
  assert.ok(subject);
});
