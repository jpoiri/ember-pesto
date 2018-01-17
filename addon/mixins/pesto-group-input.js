import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';

/**
 * This mixin holds the common functionality between all group components.
 */
export default Mixin.create({
	/**
	 * Classes that will be passed to the component.
	 */
	classNames: 'form-group',

	/**
	 * The label is visible by default.
	 */
	labelVisible: true,

	/**
	 * Returns the name that will be passed to each checkbox, this required for parsley validation.
	 * @returns {string}
	 */
	groupName: computed('name', function () {
		if (!isNone(this.get('name'))) {
			return this.get('name');
		}
		return this.get('elementId');
	}),

	/**
	 * Returns the JQuery selector that matches the element to attach validation on.
	 * @returns {string}
	 */
	validationSelector: computed(function () {
		return `#${this.elementId} input`;
	}),

	/**
	 * Handle when value changed.
	 */
	actions: {
		valueChangeAction(value) {
			if (!isNone(this.get('valueChangeAction'))) {
				this.get('valueChangeAction')(value);
			}
		}
	}
});

