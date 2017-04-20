import Ember from 'ember';
import PestoUiMixinMixin from 'ember-pesto/mixins/pesto-ui-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | pesto ui mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let PestoUiMixinObject = Ember.Object.extend(PestoUiMixinMixin);
  let subject = PestoUiMixinObject.create();
  assert.ok(subject);
});
