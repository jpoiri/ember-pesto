import Service from '@ember/service';
import EmberObject from '@ember/object';
import Evented from '@ember/object/evented';
import { isEmpty } from '@ember/utils';
import { debug } from '@ember/debug';
import { A } from '@ember/array';

const GLOBAL_MESSAGE_KEY = 'Global';

/**
* This service is responsible to store messages.
*/
export default Service.extend(Evented, {

	messageMap: EmberObject.create(),

	addMessage(messageKey, message, severity) {
		debug('add message => ' + messageKey + ':' + message + ':' + severity);
		if (isEmpty(messageKey)) {
			messageKey = GLOBAL_MESSAGE_KEY;
		}
		let messages = this.get('messageMap').get(messageKey);
        if (isEmpty(messages)) {
			messages = A();
        }
        let messageObj = EmberObject.create();
        messageObj.set('severity', severity);
        messageObj.set('message', message);
        messages.pushObject(messageObj);
        this.get('messageMap').set(messageKey, messages);
        this.trigger('newMessage');
	},


	getMessages(globalOnly) {
		debug('get messages => globalOnly:' + globalOnly);
		if (globalOnly) {
			return this.get('messageMap').get(GLOBAL_MESSAGE_KEY);
		}
		let messages = A();
		const messageMap = this.get('messageMap')
		for (let messageKey in messageMap) {
           if (messageMap.hasOwnProperty(messageKey)) {
				messages.pushObjects(messageMap.get(messageKey));
           }
        }
        return messages;
	},

	clearMessages() {
		this.set('messageMap', EmberObject.create());
	}
});
