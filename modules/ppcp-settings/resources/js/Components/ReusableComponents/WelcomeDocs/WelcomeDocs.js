import { __ } from '@wordpress/i18n';
import AcdcFlow from './AcdcFlow';
import BcdcFlow from './BcdcFlow';
import { countryPriceInfo } from '../../../utils/countryPriceInfo';
import { pricesBasedDescription } from './pricesBasedDescription';

const WelcomeDocs = ( {
	useAcdc,
	isFastlane,
	isPayLater,
	storeCountry,
	storeCurrency,
} ) => {
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
				/>
			) : (
				<BcdcFlow
					isPayLater={ isPayLater }
					storeCountry={ storeCountry }
					storeCurrency={ storeCurrency }
				/>
			) }
			{ storeCountry in countryPriceInfo && (
				<p
					className="ppcp-r-optional-payment-methods__description"
					dangerouslySetInnerHTML={ {
						__html: pricesBasedDescription,
					} }
				></p>
			) }
		</div>
	);
};

export default WelcomeDocs;
