import Ember from 'ember';
import layout from '../templates/components/pesto-form';
import ParsleyMixin from '../mixins/pesto-parsley-mixin';

/**
 * This component is responsive to render a form that enables parsley validation.
 * @author bcpoiri
 */
export default Ember.Component.extend(ParsleyMixin, {
	/**
	 * Component layout
	 */
	layout,

	tagName: 'form',

	classNameBindings: ['typeClass'],

	attributeBindings: ['accept', 'accept-charset', 'method', 'autocomplete', 'enctype',
		'target', 'accesskey', 'contenteditable', 'contextmenu', 'dir', 'draggable', 'dropzone',
		'hidden', 'lang', 'spellcheck', 'tabindex', 'title', 'translate', 'data-parsley-namespace',
		'data-parsley-priority-enabled', 'data-parsley-inputs', 'data-parsley-excluded', 'novalidate',
		'testAutomationId:data-test-automation-id'],

	novalidate: '',

	/**
	 * Enable validation on field.
	 */
	validate: true,

	htmlType: null,

	submit() {
		if (this.get('validate')) {
			const ctx = this.getParsleyContext(this.get('validationSelector'));
			const valid = ctx.validate({
				group: this.get('validateGroup')
			});
			if (valid) {
				if (!Ember.isNone(this.get('action'))) {
					this.get('action')();
				}
			}
		} else {
			if (!Ember.isNone(this.get('action'))) {
				this.get('action')();
			}
		}
		return false;
	},
	/**
	 * Returns the form class based on the type of form
	 */
	typeClass: Ember.computed('type', function () {
		switch (this.get('type')) {
			case 'inline':
				return 'form-inline';
			case 'horizontal':
				return 'form-horizontal';
			default:
				return '';
		}
	}),

	/**
	 * Returns the object to validate.
	 */
	validationSelector: Ember.computed(function() {
		return this.element;
	}),

	didInsertElement() {
		this._super(...arguments);
		Ember.$(this.element).off('submit.Parsley');
	},

});