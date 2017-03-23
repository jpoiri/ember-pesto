import Ember from 'ember';

export default Ember.Mixin.create({
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
	type: null,

	/**
	 * Action to handle events.
	 */
	actions: {
		focusIn() {
			// Do we need to execute a function passed as a parameter?
			if (!Ember.isEmpty(this.get('focusInAction'))) {
				this.get('focusInAction')();
			}
		},
		focusOut() {
			// Do we need to execute a function passed as a parameter?
			if (!Ember.isEmpty(this.get('focusOutAction'))) {
				this.get('focusOutAction')();
			}
		},
		keyPress() {
			// Do we need to execute a function passed as a parameter?
			if (!Ember.isEmpty(this.get('keyPressAction'))) {
				this.get('keyPressAction')();
			}
		},
		keyUp() {
			// Do we need to execute a function passed as a parameter?
			if (!Ember.isEmpty(this.get('keyUpAction'))) {
				this.get('keyUpAction')();
			}
		},
		keyDown() {
			// Do we need to execute a function passed as a parameter?
			if (!Ember.isEmpty(this.get('keyDownAction'))) {
				this.get('keyDownAction')();
			}
		}
	}
});
