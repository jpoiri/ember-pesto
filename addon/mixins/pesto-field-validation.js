import Ember from 'ember';

const { computed, $, isNone, isEqual, isEmpty, run, observer } = Ember;

export default Ember.Mixin.create({

	validation: true,

	dirty: false,

	valid: true,

	focusOnError: true,

	hasAfterValidationSuccessAction: computed.notEmpty('afterValidationSuccessAction'),

	hasAfterValidationErrorAction: computed.notEmpty('afterValidationErrorAction'),

	hasBeforeValidationAction: computed.notEmpty('beforeValidationAction'),

	hasAfterValidationAction: computed.notEmpty('afterValidationAction'),

	hasAfterResetAction: computed.notEmpty('afterResetAction'),

	hasAfterValidationTriggeredAction: computed.notEmpty('afterValidationTriggeredAction'),

	hasAfterResetTriggeredAction: computed.notEmpty('afterResetTriggeredAction'),

	hasAfterValidationStateChangeAction: computed.notEmpty('afterValidationStateChangeAction'),

	pestoMessages: Ember.inject.service(),

	/**
	 * Returns the html type attribute based on the component type property.
	 * @returns {string}
	 */
	htmlType: computed('type', function () {
		switch (this.get('type')) {
			case 'digits':
			case 'alphanum':
			case 'number':
			case 'integer':
				return 'text';
			default:
				return this.get('type');
		}
	}),

	validationIfEmptyComputed: computed('validationIfEmpty', function () {
		if (this.get('validationIfEmpty')) {
			return this.get('validationIfEmpty');
		}
		return null;
	}),

	/**
	 * Returns the data-parsley-type attribute based on the component type property
	 * @returns {string}
	 */
	validationType: computed('type', function () {
		switch (this.get('type')) {
			case 'email':
			case 'number':
			case 'integer':
			case 'digits':
			case 'alphanum':
			case 'url':
				return this.get('type');
			default:
				return null;
		}
	}),

	/**
	 * Returns the value for the data-parsley-trigger attribute based on the triggerUpdateOn property.
	 * @returns {string}
	 */
	validationTriggerComputed: computed('validationTrigger', function () {
		switch (this.get('validationTrigger')) {
			case 'focusOut':
				return 'focusout';
			case 'focusIn':
				return 'focusin';
			case 'keyDown':
				return 'keydown';
			case 'keyPress':
				return 'keypress';
			case 'keyUp':
				return 'keyup';
			case 'blur':
				return 'blur';
			case 'change':
				return 'change';
			default:
				return null;
		}
	}),

	/**
	 * Returns the value for the data-parsley-trigger attribute based on the triggerUpdateOn property.
	 * @returns {string}
	 */
	validationTriggerAfterFailureComputed: computed('validationTriggerAfterFailure', function () {
		switch (this.get('validationTriggerAfterFailure')) {
			case 'focusOut':
				return 'focusout';
			case 'focusIn':
				return 'focusin';
			case 'keyDown':
				return 'keydown';
			case 'keyPress':
				return 'keypress';
			case 'keyUp':
				return 'keyup';
			case 'blur':
				return 'blur';
			case 'change':
				return 'change';
			default:
				return null;
		}
	}),

	/**
	 * This event handler is responsible to inject custom validators in the component.
	 */
	didInsertElement() {
		this._super();
		const validationSelector = this.get('validationSelector');
		if (!isNone(validationSelector)) {
			// Enable parsley instance.
			$(validationSelector).parsley();
			// Attach parsley event listeners.
			$(validationSelector).parsley().on('field:reset', () => {
				this.set('dirty', false);
				this.triggerAfterResetAction();
			});
			$(validationSelector).parsley().on('field:validate', () => {
				this.triggerBeforeValidationAction();
			});
			$(validationSelector).parsley().on('field:validated', () => {
				this.set('dirty', true);
				this.triggerAfterValidationAction();
			});
			$(validationSelector).parsley().on('field:success', () => {
				this.get('pestoMessages').addMessage(this.get('elementId'), this.get('successMessage'), 'success');
				this.set('valid', true);
				this.triggerAfterValidationSuccessAction();
			});
			$(validationSelector).parsley().on('field:error', (field) => {
				this.set('errorMessages', this.getErrorMessages(field));
				this.set('valid', false);
				this.triggerAfterValidationErrorAction();
			});
		}
	},

	/**
	 * didDestroyElement hook.
	 */
	willDestroyElement() {
		// destroy parsley event listeners.
		const validationSelector = this.get('validationSelector');
		if (!isNone(validationSelector)) {
			$(validationSelector).parsley().off('field:reset');
			$(validationSelector).parsley().off('field:validate');
			$(validationSelector).parsley().off('field:validated');
			$(validationSelector).parsley().off('field:success');
			$(validationSelector).parsley().off('field:error');
		}
	},

	/**
	 * didReceiveAttrs hook.
	 */
	didReceiveAttrs() {
		if (this.get('triggerValidation') && this.get('validation')) {
			run.schedule('afterRender', () => {
				const valid = $(this.get('validationSelector')).parsley().validate();
				this.triggerAfterValidationTriggeredAction((valid === true));
			});
		}
		if (this.get('triggerReset')) {
			run.schedule('afterRender', () => {
				$(this.get('validationSelector')).parsley().reset();
				this.triggerAfterResetTriggeredAction();
			});
		}
	},

	/**
	 * Returns the error messages for a field.
	 * @param field The field.
	 * @returns {array}
	 */
	getErrorMessages(field) {
		const errorMessages = Ember.A();
		if (!isEmpty(this.get('errorMessage'))) {
			errorMessages.pushObject(this.get('errorMessage'));
			this.get('pestoMessages').addMessage(this.get('elementId'), this.get('errorMessage'), 'error');
		} else {
			for (let i = 0; i < field.getErrorsMessages().length; i++) {
				errorMessages.pushObject(field.getErrorsMessages()[i]);
				this.get('pestoMessages').addMessage(this.get('elementId'), field.getErrorsMessages()[i], 'error');
			}
		}
		return errorMessages;
	},

	/**
	 * Trigger beforeValidationAction.
	 */
	triggerAfterResetAction() {
		if (this.get('hasAfterResetAction')) {
			this.get('afterResetAction')();
		}
	},

	/**
	 * Trigger beforeValidationAction.
	 */
	triggerBeforeValidationAction() {
		if (this.get('hasBeforeValidationAction')) {
			this.get('beforeValidationAction')();
		}
	},

	/**
	 * Trigger afterValidationAction.
	 */
	triggerAfterValidationAction() {
		if (this.get('hasAfterValidationAction')) {
			this.get('afterValidationAction')();
		}
	},

	/**
	 * Trigger afterValidationErrorAction.
	 */
	triggerAfterValidationErrorAction() {
		if (this.get('hasAfterValidationErrorAction')) {
			this.get('afterValidationErrorAction')(this.get('errorMessages'));
		}
	},

	/**
	 * Trigger afterValidationSuccessAction.
	 */
	triggerAfterValidationSuccessAction() {
		if (this.get('hasAfterValidationSuccessAction')) {
			this.get('afterValidationSuccessAction')(this.get('successMessage'));
		}
	},

	/**
	 * Trigger afterValidationTriggeredAction.
	 * @param valid if field is valid.
	 */
	triggerAfterValidationTriggeredAction(valid) {
		if (this.get('hasAfterValidationTriggeredAction')) {
			this.get('afterValidationTriggeredAction')(valid);
		}
	},

	/**
	 * Trigger afterResetTriggeredAction.
	 */
	triggerAfterResetTriggeredAction() {
		if (this.get('hasAfterResetTriggeredAction')) {
			this.get('afterResetTriggeredAction')();
		}
	},

	customValidatorValueChanged: observer('equalTo', 'greaterTo', 'greaterOrEqualTo',
		'lesserTo', 'lesserOrEqualTo', function() {
		if (this.get('dirty')) {
			$(this.get('validationSelector')).parsley().validate();
		}
	}),

	actions: {

		validateGreaterTo(value) {
			return parseInt(value, 10) > parseInt(this.get('greaterTo'), 10);
		},

		validateGreaterOrEqualTo(value) {
			return parseInt(value, 10) >= parseInt(this.get('greaterOrEqualTo'), 10);
		},

		validateLesserTo(value) {
			return parseInt(value, 10) < parseInt(this.get('lesserTo'), 10);
		},

		validateLesserOrEqualTo(value) {
			return parseInt(value, 10) <= parseInt(this.get('lesserOrEqualTo'), 10);
		},

		validateEqualTo(value) {
			return isEqual(value, this.get('equalTo'));
		}
	}

});
