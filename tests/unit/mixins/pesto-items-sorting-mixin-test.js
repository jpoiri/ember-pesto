import Ember from 'ember';
import PestoItemsSortingMixinMixin from 'ember-pesto/mixins/pesto-items-sorting-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | pesto items sorting mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let PestoItemsSortingMixinObject = Ember.Object.extend(PestoItemsSortingMixinMixin);
  let subject = PestoItemsSortingMixinObject.create();
  assert.ok(subject);
});
