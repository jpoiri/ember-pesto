import Ember from 'ember';
import PestoGroupInputMixinMixin from 'ember-pesto/mixins/pesto-group-input-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | pesto group input mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let PestoGroupInputMixinObject = Ember.Object.extend(PestoGroupInputMixinMixin);
  let subject = PestoGroupInputMixinObject.create();
  assert.ok(subject);
});
