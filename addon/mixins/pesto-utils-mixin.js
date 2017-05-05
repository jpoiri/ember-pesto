import Ember from 'ember';

export default Ember.Mixin.create({

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
				if (!Ember.isNone(fields)) {
					Ember.$(fields).each(function() {
						// reset parsley field.
						Ember.$(this).parsley().reset();
						if (Ember.$(this).is('form')) {
							Ember.$('form .form-control-feedback').remove();
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
				if (!Ember.isNone(fields)) {
					Ember.$(fields).each(function() {
						// remove parsley on field.
						Ember.$(this).parsley().destroy();
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
				if (!Ember.isNone(fields)) {
					let valid = true;
					// loop through every field who has parsley attach.
					Ember.$(fields).each(function() {
						if (Ember.$(this).is('form')) {
							if (!Ember.$(this).parsley().isValid({
									group: opts.group,
									force: opts.force
								}) && valid) {
								valid = false;
							}
						} else {
							if (!Ember.$(this).parsley().isValid({
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
				if (!Ember.isNone(fields)) {
					let valid = true;
					Ember.$(fields).each(function() {
						if (Ember.$(this).parsley().validate({
								group: opts.group,
								force: opts.force
							}) !== true) {
							if (valid) {
								Ember.$(this).focus();
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
