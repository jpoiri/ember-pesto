import Component from '@ember/component';
import { inject } from '@ember/service';
import layout from '../templates/components/pesto-form-messages';

export default Component.extend({

	layout,

	showGlobalOnly: false,

	pestoMessages: inject(),

	init() {
		this._super(...arguments);
		this.get('pestoMessages').on('newMessage', this, () => {
			this.set('messages', this.get('pestoMessages').getMessages(this.get('showGlobalOnly')));
		});
	}
});
