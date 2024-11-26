import { __, sprintf } from '@wordpress/i18n';
import AcdcFlow from './AcdcFlow';
import BcdcFlow from './BcdcFlow';
import { Button } from '@wordpress/components';

const WelcomeDocs = ( {
	useAcdc,
	isFastlane,
	isPayLater,
	storeCountry,
	storeCurrency,
} ) => {
	const pricesBasedDescription = sprintf(
		// translators: %s: Link to PayPal REST application guide
		__(
			'<sup>1</sup>Prices based on domestic transactions as of October 25th, 2024. <a target="_blank" href="%s">Click here</a> for full pricing details.',
			'woocommerce-paypal-payments'
		),
		'https://woocommerce.com/document/woocommerce-paypal-payments/#manual-credential-input '
	);

	const countryPriceInfo = {
		us: {
			currencySymbol: '$',
			fixedFee: 0.49,
			checkout: 3.49,
			ccf: 2.59,
			dw: 2.59,
			apm: 2.59,
			fastlane: 2.59,
			standardCardFields: 2.99,
		},
		uk: {
			currencySymbol: '£',
			fixedFee: 0.3,
			checkout: 2.9,
			ccf: 1.2,
			dw: 1.2,
			apm: 1.2,
			standardCardFields: 1.2,
		},
		ca: {
			currencySymbol: '$',
			fixedFee: 0.3,
			checkout: 2.9,
			ccf: 2.7,
			dw: 2.7,
			apm: 2.9,
			standardCardFields: 2.9,
		},
		au: {
			currencySymbol: '$',
			fixedFee: 0.3,
			checkout: 2.6,
			ccf: 1.75,
			dw: 1.75,
			apm: 2.6,
			standardCardFields: 2.6,
		},
		fr: {
			currencySymbol: '€',
			fixedFee: 0.35,
			checkout: 2.9,
			ccf: 1.2,
			dw: 1.2,
			apm: 1.2,
			standardCardFields: 1.2,
		},
		it: {
			currencySymbol: '€',
			fixedFee: 0.35,
			checkout: 3.4,
			ccf: 1.2,
			dw: 1.2,
			apm: 1.2,
			standardCardFields: 1.2,
		},
		de: {
			currencySymbol: '€',
			fixedFee: 0.39,
			checkout: 2.99,
			ccf: 2.99,
			dw: 2.99,
			apm: 2.99,
			standardCardFields: 2.99,
		},
		es: {
			currencySymbol: '€',
			fixedFee: 0.35,
			checkout: 2.9,
			ccf: 1.2,
			dw: 1.2,
			apm: 1.2,
			standardCardFields: 1.2,
		},
	};

	return (
		<div className="ppcp-r-welcome-docs">
			<h2 className="ppcp-r-welcome-docs__title">
				{ __(
					`Want to know more about PayPal Payments?`,
					'woocommerce-paypal-payments'
				) }
			</h2>
			{ useAcdc ? (
				<AcdcFlow
					isFastlane={ isFastlane }
					isPayLater={ isPayLater }
					storeCountry={ storeCountry }
					storeCurrency={ storeCurrency }
					countryPriceInfo={ countryPriceInfo }
				/>
			) : (
				<BcdcFlow
					isPayLater={ isPayLater }
					storeCountry={ storeCountry }
					storeCurrency={ storeCurrency }
					countryPriceInfo={ countryPriceInfo }
				/>
			) }
			<p
				className="ppcp-r-optional-payment-methods__description"
				dangerouslySetInnerHTML={ { __html: pricesBasedDescription } }
			></p>
		</div>
	);
};

export default WelcomeDocs;
