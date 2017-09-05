import Ember from 'ember';
import PestoFieldValidationMixinMixin from 'ember-pesto/mixins/pesto-field-validation';
import { module, test } from 'qunit';

module('Unit | Mixin | pesto field validation mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let PestoFieldValidationMixinObject = Ember.Object.extend(PestoFieldValidationMixinMixin);
  let subject = PestoFieldValidationMixinObject.create();
  assert.ok(subject);
});
