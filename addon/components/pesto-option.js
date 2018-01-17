import Component from '@ember/component';
import layout from '../templates/components/pesto-option';

/**
 * This components renders a option tag.
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
	tagName: 'option',

	/**
	 * Attributes that will be passed to component.
	 */
	attributeBindings: ['disabled', 'selected', 'value']
});
