import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pesto-checkbox-inline', 'Integration | Component | pesto checkbox inline', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pesto-checkbox-inline}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pesto-checkbox-inline}}
      template block text
    {{/pesto-checkbox-inline}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
