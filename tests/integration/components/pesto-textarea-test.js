import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pesto-textarea', 'Integration | Component | pesto textarea', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pesto-textarea}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pesto-textarea}}
      template block text
    {{/pesto-textarea}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
