import Ember from 'ember';

export default Ember.Mixin.create({

	/**
	 * Sort the radio buttons by default.
	 */
	sort: true,

	/**
	 * Returns a list of localized sort items based on the itemSortProperty or itemLabelProperty
	 * @returns {array}
	 */
	sortedItems: Ember.computed('i18n.locale', 'items', 'itemSortProperty', function () {
		if (!Ember.isNone(this.get('items')) && this.get('sort') && !Ember.isNone(this.get('itemSortProperty'))) {
			return this.get('items').sortBy(this.get('itemSortProperty'));
		} else if (!Ember.isNone(this.get('items')) && this.get('sort') && !Ember.isNone(this.get('itemLabelProperty'))) {
			return this.get('items').sortBy(this.get('itemLabelProperty'));
		}
		return this.get('items');
	}),

});
