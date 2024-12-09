import { __, sprintf } from '@wordpress/i18n';

export const pricesBasedDescription = sprintf(
	// translators: %s: Link to PayPal REST application guide
	__(
		'<sup>1</sup>Prices based on domestic transactions as of October 25th, 2024. <a target="_blank" href="%s">Click here</a> for full pricing details.',
		'woocommerce-paypal-payments'
	),
	'https://woocommerce.com/document/woocommerce-paypal-payments/#manual-credential-input '
);
