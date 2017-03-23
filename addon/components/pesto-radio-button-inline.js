import layout from '../templates/components/pesto-radio-button-inline';
import PestoRadioButton from './pesto-radio-button';

export default PestoRadioButton.extend({

	layout,

	tagName: 'label',

	radioClass: 'radio-inline'
});
