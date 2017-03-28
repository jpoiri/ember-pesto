import Ember from 'ember';
import layout from '../templates/components/pesto-button';
import ParsleyMixin from '../mixins/pesto-parsley-mixin';


/**
 * This component is responsible to render bootstrap button and validate the parsley form before calling the action.
 * @author bcpoiri
 */
export default Ember.Component.extend(ParsleyMixin, {
	/**
	 * Component layout.
	 */
	layout,

	tagName: 'button',

	attributeBindings: ['buttonType:type', 'role', 'autofocus', 'disabled', 'form', 'formaction', 'formenctype', 'formmethod',
		'formnovalidate', 'formtarget', 'name', 'value', 'accesskey', 'contenteditable', 'contextmenu', 'dir',
		'draggable', 'dropzone', 'hidden', 'lang', 'spellcheck', 'style', 'tabindex', 'title', 'translate', 'testAutomationId:data-test-automation-id'],

	role: 'button',
	/**
	 * Enable validation on field.
	 */
	validate: false,

	iconPosition: 'right',

	isIconLeft: Ember.computed.equal('iconPosition', 'left'),

	/**
	 * The type of button
	 * @default button.
	 */
	buttonType: Ember.computed('submit', function() {
		if (this.get('submit')) {
			return 'submit';
		}
		return 'button';
	}),

	type: 'default',

	/**
	 * The list of class names.
	 * @default btn
	 */
	classNames: ['btn'],

	/**
	 * The class name bindings
	 */
	classNameBindings: ['contextClass', 'sizeClass', 'blockClass', 'activeClass', 'disabledClass'],

	/**
	 * Returns the context class based on the type
	 */
	contextClass: Ember.computed('type', function() {
		switch (this.get('type')) {
			case 'primary':
				return 'btn-primary';
			case 'success':
				return 'btn-success';
			case 'info':
				return 'btn-info';
			case 'warning':
				return 'btn-warning';
			case 'danger':
				return 'btn-danger';
			case 'link':
				return 'btn-link';
			default:
				return 'btn-default';
		}
	}),
	/**
	 * Returns the size class based on the size
	 */
	sizeClass: Ember.computed('size', function() {
		let btnSize;
		switch (this.get('size')) {
			case 'sm':
			case 'small':
				btnSize = 'btn-sm';
				break;
			case 'xs':
			case 'extra-small':
				btnSize = 'btn-xs';
				break;
			case 'md':
			case 'medium':
				btnSize = 'btn-md';
				break;
			case 'lg':
			case 'large':
				btnSize = 'btn-lg';
				break;
			default:
				btnSize = 'btn-md';
		}
		// Overrides the size if the button is a 'block' button (occupies 100% width)
		if (this.get('block')) {
			btnSize = 'btn-lg';
		}
		return btnSize;
	}),

	/**
	 * Returns the block class based on the block attribute.
	 */
	blockClass: Ember.computed('block', function() {
		if (this.get('block')) {
			return 'btn-block';
		}
		return '';
	}),
	/**
	 * Returns the active class if the button is active.
	 */
	activeClass: Ember.computed('active', function() {
		if (this.get('active')) {
			return 'active';
		}
		return '';
	}),

	/**
	 * Returns the disabled class if the button is disabled.
	 */
	disabledClass: Ember.computed('disabled', function() {
		if (this.get('disabled')) {
			return 'disabled';
		}
		return '';
	}),

	/**
	 * Returns the list of validate fields.
	 * @returns {*}
	 */
	getForm() {
		const validateForm = this.get('form');
		if (!Ember.isEmpty(validateForm) && !Ember.isEmpty(Ember.$(`#${validateForm}`))) {
			return Ember.$(`#${validateForm}`);
		}
		return Ember.$(this.element).closest('form');
	},

	/**
	 * Handles when a button is clicked. If the form is valid send
	 * the default action, otherwise return false.
	 * @listens click
	 * @returns {boolean}
	 */
	click() {
		if (!this.get('submit')) {
			if (this.get('validate')) {
				const ctx = this.getParsleyContext(this.getForm());
				const valid = ctx.validate({
					group: this.get('validateGroup')
				});
				if (valid && !Ember.isNone(this.get('action'))) {
					this.get('action')();
				}
			} else {
				if (!Ember.isNone(this.get('action'))) {
					this.get('action')();
				}
			}
		}
	}
});

