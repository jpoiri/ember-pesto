import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/pesto-select';
import PestoFieldValidationMixin from '../mixins/pesto-field-validation';
import PestoUIMixin from '../mixins/pesto-ui';
import ItemSortingMixin from '../mixins/pesto-items-sorting';

/**
 * This component is responsible to render a select.
 * @author bcpoiri
 */
export default Component.extend(ItemSortingMixin, PestoFieldValidationMixin, PestoUIMixin, {

	/**
	 * Component layout.
	 */
	layout,

	/**
	 * Set the validation to trigger on the blur event on the first time.
	 */
	validationTrigger: 'blur',

	/**
	 * Set the validation to trigger on the change event on the subsequent time.
	 */
	validationTriggerAfterFailure: 'change',

	/**
	 * Classes that will be passed to the component.
	 */
	classNames: ['form-group'],

	/**
	 * The label is visible by default.
	 */
	labelVisible: true,

	/**
	 * Returns the input id.
	 * @returns {string}
	 */
	inputId: computed('elementId', function() {
		return `${this.get('elementId')}-input`;
	}),

	/**
	 * Handle change event.
	 */
	change(event) {
		this.set('value', event.target.value);
		// If a custom onchange function is specified then call it.
		if (this.get('valueChangeAction')) {
			this.get('valueChangeAction')(this.get('value'));
		}
	},

	/**
	 * Returns the JQuery selector that matches the element to attach validation on.
	 * @returns {string}
	 */
	validationSelector: computed(function() {
		return `#${this.get('inputId')}`;
	})
});
