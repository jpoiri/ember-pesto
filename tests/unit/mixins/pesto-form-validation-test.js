import EmberObject from '@ember/object';
import PestoFormValidationMixinMixin from 'ember-pesto/mixins/pesto-form-validation';
import { module, test } from 'qunit';

module('Unit | Mixin | pesto form validation mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let PestoFormValidationMixinObject = EmberObject.extend(PestoFormValidationMixinMixin);
  let subject = PestoFormValidationMixinObject.create();
  assert.ok(subject);
});
