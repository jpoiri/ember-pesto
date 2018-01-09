import Ember from 'ember';

const { isEmpty } = Ember;
const GLOBAL_MESSAGE_KEY = 'Global';

/**
* This service is responsible to store messages.
*/
export default Ember.Service.extend(Ember.Evented, {

	messageMap: Ember.Object.create(),

	/**
	* Add a message to the queue
	* @param messageKey The message key.
	* @param message The message.
	* @param severity The severity.
	*/
	addMessage(messageKey, message, severity) {
		Ember.debug('add message => ' + messageKey + ':' + message + ':' + severity);
		if (isEmpty(messageKey)) {
			messageKey = GLOBAL_MESSAGE_KEY;
		}
		let messages = this.get('messageMap').get(messageKey);
        if (isEmpty(messages)) {
        	messages = Ember.A();
        }
        let messageObj = Ember.Object.create();
        messageObj.set('severity', severity);
        messageObj.set('message', message);
        messages.pushObject(messageObj);
        this.get('messageMap').set(messageKey, messages);
        this.trigger('newMessage');
	},

	/**
	* Returns the messages.
	* @param globalObly Returns only global messages.
	*/
	getMessages(globalOnly) {
		Ember.debug('get messages => globalOnly:' + globalOnly);
		if (globalOnly) {
			return this.get('messageMap').get(messageKey);
		}
		let messages = Ember.A();
		const messageMap = this.get('messageMap')
		for (let messageKey in messageMap) {
           if (messageMap.hasOwnProperty(messageKey)) {
           		messages.pushObjects(messageMap.get(messageKey));
           }
        }
        return messages;
	},

	/**
	* Clean message.
	*/
	clearMessages() {
		this.set('messageMap', Ember.Object.create());
	}
});
