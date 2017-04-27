import Ember from 'ember';

const { computed } = Ember;

export default Ember.Mixin.create({

	classNameBindings: [
    	'hasFeedbackClass:has-feedback',
    	'hasErrorClass:has-error',
    	'hasSuccessClass:has-success'
    ],

    showErrorState: true,

    showSuccessState: false,

    showLabel: true,

    showMessages: true,

    showFirstErrorMessageOnly: true,

    hasFeedbackClass: computed('hasIcon', 'dirty', function() {
    	return (this.get('hasIcon') || this.get('dirty'));
    }),

    hasErrorClass: computed('dirty', 'valid', 'showErrorState', function() {
    	return (this.get('dirty') && !this.get('valid') && this.get('showErrorState'));
    }),

    hasSuccessClass: computed('dirty', 'valid', 'showSuccessState', function() {
        return (this.get('dirty') && this.get('valid') && this.get('showSuccessState'));
    }),

    hasIcon: computed.notEmpty('iconClass'),

    hasSuccessIcon: computed.notEmpty('successIconClass'),

    hasErrorIcon: computed.notEmpty('errorIconClass'),

    formControlFeedbackClass: computed('dirty', 'valid', 'hasErrorIcon',
    	'hasSuccessIcon', 'showSuccessState', 'showErrorState', function() {
    	if (this.get('dirty') && this.get('valid') && this.get('hasSuccessIcon') && this.get('showSuccessState')) {
    		return this.get('successIconClass');
    	} else if (this.get('dirty') && !this.get('valid') && this.get('hasErrorIcon') && this.get('showErrorState')) {
    		return this.get('errorIconClass');
    	}
    	return this.get('iconClass');
    }),

    showSuccessMessage: computed('dirty', 'valid', 'showSuccessState', 'showMessages', function() {
    	return this.get('dirty') && this.get('valid') && this.get('showSuccessState') && this.get('showMessages');
    }),

    showErrorMessages: computed('dirty', 'valid', 'showErrorState', 'showMessages', function() {
       	return this.get('dirty') && !this.get('valid') && this.get('showErrorState') && this.get('showMessages');
    }),

    showHelpMessage: computed('dirty', 'valid', 'showErrorState', function() {
        return (!this.get('dirty') || this.get('dirty') && !this.get('valid') && !this.get('showErrorState'));
    })

});
