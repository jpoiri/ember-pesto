import Component from '@ember/component';
import { observer } from '@ember/object';
import { isNone } from '@ember/utils';
import  $ from 'jquery';

/**
 * This component is responsible to handle adding parsley custom validator.
 * @author bcpoiri
 */
export default Component.extend({

	tagName: 'span',

	/**
	 * By default type of validator is string.
	 */
	type: 'string',

	/**
	 * Handles when the message changed, most likely to a locale changed.
	 */
	messageChanged: observer('message', function () {
		this.updateValidator();
	}),

	/**
	 * Returns the options for a number validator
	 * @returns {object}
	 */
	getNumberValidatorOpts() {
		const self = this;
		return {

			requirementType: 'string',

			validateNumber(value, requirement) {
				return self.get('action')(value, requirement);
			},

			messages: {
				en: '' + this.get('message'),
				fr: '' + this.get('message')
			}
		};
	},

	/**
	 * Returns the options for string validator.
	 * @returns {object}
	 */
	getStringValidatorOpts() {
		const self = this;
		return {

			requirementType: 'string',

			validateString(value, requirement) {
				return self.get('action')(value, requirement);
			},

			messages: {
				en: '' + this.get('message'),
				fr: '' + this.get('message')
			}
		};
	},

	/**
	 * Returns the options for array validator.
	 * @returns {object}
	 */
	getArrayValidatorOpts() {
		const self = this;
		return {

			requirementType: 'string',

			validateMultiple(value, requirement) {
				return self.get('action')(value, requirement);
			},

			messages: {
				en: '' + this.get('message'),
				fr: '' + this.get('message')
			}
		};
	},

	/**
	 * Attach validator on fields.
	 */
	attachValidator() {
		const validationSelector = this.get('validationSelector');
		if (!isNone(validationSelector)) {
			const validatorAttributeKey = `data-parsley-${this.get('elementId')}`;
			$(validationSelector).attr(validatorAttributeKey, true);
		}
	},

	/**
	 * Add validator.
	 */
	addValidator() {
		switch (this.get('type')) {
			case 'string':
				window.Parsley.addValidator(this.get('elementId'), this.getStringValidatorOpts());
				break;
			case 'number':
				window.Parsley.addValidator(this.get('elementId'), this.getNumberValidatorOpts());
				break;
			case 'array':
				window.Parsley.addValidator(this.get('elementId'), this.getArrayValidatorOpts());
				break;
			default:
				window.Parsley.addValidator(this.get('elementId'), this.getStringValidatorOpts());
		}
		this.attachValidator();
	},

	/**
	 * Update the validator.
	 */
	updateValidator() {
		switch (this.get('type')) {
			case 'string':
				window.Parsley.updateValidator(this.get('elementId'), this.getStringValidatorOpts());
				break;
			case 'number':
				window.Parsley.updateValidator(this.get('elementId'), this.getNumberValidatorOpts());
				break;
			case 'array':
				window.Parsley.updateValidator(this.get('elementId'), this.getArrayValidatorOpts());
				break;
			default:
				window.Parsley.updateValidator(this.get('elementId'), this.getStringValidatorOpts());
		}
	},

	/**
	 * Remove validator.
	 */
	removeValidator() {
		window.Parsley.removeValidator(this.get('elementId'));
	},

	/**
	 * didInsertElement hook.
	 */
	didInsertElement() {
		if (isNone(this.get('action'))) {
			throw new Error('The action is undefined.');
		}
		if (isNone(this.get('message'))) {
			throw new Error('The message is undefined.');
		}
		if (isNone(this.get('validationSelector'))) {
			throw new Error('The validationSelector is undefined.');
		}
		this.addValidator();
	},

	/**
	 * willDestroyElement hook.
	 */
	willDestroyElement() {
		this.removeValidator();
	}
});
