import Ember from 'ember';
import layout from '../templates/components/pesto-form-messages';

const { computed } = Ember;

export default Ember.Component.extend({

  	layout,

  	showGlobalOnly: false,

  	pestoMessages: Ember.inject.service(),

  	init() {
		this._super(...arguments);
  		this.get('pestoMessages').on('newMessage', this, () => {
  			this.set('messages', this.get('pestoMessages').getMessages(this.get('showGlobalOnly')));
  		});
  	}
});
