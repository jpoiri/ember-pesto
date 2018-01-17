import EmberObject from '@ember/object';
import PestoItemsSortingMixinMixin from 'ember-pesto/mixins/pesto-items-sorting';
import { module, test } from 'qunit';

module('Unit | Mixin | pesto items sorting mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let PestoItemsSortingMixinObject = EmberObject.extend(PestoItemsSortingMixinMixin);
  let subject = PestoItemsSortingMixinObject.create();
  assert.ok(subject);
});
