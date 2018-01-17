import EmberObject from '@ember/object';
import PestoGroupInputMixinMixin from 'ember-pesto/mixins/pesto-group-input';
import { module, test } from 'qunit';

module('Unit | Mixin | pesto group input mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let PestoGroupInputMixinObject = EmberObject.extend(PestoGroupInputMixinMixin);
  let subject = PestoGroupInputMixinObject.create();
  assert.ok(subject);
});
