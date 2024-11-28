import { registerPaymentMethod } from '@woocommerce/blocks-registry';

const config = wc.wcSettings.getSetting( 'ppcp-sepa_data' );

registerPaymentMethod( {
	name: config.id,
	label: <div dangerouslySetInnerHTML={ { __html: config.title } } />,
	content: <div>Content goes here</div>,
	edit: <div></div>,
	ariaLabel: config.title,
	canMakePayment: () => {
		return true;
	},
	supports: {
		features: config.supports,
	},
} );
