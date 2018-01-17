import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

export default Mixin.create({

	/**
	 * Returns the input id.
	 * @returns {string}
	 */
	inputId: computed('elementId', function() {
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
	validationSelector: computed(function() {
		return `#${this.get('inputId')}`;
	}),

	/**
	 * Default the input type to text
	 */
	type: null
});
