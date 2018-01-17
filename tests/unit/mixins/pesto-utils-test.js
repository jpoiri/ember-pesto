import EmberObject from '@ember/object';
import PestoUtilsMixinMixin from 'ember-pesto/mixins/pesto-utils';
import { module, test } from 'qunit';

module('Unit | Mixin | pesto utils mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let PestoUtilsMixinObject = EmberObject.extend(PestoUtilsMixinMixin);
  let subject = PestoUtilsMixinObject.create();
  assert.ok(subject);
});
