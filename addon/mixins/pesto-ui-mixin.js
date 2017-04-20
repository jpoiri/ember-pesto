import Ember from 'ember';

export default Ember.Mixin.create({

	classNameBindings: [
    	'hasFeedbackClass:has-feedback',
    	'hasErrorClass:has-error',
    	'hasSuccessClass:has-success'
    ],

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

    formControlFeedbackClass: computed('dirty', 'valid', 'hasErrorIcon', 'hasSuccessIcon', 'showSuccess', function() {
    	if (this.get('dirty') && this.get('valid') && this.get('hasSuccessIcon') && this.get('showSuccess')) {
    		return this.get('successIconClass');
    	} else if (this.get('dirty') && !this.get('valid') && this.get('hasErrorIcon')) {
    		return this.get('errorIconClass');
    	}
    	return this.get('iconClass');
    }),

    showSuccessMessage: computed('dirty', 'valid', 'hasSuccessMessage', 'showSuccess', function() {
    	return this.get('dirty') && this.get('valid') && this.get('hasSuccessMessage') && this.get('showSuccess')
    }),

    showHelpMessage: computed('dirty', 'valid', 'showSuccess', function() {
        return (!this.get('dirty') || this.get('dirty') && this.get('valid') && !this.get('showSuccess'))
    }),

    showErrorMessage: computed('dirty', 'valid', function() {
    	return this.get('dirty') && !this.get('valid');
    })

});
