import EmberObject from '@ember/object';
import PestoInputMixinMixin from 'ember-pesto/mixins/pesto-input';
import { module, test } from 'qunit';

module('Unit | Mixin | pesto input mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let PestoInputMixinObject = EmberObject.extend(PestoInputMixinMixin);
  let subject = PestoInputMixinObject.create();
  assert.ok(subject);
});
