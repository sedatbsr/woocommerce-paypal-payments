import { useState } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { STORE_NAME } from '../../../../../../data/common';
import { ButtonSettingsBlock } from '../../../../../ReusableComponents/SettingsBlocks';
import { __ } from '@wordpress/i18n';

const TroubleshootingResubscribeBlock = () => {
	const [ resubscribingState, setResubscribingState ] = useState( {
		resubscribing: false,
		message: '',
	} );

	const { resubscribeWebhooks } = useDispatch( STORE_NAME );

	const startResubscribingWebhooks = async () => {
		setResubscribingState( ( prevState ) => ( {
			...prevState,
			resubscribing: true,
		} ) );
		try {
			await resubscribeWebhooks();
		} catch ( error ) {
			setResubscribingState( ( prevState ) => ( {
				...prevState,
				resubscribing: false,
				message: __(
					'Operation failed. Check WooCommerce logs for more details.',
					'woocommerce-paypal-payments'
				),
			} ) );
			return;
		}
		setResubscribingState( ( prevState ) => ( {
			...prevState,
			resubscribing: false,
			message: __(
				'Webhooks were successfully re-subscribed.',
				'woocommerce-paypal-payments'
			),
		} ) );
	};

	return (
		<ButtonSettingsBlock
			title={ __(
				'Resubscribe webhooks',
				'woocommerce-paypal-payments'
			) }
			description={ __(
				'Click to remove the current webhook subscription and subscribe again, for example, if the website domain or URL structure changed.',
				'woocommerce-paypal-payments'
			) }
			actionProps={ {
				buttonType: 'secondary',
				isBusy: resubscribingState.resubscribing,
				message: resubscribingState.message,
				callback: () => startResubscribingWebhooks(),
				value: __(
					'Resubscribe webhooks',
					'woocommerce-paypal-payments'
				),
			} }
		/>
	);
};

export default TroubleshootingResubscribeBlock;
