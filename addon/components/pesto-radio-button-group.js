import Ember from 'ember';
import layout from '../templates/components/pesto-radio-button-group';
import ItemSortingMixin from '../mixins/pesto-item-sorting-mixin';
import GroupInputMixin from '../mixins/pesto-group-mixin';

/**
 * This component represents a radio button group
 */
export default Ember.Component.extend(GroupInputMixin, ItemSortingMixin, {

	/**
	 * Component layout.
	 */
	layout
});
