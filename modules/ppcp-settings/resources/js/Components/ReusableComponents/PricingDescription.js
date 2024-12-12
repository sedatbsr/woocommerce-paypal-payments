import { __, sprintf } from '@wordpress/i18n';

import { countryPriceInfo } from '../../utils/countryPriceInfo';

const PricingDescription = ( { country } ) => {
	if ( ! countryPriceInfo[ country ] ) {
		return null;
	}

	const label = sprintf(
		// translators: %s: Link to PayPal REST application guide
		__(
			'<sup>1</sup>Prices based on domestic transactions as of October 25th, 2024. <a target="_blank" href="%s">Click here</a> for full pricing details.',
			'woocommerce-paypal-payments'
		),
		'https://woocommerce.com/document/woocommerce-paypal-payments/#manual-credential-input'
	);

	return (
		<p
			className="ppcp-r-optional-payment-methods__description"
			dangerouslySetInnerHTML={ { __html: label } }
		/>
	);
};

export default PricingDescription;
