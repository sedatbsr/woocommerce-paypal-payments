import SettingsBlock, {
	SETTINGS_BLOCK_STYLING_TYPE_PRIMARY,
	SETTINGS_BLOCK_STYLING_TYPE_SECONDARY,
	SETTINGS_BLOCK_TYPE_EMPTY,
	SETTINGS_BLOCK_TYPE_TOGGLE,
} from '../../../../ReusableComponents/SettingsBlock';
import { __ } from '@wordpress/i18n';

const SavePaymentMethods = ( { updateFormValue, settings } ) => {
	return (
		<SettingsBlock
			className="ppcp-r-settings-block--save-payment-methods"
			title={ __(
				'Save Payment Methods',
				'woocommerce-paypal-payments'
			) }
			description={ __(
				'Securely store customers payment methods for <a target="_blank" href="#">future payments[LINK]</a> and <a target="_blank" href="#">subscriptions[LINK]</a>, simplifying checkout and enabling recurring transactions.',
				'woocommerce-paypal-payments'
			) }
			type={ SETTINGS_BLOCK_STYLING_TYPE_PRIMARY }
			style={ SETTINGS_BLOCK_STYLING_TYPE_PRIMARY }
			actionProps={ {
				type: SETTINGS_BLOCK_TYPE_EMPTY,
			} }
		>
			<SettingsBlock
				title={ __(
					'Save PayPal and Venmo',
					'woocommerce-paypal-payments'
				) }
				description={ __(
					'Securely store your customers’ PayPal accounts for a seamless checkout experience. <br />This will disable all Pay Later features and Alternative Payment Methods on your site.',
					'woocommerce-paypal-payments'
				) }
				style={ SETTINGS_BLOCK_STYLING_TYPE_SECONDARY }
				value={ settings.savePaypalAndVenmo }
				actionProps={ {
					type: SETTINGS_BLOCK_TYPE_TOGGLE,
					value: settings.savePaypalAndVenmo,
					callback: updateFormValue,
					key: 'savePaypalAndVenmo',
				} }
			/>
			<SettingsBlock
				title={ __(
					'Save Credit and Debit Cards',
					'woocommerce-paypal-payments'
				) }
				description={ __(
					"Securely store your customer's credit card.",
					'woocommerce-paypal-payments'
				) }
				style={ SETTINGS_BLOCK_STYLING_TYPE_SECONDARY }
				actionProps={ {
					type: { SETTINGS_BLOCK_TYPE_TOGGLE },
					callback: updateFormValue,
					key: 'saveCreditCardAndDebitCard',
					value: settings.saveCreditCardAndDebitCard,
				} }
			/>
		</SettingsBlock>
	);
};
export default SavePaymentMethods;
