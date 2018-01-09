import Ember from 'ember';
import layout from '../templates/components/pesto-input-icon';

export default Ember.Component.extend({

  layout,

  tagName: 'span',

  classNames: ['form-control-feedback'],

  classNameBindings: ['iconClass']

});
