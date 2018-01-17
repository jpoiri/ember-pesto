import PestoFieldValidationMixinMixin from 'ember-pesto/mixins/pesto-field-validation';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';

module('Unit | Mixin | pesto field validation mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let PestoFieldValidationMixinObject = EmberObject.extend(PestoFieldValidationMixinMixin);
  let subject = PestoFieldValidationMixinObject.create();
  assert.ok(subject);
});
