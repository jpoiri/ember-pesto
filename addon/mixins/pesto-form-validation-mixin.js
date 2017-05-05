import Ember from 'ember';

export default Ember.Mixin.create({

	validate: true,

	dirty: false,

	valid: true,

	/**
	 * This event handler is responsible to inject custom validators in the component.
	 */
	didInsertElement() {
		const validationSelector = this.get('validationSelector');
		if (!Ember.isNone(validationSelector)) {
			// Enable parsley instance.
			Ember.$(validationSelector).parsley();
			// Attach parsley event listeners.
			if (Ember.$(validationSelector).is('form')) {
				Ember.$(validationSelector).parsley().on('form:validate', () => {
					this.triggerBeforeValidationAction();
				});
				Ember.$(validationSelector).parsley().on('form:validated', () => {
					this.set('dirty', true);
					this.triggerAfterValidationAction();
				});
				Ember.$(validationSelector).parsley().on('form:success', () => {
					this.set('valid', true);
					this.triggerValidationStateChangeAction(true);
					this.triggerValidationSuccessAction();
				});
				Ember.$(validationSelector).parsley().on('form:error', () => {
					this.set('valid', false);
					this.triggerValidationStateChangeAction(false);
					this.triggerValidationErrorAction();
				});
			}
		}
	},

	/**
	 * didDestroyElement hook.
	 */
	willDestroyElement() {
		// destroy parsley event listeners.
		const validationSelector = this.get('validationSelector');
		if (!Ember.isNone(validationSelector)) {
			if (Ember.$(validationSelector).is('form')) {
				Ember.$(validationSelector).parsley().off('form:success');
				Ember.$(validationSelector).parsley().off('form:error');
				Ember.$(validationSelector).parsley().off('form:validate');
				Ember.$(validationSelector).parsley().off('form:validated');
			}
		}
	},

	/**
	 * didReceiveAttrs hook.
	 */
	didReceiveAttrs() {
		// if the triggerValidation is set to true we want to trigger validation and validation is turned on.
		if (this.get('triggerValidation') && this.get('validate')) {
			// only call the validation once the field is finished rendering.
			Ember.run.schedule('afterRender', () => {
				const result = Ember.$(this.get('validationSelector')).parsley().validate({
					group: this.get('validateGroup')
				});
				let valid = false;
				if (result === true) {
					valid = true;
				}
				if (!Ember.isNone(this.get('triggerValidationCallbackAction'))) {
					this.get('triggerValidationCallbackAction')(valid);
				}
			});
		}
		// if the resetValidation is set to true, reset the validation and set it back to null.
		if (this.get('resetValidation')) {
			Ember.run.schedule('afterRender', () => {
				Ember.$(this.get('validationSelector')).parsley().reset();
				if (!Ember.isNone(this.get('resetValidationCallbackAction'))) {
					this.get('resetValidationCallbackAction')();
				}
			});
		}
	},

	/**
	 * Trigger beforeValidationAction.
	 */
	triggerBeforeValidationAction() {
		// if there is an beforeValidationAction trigger it.
		if (!Ember.isNone(this.get('beforeValidationAction'))) {
			this.get('beforeValidationAction')();
		}
	},

	/**
	 * Trigger afterValidationAction.
	 */
	triggerAfterValidationAction() {
		// if there is an afterValidationAction trigger it.
		if (!Ember.isNone(this.get('afterValidationAction'))) {
			this.get('afterValidationAction')();
		}
	},

	/**
	 * Trigger validationStateChangeAction
	 * @param valid If element is valid
	 */
	triggerValidationStateChangeAction(valid) {
		// if there is an validationStateChangeAction trigger it.
		if (!Ember.isNone(this.get('validationStateChangeAction'))) {
			this.get('validationStateChangeAction')(valid);
		}
	},

	/**
	 * Trigger validationErrorAction.
	 */
	triggerValidationErrorAction() {
		// if there is an validationErrorAction trigger it.
		if (!Ember.isNone(this.get('validationErrorAction'))) {
			this.get('validationErrorAction')();
		}
	},

	/**
	 * Trigger validationSuccessAction.
	 */
	triggerValidationSuccessAction() {
		// if there is an validationSuccessAction trigger it.
		if (!Ember.isNone(this.get('validationSuccessAction'))) {
			this.get('validationSuccessAction')();
		}
	}
});
