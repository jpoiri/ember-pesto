import Ember from 'ember';
import layout from '../templates/components/pesto-select';
import ParsleyMixin from 'ember-mx/mixins/pesto-parsley-mixin';
import ItemSortingMixin from '../mixins/pesto-item-sorting-mixin';

/**
 * This component is responsible to render a select.
 * @author bcpoiri
 */
export default Ember.Component.extend(ItemSortingMixin, ParsleyMixin, {

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
	inputId: Ember.computed('elementId', function() {
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
	validationSelector: Ember.computed(function() {
		return `#${this.get('inputId')}`;
	})
});
