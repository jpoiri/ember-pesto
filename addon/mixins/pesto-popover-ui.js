import Ember from 'ember';

const { isEmpty } = Ember;
const POPOVER_SELECTOR = 'input, select, textarea';

/**
* This mixin encapsulate the logic for the message popover.
*/
export default Ember.Mixin.create({

 	/**
    * By default message are displayed as popover.
    */
    showMessagesAsPopover: false,

	/**
	* By default the popover is displayed on the bottom of the input.
	*
	* Supports the following values.
	* 	- top
	* 	- left
	*	- right
	*	- bottom
	*/
    popoverPlacement: 'bottom',

 	/**
    * Initialize popover.
    */
    initPopover() {
       if (this.get('showMessagesAsPopover')) {
           this.$(POPOVER_SELECTOR).popover({
                content: () => {
                    if (this.get('helpTextVisible')) {
                        return this.get('helpText');
                    } else if (this.get('successMessageVisible')) {
                       	return this.get('successMessage');
                    } else if (this.get('errorMessagesVisible')) {
						if (this.get('showOnlyFirstErrorMessage')) {
							return this.get('errorMessages').objectAt(0);
						} else {
							let messagesBuffer = '';
							this.get('errorMessages').forEach((message, i) => {
								if (i > 0) {
									messagesBuffer += '<br/>';
								}
								messagesBuffer += message;
							});
							return messagesBuffer;
						}
                    }
                },
                html: !this.get('showFirstErrorMessageOnly'),
                trigger: 'manual',
                animation: false,
                placement: this.get('popoverPlacement'),
           });
       }
    },

	/**
	* Returns true if pop over is visible on a change event (key down, key press, key up, change), otherwise returns false.
	*
	* The popover is visible when the following is true.
	* 	- showMessagesAsPopover is true
	*	- errorMessagesVisible or successMessageVisible.
	*
	* @returns {boolean}
	*/
	isPopoverVisibleOnChange() {
		return this.get('showMessagesAsPopover') && (this.get('errorMessagesVisible') || this.get('successMessageVisible'));
	},

	/**
    * Returns true if pop over is visible on a focus event, otherwise returns false.
    *
    * The popover is visible when showMessagesAsPopover is true and one the following is true.
    *	- errorMessagesVisible is true
    * 	- successMessageVisible is true
    * 	- helpTextVisible is true and the value is empty.
    *
    * @returns {boolean}
    */
	isPopoverVisibleOnFocus() {
		return this.get('showMessagesAsPopover') && (this.get('helpTextVisible') &&
		isEmpty(this.get('value'))) || this.get('errorMessagesVisible')|| this.get('successMessageVisible');
	},

	/**
	* Show popover
	*/
	showPopover() {
		this.$(POPOVER_SELECTOR).popover('show');
	},

	/**
	* Hide popover
	*/
	hidePopover() {
		this.$(POPOVER_SELECTOR).popover('hide');
	},

	/**
	* Update popover
	*/
	updatePopover() {
		if (this.isPopoverVisibleOnChange()) {
           this.showPopover();
        } else {
           this.hidePopover();
        }
	},

	/**
	* Handle the focus in event.
    */
    focusIn(evt) {
    		// display the popover if the help message, the error messages or success message needs to be displayed.
    	if (this.isPopoverVisibleOnFocus()) {
            this.showPopover();
    	}
    	this._super(evt);
    },

	/**
	* Handle the focus out event.
	*/
   	focusOut(evt) {
    	this.hidePopover();
    	this._super(evt);
   	},

	/**
	* Handle the change event.
	*/
	change(evt) {
        this.updatePopover();
        this._super(evt);
	},

    /**
    * Handle the key up event.
    */
    keyUp(evt) {
    	this.updatePopover();
    	this._super(evt);
    },

	/**
    * Handle the key down event.
    */
    keyDown(evt) {
		this.updatePopover();
		this._super(evt);
    },

	/**
    * Handle the key press event.
    */
    keyPress(evt) {
		this.updatePopover();
		this._super(evt);
    },

    /**
    *	didInsertElement hook
    */
    didInsertElement() {
        this.initPopover();
        this._super();
    }

});
