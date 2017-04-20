import Ember from 'ember';
import layout from '../templates/components/pesto-input';
import ParsleyMixin from '../mixins/pesto-parsley-mixin';
import InputMixin from '../mixins/pesto-input-mixin';
import PestoUIMixin from '../mixins/pesto-ui-mixin';

const {computed} = Ember;

/**
 * This component is responsible to render an input.
 * @module
 * @author bcpoiri
 */
export default Ember.Component.extend(InputMixin, ParsleyMixin, PestoUIMixin, {

	/**
	 * Component layout.
	 */
	layout,

});