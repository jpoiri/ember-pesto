import Component from '@ember/component';
import layout from '../templates/components/pesto-input-icon';

export default Component.extend({

  layout,

  tagName: 'span',

  classNames: ['form-control-feedback'],

  classNameBindings: ['iconClass']

});
