import { initialize } from 'dummy/initializers/pesto-parsley-config-mixin';
import { module, test } from 'qunit';
import destroyApp from '../../helpers/destroy-app';
import Application from '@ember/application';
import { run } from '@ember/runloop';

module('Unit | Initializer | pesto parsley config mixin', {
  beforeEach() {
    run(() => {
      this.application = Application.create();
      this.application.deferReadiness();
    });
  },
  afterEach() {
    destroyApp(this.application);
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  initialize(this.application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
