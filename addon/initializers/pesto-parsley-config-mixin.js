export function initialize() {

	// Set parsley global configuration.
	/**
	 * This is the Parsley function that returns the DOM element that will be the anchor to attach `window.Parsley.options.errorsWrapper`
	 * @param  {Parsley} el The element that triggers the error
	 * @return {jQuery Element}  The node where the error content will be attached to
	 */
	window.Parsley.options.errorsContainer = function(el) {
		return el.$element.closest('.form-group');
	};

	window.Parsley.options.errorsWrapper = '<div class="help-block"></div>';
	window.Parsley.options.errorTemplate = '<span></span>';
}

export default {
	name: 'pesto-parsley-config',
	initialize
};
