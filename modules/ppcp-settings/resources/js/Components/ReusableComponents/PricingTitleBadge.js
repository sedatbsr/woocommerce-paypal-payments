import { __, sprintf } from '@wordpress/i18n';
import { countryPriceInfo } from '../../utils/countryPriceInfo';
import TitleBadge, { TITLE_BADGE_INFO } from './TitleBadge';
import { CommonHooks } from '../../data';

const PricingTitleBadge = ( { item, country, currency } ) => {
	const infos = countryPriceInfo[ country ];

	if ( ! infos || ! infos[ item ] ) {
		return null;
	}

	const percentage = infos[ item ].toFixed( 2 );
	const fixedFee = `${ infos.currencySymbol }${ infos.fixedFee }`;

	const label = sprintf(
		__(
			'from %1$s%% + %2$s %2$s<sup>1</sup>',
			'woocommerce-paypal-payments'
		),
		percentage,
		fixedFee,
		currency
	);

	return <TitleBadge type={ TITLE_BADGE_INFO } text={ label } />;
};

export default PricingTitleBadge;
