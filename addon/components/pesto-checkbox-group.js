import Ember from 'ember';
import layout from '../templates/components/pesto-checkbox-group';
import ItemSortingMixin from '../mixins/pesto-item-sorting-mixin';
import GroupInputMixin from '../mixins/pesto-group-input-mixin';

export default Ember.Component.extend(GroupInputMixin, ItemSortingMixin, {

	/**
	 * Component layout.
	 */
	layout
});