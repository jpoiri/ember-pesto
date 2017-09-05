import Ember from 'ember';

const { computed, observer, isEmpty } = Ember;

/**
* This mixin is responsible to handle the validation ui.
*/
export default Ember.Mixin.create({

    /**
    * By default show the error state.
    */
    showErrorState: true,

    /**
    * By default hide the success state.
    */
    showSuccessState: false,

    /**
    * By default show the label.
    */
    showLabel: true,

    /**
    * By default show the messages.
    */
    showMessages: true,

    /**
    * By default show only the first error message.
    */

    classNameBindings: [
        'hasFeedbackClass:has-feedback',
        'hasErrorClass:has-error',
        'hasSuccessClass:has-success'
    ],

    /**
    * Returns true if the has-feedback class is rendered.
    *
    * The has-feedback class is rendered when one of the following is true:
    *   - The field is dirty
    *   - There is an iconClass
    *
    * @returns {boolean}
    */
    hasFeedbackClass: computed('hasIcon', 'dirty', function() {
    	return (this.get('hasIcon') || this.get('dirty'));
    }),
  
    /**
    * Returns true if the has-error class is rendered.
    *
    * The has-error class is rendered when the following is true:
    *   - The field is dirty
    *   - The field is invalid
    *   - The error state is displayed.
    *
    * @returns {boolean}
    */
    hasErrorClass: computed('dirty', 'valid', 'showErrorState', function() {
    	return (this.get('dirty') && !this.get('valid') && this.get('showErrorState'));
    }),

    /**
    * Returns true if the has-success class is rendered.
    *
    * The has-success class is rendered when the following is true:
    *   - The field is dirty
    *   - The field is valid
    *   - The success state is displayed.
    *
    * @returns {boolean}
    */
    hasSuccessClass: computed('dirty', 'valid', 'showSuccessState', function() {
        return (this.get('dirty') && this.get('valid') && this.get('showSuccessState'));
    }),

    /**
    * Returns true if there is an iconClass, otherwise returns false.
    * @returns {boolean}
    */
    hasIcon: computed.notEmpty('iconClass'),

    /**
    * Returns true if there is an successIconClass, otherwise returns false.
    * @returns {boolean}
    */
    hasSuccessIcon: computed.notEmpty('successIconClass'),
    
    /**
    * Returns true if there is an errorIconClass, otherwise returns false.
    * @returns {boolean}
    */
    hasErrorIcon: computed.notEmpty('errorIconClass'),
    
    /**
    * Returns the form control feedback class.
    *
    * Returns the successIconClass when the following is true:
    *   - The field is dirty.
    *   - The field is valid.
    *   - The success state is displayed.
    *   - There is a successIcon class.
    *
    * Returns the errorIconClass when the following is true:
    *   - The field is dirty.
    *   - The field is invalid.
    *   - The error state is displayed.
    *   - There is a errorIcon class.
    *
    * Otherwise 
    *    returns the iconClass
    *
    * @returns {string}
    */
    formControlFeedbackClass: computed('dirty', 'valid', 'hasErrorIcon',
    	'hasSuccessIcon', 'showSuccessState', 'showErrorState', function() {
    	if (this.get('dirty') && this.get('valid') && this.get('hasSuccessIcon') && this.get('showSuccessState')) {
    		return this.get('successIconClass');
    	} else if (this.get('dirty') && !this.get('valid') && this.get('hasErrorIcon') && this.get('showErrorState')) {
    		return this.get('errorIconClass');
    	}
    	return this.get('iconClass');
    }),

    /**
    * Returns true if the success message is displayed, otherwise returns false.
    * 
    * The success message is displayed when all of the following is true
    *   - field is dirty.
    *   - field is valid.
    *   - The success state is displayed.
    *   - The messages are displayed.
    *
    * @returns {boolean}
    */
    successMessageVisible: computed('dirty', 'valid', 'showSuccessState', 'showMessages', function() {
    	return this.get('dirty') && this.get('valid') && this.get('showSuccessState') && this.get('showMessages');
    }),

    /**
    * Returns true if the error messages is displayed, otherwise returns false.
    * 
    * The error messages is displayed when all of the following is true
    *   - field is dirty.
    *   - field is invalid.
    *   - The error state is displayed.
    *   - The messages are displayed.
    *
    * @returns {boolean}
    */
    errorMessagesVisible: computed('dirty', 'valid', 'showErrorState', 'showMessages', function() {
       	return this.get('dirty') && !this.get('valid') && this.get('showErrorState') && this.get('showMessages');
    }),

    /**
    * Returns true if the help message is displayed, otherwise returns false.
    *
    * The help message is display when one of the following is true:
    *   - field is pristine.
    *   - field is dirty and invalid but the errorState is not displayed.
    *
    * @returns {boolean}
    */
    helpMessageVisible: computed('dirty', 'valid', 'showErrorState', function() {
        return (!this.get('dirty') || this.get('dirty') && !this.get('valid') && !this.get('showErrorState'));
    })
});
