import Ember from 'ember';

export function initialize() {

	const DATA_ATTRIBUTE_PREFIX = 'data-';

	Ember.TextField.reopen({
		init() {
			this._super();
			Object.keys(this).forEach((key) => {
				if (key.substr(0, 5) === DATA_ATTRIBUTE_PREFIX) {
					this.get('attributeBindings').push(key);
				}
			});
		}
	});

    Ember.Checkbox.reopen({
		init() {
			this._super();
			Object.keys(this).forEach((key) => {
				if (key.substr(0, 5) === DATA_ATTRIBUTE_PREFIX) {
					this.get('attributeBindings').push(key);
				}
			});
		}
	});


	Ember.TextArea.reopen({
		init() {
			this._super();
			Object.keys(this).forEach((key) => {
				if (key.substr(0, 5) === DATA_ATTRIBUTE_PREFIX) {
					this.get('attributeBindings').push(key);
				}
			});
		}
	});
}

export default {
  name: 'pesto-data-attributes',
  initialize
};
