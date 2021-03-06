import Component from '@ember/component';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import layout from '../templates/components/pesto-radio-button';
import PestoFieldValidationMixin from '../mixins/pesto-field-validation';

/**
 * This component is responsible to render a radio button.
 * @author bcpoiri
 */
export default Component.extend(PestoFieldValidationMixin, {

	/**
	 * Conditional classes passed to the component.
	 */
	classNameBindings: ['radioClass', 'disabled:disabled'],

	/**
	 * By default the radio button class is 'radio'
	 */
	radioClass: 'radio',

	/**
	 * Component layout.
	 */
	layout,

	/**
	 * Returns the input id.
	 * @returns {string}
	 */
	inputId: computed('elementId', function() {
		return `${this.get('elementId')}-input`;
	}),

	/**
	 * Returns true if the radio button should be checked, otherwise returns false.
	 * @returns {boolean}
	 */
	isChecked: computed('value', 'groupValue', function() {
		return this.get('groupValue') === this.get('value');
	}),

	/**
	 * Listens when a radio button is clicked on.
	 */
	change() {
		this.set('groupValue', this.get('value'));
		if (!isNone(this.get('valueChangeAction'))) {
			this.get('valueChangeAction')(this.get('value'));
		}
	},

	/**
	 * Returns the JQuery selector that matches the element to attach validation on.
	 * @returns {string}
	 */
	validationSelector: computed(function() {
		return `#${this.get('inputId')}`;
	}),

});