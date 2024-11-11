import { __ } from '@wordpress/i18n';
import SettingsBlock, {
	SETTINGS_BLOCK_STYLING_TYPE_PRIMARY,
	SETTINGS_BLOCK_TYPE_TOGGLE_CONTENT,
} from '../../../ReusableComponents/SettingsBlock';
import SettingsCard from '../../../ReusableComponents/SettingsCard';
import Sandbox from './Blocks/Sandbox';
import Troubleshooting from './Blocks/Troubleshooting';
import PaypalSettings from './Blocks/PaypalSettings';

const ExpertSettings = ( { updateFormValue, settings } ) => {
	return (
		<SettingsCard
			icon="icon-settings-expert.svg"
			className="ppcp-r-settings-card ppcp-r-settings-card--expert-settings"
			title={ __( 'Expert Settings', 'woocommerce-paypal-payments' ) }
			description={ __(
				'Fine-tune your PayPal experience with advanced options.',
				'woocommerce-paypal-payments'
			) }
			actionProps={ {
				callback: updateFormValue,
				key: 'payNowExperience',
			} }
		>
			<Sandbox
				updateFormValue={ updateFormValue }
				settings={ settings }
			/>

			<Troubleshooting
				updateFormValue={ updateFormValue }
				settings={ settings }
			/>

			<PaypalSettings
				updateFormValue={ updateFormValue }
				settings={ settings }
			/>
			<SettingsBlock
				title={ __(
					'Other payment method settings',
					'woocommerce-paypal-payments'
				) }
				description={ __(
					'Modify the checkout experience for alternative payment methods, credit cards, and digital wallets',
					'woocommerce-paypal-payments'
				) }
				style={ SETTINGS_BLOCK_STYLING_TYPE_PRIMARY }
				actionProps={ {
					type: SETTINGS_BLOCK_TYPE_TOGGLE_CONTENT,
					callback: updateFormValue,
					key: 'payNowExperience',
					value: settings.payNowExperience,
				} }
			/>
		</SettingsCard>
	);
};

export default ExpertSettings;
