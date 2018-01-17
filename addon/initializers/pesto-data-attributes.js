import TextField from '@ember/component/text-field';
import TextArea from '@ember/component/text-area';
import Checkbox from '@ember/component/checkbox';
import { isEmpty } from '@ember/utils';

export function initialize() {

	const DATA_ATTRIBUTE_PREFIX = 'data-';

	TextField.reopen({
		init() {
			this._super();
			const attributeBindings = [];
			Object.keys(this).forEach((key) => {
				if (key.substr(0, 5) === DATA_ATTRIBUTE_PREFIX) {
					attributeBindings.push(key);
				}
			});
			if (!isEmpty(attributeBindings)) {
				this.set('attributeBindings', this.get('attributeBindings').concat(attributeBindings));
            }
		}
	});

    Checkbox.reopen({
		init() {
			this._super();
			const attributeBindings = [];
			Object.keys(this).forEach((key) => {
				if (key.substr(0, 5) === DATA_ATTRIBUTE_PREFIX) {
					attributeBindings.push(key);
				}
			});
			if (!isEmpty(attributeBindings)) {
                this.set('attributeBindings', this.get('attributeBindings').concat(attributeBindings));
            }
		}
	});


	TextArea.reopen({
		init() {
			this._super();
			const attributeBindings = [];
			Object.keys(this).forEach((key) => {
				if (key.substr(0, 5) === DATA_ATTRIBUTE_PREFIX) {
					attributeBindings.push(key);
				}
			});
			if (!isEmpty(attributeBindings)) {
                this.set('attributeBindings', this.get('attributeBindings').concat(attributeBindings));
            }
		}
	});
}

export default {
  name: 'pesto-data-attributes',
  initialize
};
