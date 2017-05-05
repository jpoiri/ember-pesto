import Ember from 'ember';
import layout from '../templates/components/pesto-input';
import InputMixin from '../mixins/pesto-input-mixin';
import PestoUIMixin from '../mixins/pesto-ui-mixin';
import PestoFieldValidationMixin from '../mixins/pesto-field-validation-mixin';


/**
 * This component is responsible to render an input.
 * @module
 * @author bcpoiri
 */
export default Ember.Component.extend(InputMixin, PestoFieldValidationMixin, PestoUIMixin, {

	/**
	 * Component layout.
	 */
	layout,

});