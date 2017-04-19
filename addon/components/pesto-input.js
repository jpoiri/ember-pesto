import Ember from 'ember';
import layout from '../templates/components/pesto-input';
import ParsleyMixin from '../mixins/pesto-parsley-mixin';
import InputMixin from '../mixins/pesto-input-mixin';

const {computed} = Ember;

/**
 * This component is responsible to render an input.
 * @module
 * @author bcpoiri
 */
export default Ember.Component.extend(InputMixin, ParsleyMixin, {

	/**
	 * Component layout.
	 */
	layout,

    classNameBindings: [
    	'hasFeedbackClass:has-feedback',
    	'hasErrorClass:has-error',
    	'hasSuccessClass:has-success'
    ],

	autoComplete: true,

	autoCompleteComputed: computed('autoComplete', function() {
		if (this.get('autoComplete')) {
			return 'on';
		}
		return  'off';
	}),

    hasFeedbackClass: computed('hasIcon', 'dirty', function() {
    	return (this.get('hasIcon') || this.get('dirty'));
    }),

    hasErrorClass: computed('dirty', 'valid', function() {
    	return (this.get('dirty') && !this.get('valid'));
    }),

    hasSuccessClass: computed('dirty', 'valid', 'showSuccess', function() {
        return (this.get('dirty') && this.get('valid') && this.get('showSuccess'));
    }),

    hasIcon: computed.notEmpty('iconClass'),

    hasSuccessIcon: computed.notEmpty('successIconClass'),

    hasErrorIcon: computed.notEmpty('errorIconClass'),

    hasSuccessMessage: computed.notEmpty('successMessage'),

    iconClassComputed: computed('dirty', 'valid', 'hasErrorIcon', 'hasSuccessIcon', 'showSuccess', function() {
    	if (this.get('dirty') && this.get('valid') && this.get('hasSuccessIcon') && this.get('showSuccess')) {
    		return this.get('successIconClass');
    	} else if (this.get('dirty') && !this.get('valid') && this.get('hasErrorIcon')) {
    		return this.get('errorIconClass');
    	}
    	return this.get('iconClass');
    }),

    showSuccessMessage: computed('dirty', 'valid', 'hasSuccessMessage', 'showSuccess', function() {
    	return this.get('dirty') && this.get('valid') && this.get('hasSuccessMessage') && this.get('showSuccess')
    })

});