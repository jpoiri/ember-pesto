import Ember from 'ember';
import PestoUtilsMixinMixin from 'ember-pesto/mixins/pesto-utils-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | pesto utils mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let PestoUtilsMixinObject = Ember.Object.extend(PestoUtilsMixinMixin);
  let subject = PestoUtilsMixinObject.create();
  assert.ok(subject);
});
