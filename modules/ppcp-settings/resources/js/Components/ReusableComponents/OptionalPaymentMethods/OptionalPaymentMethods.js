import AcdcOptionalPaymentMethods from './AcdcOptionalPaymentMethods';
import BcdcOptionalPaymentMethods from './BcdcOptionalPaymentMethods';

const OptionalPaymentMethods = ( {
	useAcdc,
	isFastlane,
	isPayLater,
	storeCountry,
	storeCurrency,
	countryPriceInfo,
} ) => {
	return (
		<div className="ppcp-r-optional-payment-methods">
			{ useAcdc ? (
				<AcdcOptionalPaymentMethods
					isFastlane={ isFastlane }
					isPayLater={ isPayLater }
					storeCountry={ storeCountry }
					storeCurrency={ storeCurrency }
					countryPriceInfo={ countryPriceInfo }
				/>
			) : (
				<BcdcOptionalPaymentMethods
					isPayLater={ isPayLater }
					storeCountry={ storeCountry }
					storeCurrency={ storeCurrency }
					countryPriceInfo={ countryPriceInfo }
				/>
			) }
		</div>
	);
};

export default OptionalPaymentMethods;
