import Ember from 'ember';
import layout from '../templates/components/pesto-checkbox-group';
import ItemSortingMixin from '../mixins/pesto-items-sorting';
import GroupInputMixin from '../mixins/pesto-group-input';
import PestoUIMixin from '../mixins/pesto-ui';

export default Ember.Component.extend(GroupInputMixin, ItemSortingMixin, PestoUIMixin, {

	/**
	 * Component layout.
	 */
	layout
});