import Ember from 'ember';
import layout from '../templates/components/pesto-input';
import InputMixin from '../mixins/pesto-input-mixin';

/**
 * This component is responsible to render an input.
 * @module
 * @author bcpoiri
 */
export default Ember.Component.extend(InputMixin, ParsleyMixin, {

	/**
	 * Component layout.
	 */
	layout,
});