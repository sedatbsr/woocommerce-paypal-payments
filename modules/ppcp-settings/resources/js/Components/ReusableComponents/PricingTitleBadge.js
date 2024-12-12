import { __, sprintf } from '@wordpress/i18n';

import { CommonHooks } from '../../data';
import { countryPriceInfo } from '../../utils/countryPriceInfo';
import { formatPrice } from '../../utils/formatPrice';
import TitleBadge, { TITLE_BADGE_INFO } from './TitleBadge';

const getFixedAmount = ( currency, priceList ) => {
	if ( priceList[ currency ] ) {
		return formatPrice( priceList[ currency ], currency );
	}

	const [ defaultCurrency, defaultPrice ] = Object.entries( priceList )[ 0 ];

	return formatPrice( defaultPrice, defaultCurrency );
};

const PricingTitleBadge = ( { item } ) => {
	const { storeCountry } = CommonHooks.useWooSettings();
	const infos = countryPriceInfo[ storeCountry ];

	if ( ! infos || ! infos[ item ] ) {
		return null;
	}

	const percentage = infos[ item ].toFixed( 2 );
	const fixedAmount = getFixedAmount( storeCountry, infos.fixedFee );

	const label = sprintf(
		__( 'from %1$s%% + %2$s', 'woocommerce-paypal-payments' ),
		percentage,
		fixedAmount
	);

	return (
		<TitleBadge
			type={ TITLE_BADGE_INFO }
			text={ `${ label }<sup>1</sup>` }
		/>
	);
};

export default PricingTitleBadge;
