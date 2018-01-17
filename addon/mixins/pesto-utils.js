import Mixin from '@ember/object/mixin';
import { isNone } from '@ember/utils';
import $ from 'jquery';


export default Mixin.create({

	/**
	 * Returns the parsley context based on fields passed.
	 * @param fields
	 * @returns {*}
	 */
	getParsleyContext(fields) {
		return {
			/**
			 * Reset the parsley form or fields.
			 * @param fields The list of fields to reset.
			 */
			reset() {
				if (!isNone(fields)) {
					$(fields).each(function() {
						// reset parsley field.
						$(this).parsley().reset();
						if ($(this).is('form')) {
							$('form .form-control-feedback').remove();
						}
					});
				}
			},
			/**
			 * Destroy the parsley form or fields.
			 * @param fields
			 */
			destroy() {
				// destroy all parsley fields.
				if (!isNone(fields)) {
					$(fields).each(function() {
						// remove parsley on field.
						$(this).parsley().destroy();
					});
				}
			},
			/**
			 * Returns true if the form or fields is valid.
			 * @param fields The fields.
			 * @param opts The options.
			 * @returns {boolean}
			 */
			isValid(opts = {
				force: false
			}) {
				// only validate if validate it set to true.
				if (!isNone(fields)) {
					let valid = true;
					// loop through every field who has parsley attach.
					$(fields).each(function() {
						if ($(this).is('form')) {
							if (!$(this).parsley().isValid({
									group: opts.group,
									force: opts.force
								}) && valid) {
								valid = false;
							}
						} else {
							if (!$(this).parsley().isValid({
									force: opts.force
								}) && valid) {
								valid = false;
							}
						}
					});
					return valid;
				}
				return true;
			},
			validate(opts = {
				force: false
			}) {
				if (!isNone(fields)) {
					let valid = true;
					$(fields).each(function() {
						if ($(this).parsley().validate({
								group: opts.group,
								force: opts.force
							}) !== true) {
							if (valid) {
								$(this).focus();
							}
							valid = false;
						}
					});
					return valid;
				}
				return true;
			}
		};
	},


});
