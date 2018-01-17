import Component from '@ember/component';
import { and } from '@ember/object/computed';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import { A } from '@ember/array';
import $ from 'jquery';
import layout from '../templates/components/pesto-checkbox';
import PestoFieldValidationMixin from '../mixins/pesto-field-validation';

/**
 * This component is responsible renders a checkbox input.
 * @module
 */
export default Component.extend(PestoFieldValidationMixin, {

	/**
	 * Component layout.
	 */
	layout,

	/**
	 * Classes that will be passed to the component.
	 */
	classNameBindings: ['group::form-group', 'group:checkbox', 'groupAndDisabled:disabled', 'inline:checkbox-inline'],

	inline: false,

	/**
	 * Add the disabled class on component only its part of group and disabled.
	 */
	groupAndDisabled: and('group', 'disabled'),

	/**
	 * The label is visible by default.
	 */
	labelVisible: true,

	/**
	 * Returns the input id.
	 * @returns {string}
	 */
	inputId: computed('elementId', function () {
		return `${this.get('elementId')}-input`;
	}),

	/**
	 * Returns true if checkbox is checked, otherwise return false.
	 * based on the following rules
	 * if use standalone the value is true/false
	 * if use in a group, the checkbox is only check if value is included in the array.
	 */
	checked: computed('groupValue', 'value', 'group', {
		get() {
			if (this.get('group')) {
				if (isNone(this.get('groupValue'))) {
					return false;
				}
				return this.get('groupValue').includes(this.get('value'));
			}
			return this.get('value');
		},
		set(key, checked) {
			if (this.get('group')) {
				if (isNone(this.get('groupValue'))) {
					this.set('groupValue', A());
				}
				if (checked) {
					this.get('groupValue').pushObject(this.get('value'));
				} else {
					this.get('groupValue').removeObject(this.get('value'));
				}
			} else {
				this.set('value', checked);
			}
			return checked;
		}
	}),

	/**
	 * Listens when the checkbox is clicked on.
	 */
	change() {
		if (!isNone(this.get('valueChangeAction'))) {
			this.get('valueChangeAction')(this.get('checked'));
		}
	},

	/**
	 * Returns the JQuery selector that matches the element to attach validation on.
	 * @returns {string}
	 */
	validationSelector: computed(function () {
		return `#${this.get('inputId')}`;
	}),

	/**
	 * didInsertElement hook
	 */
	didInsertElement() {
		this._super(...arguments);
		// this is a hack because the checkbox helper doesn't support binding a value property.
		if (this.get('group')) {
			$(this.get('validationSelector')).attr('value', this.get('value'));
		}
	}

});