import EmberObject from '@ember/object';
import PestoUiMixinMixin from 'ember-pesto/mixins/pesto-ui';
import { module, test } from 'qunit';

module('Unit | Mixin | pesto ui mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let PestoUiMixinObject = EmberObject.extend(PestoUiMixinMixin);
  let subject = PestoUiMixinObject.create();
  assert.ok(subject);
});
