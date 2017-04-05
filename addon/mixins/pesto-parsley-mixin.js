import Ember from 'ember';

/**
 * This mixin exposes all common functionality for parsley validation.
 */
export default Ember.Mixin.create({

	validate: true,

	dirty: false,

	valid: true,

	validationSuccessIconClass: 'fa fa-check',

	validationErrorIconClass: 'fa fa-remove',

	showValidationError: true,

	showValidationSuccess: false,

	showValidationSuccessIcon: true,

	showValidationErrorIcon: true,

	classNameBindings: ['hasFeedback:has-feedback', 'hasError:has-error', 'hasSuccess:has-success'],

	hasFeedback: Ember.computed('iconClass', 'dirty', function() {
		if (this.get('dirty')) {
			return true;
		} else if (!Ember.isNone(this.get('iconClass'))) {
			return true;
		}
		return false;
	}),

	hasError: Ember.computed('dirty', 'valid', function() {
		return (this.get('dirty') && !this.get('valid') && this.get('showValidationErrorState'));
	}),

	hasSuccess: Ember.computed('dirty', 'valid', function() {
    	return (this.get('dirty') && this.get('valid') && this.get('showValidationSuccessState'));
    }),

	formControlFeedbackClass: Ember.computed('iconClass', 'dirty', 'valid',
		'validationSuccessIconClass', 'validationErrorIconClass',
		'showValidationSuccessIcon', 'showValidationErrorIcon', function() {
		if (this.get('dirty')) {
			if (this.get('valid') && this.get('showValidationSuccessIcon')) {
				return this.get('validationSuccessIconClass');
			} else if (!this.get('valid') && this.get('showValidationErrorIcon')) {
				return this.get('validationErrorIconClass');
			} else if (!Ember.isNone(this.get('iconClass'))) {
				return this.get('iconClass');
			}
			return null;
		} else if (!Ember.isNone(this.get('iconClass'))) {
			return this.get('iconClass');
		}
		return null;
	}),

	/**
	 * Returns the html type attribute based on the component type property.
	 * @returns {string}
	 */
	htmlType: Ember.computed('type', function() {
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

	validateIfEmptyComputed: Ember.computed('validateIfEmpty', function() {
		if (this.get('validateIfEmpty')) {
			return this.get('validateIfEmpty');
		}
		return null;
	}),

	/**
	 * Returns the data-parsley-type attribute based on the component type property
	 * @returns {string}
	 */
	validationType: Ember.computed('type', function() {
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
	validationTriggerComputed: Ember.computed('validationTrigger', function() {
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
	validationTriggerAfterFailureComputed: Ember.computed('validationTriggerAfterFailure', function() {
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
	 * Returns the message for invalid minimum length. It will return the length message unless there
	 * is a minimum length message declared.
	 * @returns {string}
	 */
	minimumLengthMessageComputed: Ember.computed('lengthMessage', 'minimumLengthMessage', function() {
		if (!Ember.isNone(this.get('minimumLengthMessage'))) {
			return this.get('minimumLengthMessage');
		}
		return this.get('lengthMessage');
	}),

	/**
	 * Returns the message for invalid maximum length. It will return the length message unless there
	 * is a minimum length message declared.
	 * @returns {string}
	 */
	maximumLengthMessageComputed: Ember.computed('lengthMessage', 'maximumLengthMessage', function() {
		if (!Ember.isNone(this.get('maximumLengthMessage'))) {
			return this.get('maximumLengthMessage');
		}
		return this.get('lengthMessage');
	}),

	/**
	 * Returns the message for invalid minimum value. It will return the range message unless there
	 * is a minimum value message declared.
	 * @returns {string}
	 */
	minimumValueMessageComputed: Ember.computed('rangeMessage', 'minimumValueMessage', function() {
		if (!Ember.isNone(this.get('minimumValueMessage'))) {
			return this.get('minimumValueMessage');
		}
		return this.get('rangeMessage');
	}),

	/**
	 * Returns the message for invalid maximum value. It will return the range message unless there
	 * is a maximum value message declared.
	 * @returns {string}
	 */
	maximumValueMessageComputed: Ember.computed('rangeMessage', 'maximumValueMessage', function() {
		if (!Ember.isNone(this.get('maximumValueMessage'))) {
			return this.get('maximumValueMessage');
		}
		return this.get('rangeMessage');
	}),

	/**
	 * Returns the message for invalid minimum checked value. It will return the checked range message unless there
	 * is a minimum checked message declared.
	 * @returns {string}
	 */
	minimumCheckedMessageComputed: Ember.computed('checkedRangeMessage', 'minimumCheckedMessage', function() {
		if (!Ember.isNone(this.get('minimumCheckedMessage'))) {
			return this.get('minimumCheckedMessage');
		}
		return this.get('checkedRangeMessage');
	}),

	/**
	 * Returns the message for invalid maximum checked value. It will return the checked range message unless there
	 * is a maximum checked message declared.
	 * @returns {string}
	 */
	maximumCheckedMessageComputed: Ember.computed('checkedRangeMessage', 'maximumCheckedMessage', function() {
		if (!Ember.isNone(this.get('maximumCheckedMessage'))) {
			return this.get('maximumCheckedMessage');
		}
		return this.get('checkedRangeMessage');
	}),

	/**
	 * Returns the value for the data-parsley-errors-container attribute.
	 * @returns {string}
	 */
	errorMessagesContainerComputed: Ember.computed('errorMessagesContainer', function() {
		if (!Ember.isNone(this.get('errorMessagesContainer'))) {
			return `#${this.get('errorMessagesContainer')}`;
		}
		return null;
	}),

	/**
	 * Returns the value for the data-parsley-class-handler attribute.
	 * @returns {string}
	 */
	validationClassHandlerComputed: Ember.computed('validationClassHandler', function() {
		if (!Ember.isNone(this.get('validationClassHandler'))) {
			return `#${this.get('validationClassHandler')}`;
		}
		return null;
	}),

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
			} else {
				Ember.$(validationSelector).parsley().on('field:validate', () => {
					this.triggerBeforeValidationAction();
				});
				Ember.$(validationSelector).parsley().on('field:validated', () => {
					this.set('dirty', true);
					this.triggerAfterValidationAction();
				});
				Ember.$(validationSelector).parsley().on('field:success', () => {
					this.set('valid', true);
					this.triggerValidationStateChangeAction(true);
					this.triggerValidationSuccessAction();
				});
				Ember.$(validationSelector).parsley().on('field:error', () => {
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
			} else {
				Ember.$(validationSelector).parsley().off('field:success');
				Ember.$(validationSelector).parsley().off('field:error');
				Ember.$(validationSelector).parsley().off('field:validate');
				Ember.$(validationSelector).parsley().off('field:validated');
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
	},


	/**
	 * Returns the parsley context based on fields passed.
	 * @param fields
	 * @returns {*}
	 */
	getParsleyContext(fields) {
		return {
			/**
			 * Reset the parsley form or fields.
			 * @param fields The list of fields to reset.
			 */
			reset() {
				if (!Ember.isNone(fields)) {
					Ember.$(fields).each(function() {
						// reset parsley field.
						Ember.$(this).parsley().reset();
						if (Ember.$(this).is('form')) {
							Ember.$('form .form-control-feedback').remove();
						}
					});
				}
			},
			/**
			 * Destroy the parsley form or fields.
			 * @param fields
			 */
			destroy() {
				// destroy all parsley fields.
				if (!Ember.isNone(fields)) {
					Ember.$(fields).each(function() {
						// remove parsley on field.
						Ember.$(this).parsley().destroy();
					});
				}
			},
			/**
			 * Returns true if the form or fields is valid.
			 * @param fields The fields.
			 * @param opts The options.
			 * @returns {boolean}
			 */
			isValid(opts = {
					force: false
				}) {
				// only validate if validate it set to true.
				if (!Ember.isNone(fields)) {
					let valid = true;
					// loop through every field who has parsley attach.
					Ember.$(fields).each(function() {
						if (Ember.$(this).is('form')) {
							if (!Ember.$(this).parsley().isValid({
										group: opts.group,
										force: opts.force
									}) && valid) {
								valid = false;
							}
						} else {
							if (!Ember.$(this).parsley().isValid({
										force: opts.force
									}) && valid) {
								valid = false;
							}
						}
					});
					return valid;
				}
				return true;
			},
			validate(opts = {
					force: false
				}) {
				if (!Ember.isNone(fields)) {
					let valid = true;
					Ember.$(fields).each(function() {
						if (Ember.$(this).parsley().validate({
									group: opts.group,
									force: opts.force
								}) !== true) {
							if (valid) {
								Ember.$(this).focus();
							}
							valid = false;
						}
					});
					return valid;
				}
				return true;
			}
		};
	},

    customValidatorValueChanged: Ember.observer('equalTo', 'greaterTo', 'greaterOrEqualTo',
    		'lesserTo', 'lesserOrEqualTo', function() {
    	if (this.get('dirty')) {
    		Ember.$(this.get('validationSelector')).parsley().validate();
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
    		return Ember.isEqual(value, this.get('equalTo'));
    	}
    }
});
