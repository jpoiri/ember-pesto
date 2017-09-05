import Ember from 'ember';
import layout from '../templates/components/pesto-input';
import PestoInputMixin from '../mixins/pesto-input';
import PestoUIMixin from '../mixins/pesto-ui';
import PestoPopoverUIMixin from '../mixins/pesto-popover-ui';
import PestoFieldValidationMixin from '../mixins/pesto-field-validation';

/**
 * This component is responsible to render an input.
 * @module
 * @author bcpoiri
 */
export default Ember.Component.extend(PestoInputMixin, PestoFieldValidationMixin, PestoUIMixin, PestoPopoverUIMixin, {

	/**
	 * Component layout.
	 */
	layout,

});