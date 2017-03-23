import Ember from 'ember';
import PestoParsleyMixinMixin from 'ember-pesto/mixins/pesto-parsley-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | pesto parsley mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let PestoParsleyMixinObject = Ember.Object.extend(PestoParsleyMixinMixin);
  let subject = PestoParsleyMixinObject.create();
  assert.ok(subject);
});
