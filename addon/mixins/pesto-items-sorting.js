import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';

export default Mixin.create({

	/**
	 * Sort the radio buttons by default.
	 */
	sort: true,

	/**
	 * Returns a list of localized sort items based on the itemSortProperty or itemLabelProperty
	 * @returns {array}
	 */
	sortedItems: computed('i18n.locale', 'items', 'itemSortProperty', function () {
		if (!isNone(this.get('items')) && this.get('sort') && !isNone(this.get('itemSortProperty'))) {
			return this.get('items').sortBy(this.get('itemSortProperty'));
		} else if (!isNone(this.get('items')) && this.get('sort') && !isNone(this.get('itemLabelProperty'))) {
			return this.get('items').sortBy(this.get('itemLabelProperty'));
		}
		return this.get('items');
	}),

});
