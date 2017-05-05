import Ember from 'ember';
import layout from '../templates/components/pesto-checkbox-group';
import ItemSortingMixin from '../mixins/pesto-items-sorting-mixin';
import GroupInputMixin from '../mixins/pesto-group-input-mixin';
import PestoUIMixin from '../mixins/pesto-ui-mixin';

export default Ember.Component.extend(GroupInputMixin, ItemSortingMixin, PestoUIMixin, {

	/**
	 * Component layout.
	 */
	layout
});