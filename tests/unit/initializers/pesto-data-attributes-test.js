import { initialize } from 'dummy/initializers/pesto-data-attributes';
import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import Application from '@ember/application';
import destroyApp from '../../helpers/destroy-app';

module('Unit | Initializer | pesto data attributes', {
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
