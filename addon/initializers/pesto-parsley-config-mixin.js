export function initialize() {

	// Set parsley global configuration.
	window.Parsley.options.errorClass = 'has-error has-feedback';
	window.Parsley.options.classHandler = function(el) {
		return el.$element.closest('.form-group');
	};
	/**
	 * This is the Parsley function that returns the DOM element that will be the anchor to attach `window.Parsley.options.errorsWrapper`
	 * @param  {Parsley} el The element that triggers the error
	 * @return {jQuery Element}  The node where the error content will be attached to
	 */
	window.Parsley.options.errorsContainer = function(el) {
		// Go up two levels to make sure that the error message uses the entire row and not only the space allocated to the field.
		if (el.$element.attr('type') === 'checkbox' || el.$element.attr('type') === 'radio') {
			return el.$element.closest('.form-group');
		}
		const isFormHorizontal = el.$element.closest('form.form-horizontal').length !== 0;
		const isFormInline = el.$element.closest('form.form-inline').length !== 0;
		if (isFormHorizontal || isFormInline) {
			return el.$element.parent();
		}
		// else it is a basic form
		return el.$element.closest('.form-group');

	};
	window.Parsley.options.errorsWrapper = '<div class="mx-error-msg" aria-live="polite" role="alert"></div>';
	window.Parsley.options.errorTemplate = '<span></span>';

	window.Parsley.on('field:success', function(el) {
		el.$element.parent().find('.parsley-feedback').remove();
	});
}

export default {
	name: 'pesto-parsley-config',
	initialize
};
