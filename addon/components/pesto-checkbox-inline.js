import layout from '../templates/components/pesto-checkbox-inline';
import PestoCheckbox from './pesto-checkbox';

/**
 * Inline version of the checkbox.
 */
export default PestoCheckbox.extend({

	layout,

	tagName: 'label',

	inline: true
});
