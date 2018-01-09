import Ember from 'ember';

export default Ember.Mixin.create({

	/**
	 * Returns the input id.
	 * @returns {string}
	 */
	inputId: Ember.computed('elementId', function() {
		return `${this.get('elementId')}-input`;
	}),

	/**
	 * Set the validation to trigger on the blur event on the first time.
	 */
	validationTrigger: 'focusOut',

	/**
	 * Set the validation to trigger on the key up event on the subsequent time.
	 */
	validationTriggerAfterFailure: 'keyUp',

	/**
	 * Returns the JQuery selector that matches the element to attach validation on.
	 * @returns {string}
	 */
	validationSelector: Ember.computed(function() {
		return `#${this.get('inputId')}`;
	}),

	/**
	 * Default the input type to text
	 */
	type: null
});
