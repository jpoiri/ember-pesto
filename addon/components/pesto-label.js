import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/pesto-label';

/**
 * This components renders a label tag.
 * @author bcpoiri
 */
export default Component.extend({

	/**
	 * Component layout.
	 */
	layout,

	/**
	 * Tag the component will render.
	 */
	tagName: 'label',

	/**
	 * Attributes that will be passed to component.
	 */
	attributeBindings: ['for', 'ariaLabelComputed:aria-label'],

	/**
	 * Classes that will be passed to the component.
	 */
	classNames: ['control-label'],

	/**
	 * Add the sr-only class only visible set to false.
	 */
	classNameBindings: ['visible::sr-only'],

	/**
	 * Default label to visible.
	 */
	visible: true,

	/**
	 * Returns the aria-label property only when visible is set to false.
	 * @returns {string}
	 */
	ariaLabelComputed: computed('label', 'visible', function () {
		if (!this.get('visible')) {
			return this.get('value');
		}
		return null;
	})
});