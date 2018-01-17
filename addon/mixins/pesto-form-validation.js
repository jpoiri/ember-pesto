import Mixin from '@ember/object/mixin';
import { inject } from '@ember/service';
import { isNone } from '@ember/utils';
import { schedule } from '@ember/runloop';
import $ from 'jquery';

export default Mixin.create({

	validate: true,

	dirty: false,

	valid: true,

	pestoMessages: inject(),

	didInsertElement() {
		const validationSelector = this.get('validationSelector');
		if (!isNone(validationSelector)) {
			// Enable parsley instance.
			$(validationSelector).parsley();
			// Attach parsley event listeners.
			if ($(validationSelector).is('form')) {
				$(validationSelector).parsley().on('form:validate', () => {
					this.get('pestoMessages').clearMessages();
					this.triggerBeforeValidationAction();
				});
				$(validationSelector).parsley().on('form:validated', () => {
					this.set('dirty', true);
					this.triggerAfterValidationAction();
				});
				$(validationSelector).parsley().on('form:success', () => {
					this.set('valid', true);
					this.triggerValidationStateChangeAction(true);
					this.triggerValidationSuccessAction();
				});
				$(validationSelector).parsley().on('form:error', () => {
					this.set('valid', false);
					this.triggerValidationStateChangeAction(false);
					this.triggerValidationErrorAction();
				});
			}
		}
	},

	willDestroyElement() {
		// destroy parsley event listeners.
		const validationSelector = this.get('validationSelector');
		if (!isNone(validationSelector)) {
			if ($(validationSelector).is('form')) {
				$(validationSelector).parsley().off('form:success');
				$(validationSelector).parsley().off('form:error');
				$(validationSelector).parsley().off('form:validate');
				$(validationSelector).parsley().off('form:validated');
			}
		}
	},

	didReceiveAttrs() {
		// if the triggerValidation is set to true we want to trigger validation and validation is turned on.
		if (this.get('triggerValidation') && this.get('validate')) {
			// only call the validation once the field is finished rendering.
			schedule('afterRender', () => {
				const result = $(this.get('validationSelector')).parsley().validate({
					group: this.get('validateGroup')
				});
				let valid = false;
				if (result === true) {
					valid = true;
				}
				if (!isNone(this.get('triggerValidationCallbackAction'))) {
					this.get('triggerValidationCallbackAction')(valid);
				}
			});
		}
		// if the resetValidation is set to true, reset the validation and set it back to null.
		if (this.get('resetValidation')) {
			schedule('afterRender', () => {
				$(this.get('validationSelector')).parsley().reset();
				if (!isNone(this.get('resetValidationCallbackAction'))) {
					this.get('resetValidationCallbackAction')();
				}
			});
		}
	},


	triggerBeforeValidationAction() {
		// if there is an beforeValidationAction trigger it.
		if (!isNone(this.get('beforeValidationAction'))) {
			this.get('beforeValidationAction')();
		}
	},


	triggerAfterValidationAction() {
		// if there is an afterValidationAction trigger it.
		if (!isNone(this.get('afterValidationAction'))) {
			this.get('afterValidationAction')();
		}
	},


	triggerValidationStateChangeAction(valid) {
		// if there is an validationStateChangeAction trigger it.
		if (!isNone(this.get('validationStateChangeAction'))) {
			this.get('validationStateChangeAction')(valid);
		}
	},


	triggerValidationErrorAction() {
		// if there is an validationErrorAction trigger it.
		if (!isNone(this.get('validationErrorAction'))) {
			this.get('validationErrorAction')();
		}
	},


	triggerValidationSuccessAction() {
		// if there is an validationSuccessAction trigger it.
		if (!isNone(this.get('validationSuccessAction'))) {
			this.get('validationSuccessAction')();
		}
	}

});
