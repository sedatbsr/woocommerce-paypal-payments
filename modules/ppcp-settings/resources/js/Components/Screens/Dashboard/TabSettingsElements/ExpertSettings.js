import { __ } from '@wordpress/i18n';
import SettingsBlock, {
	SETTINGS_BLOCK_STYLING_TYPE_PRIMARY,
	SETTINGS_BLOCK_STYLING_TYPE_SECONDARY,
	SETTINGS_BLOCK_TYPE_SELECT,
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
				} }
			>
				<SettingsBlock
					title={ __(
						'Disable specific credit cards',
						'woocommerce-paypal-payments'
					) }
					description={ __(
						'If left blank, PayPal and other buttons will present in the user’s detected language. Enter a language here to force all buttons to display in that language.',
						'woocommerce-paypal-payments'
					) }
					style={ SETTINGS_BLOCK_STYLING_TYPE_SECONDARY }
					actionProps={ {
						type: SETTINGS_BLOCK_TYPE_SELECT,
						options: creditCardExamples,
						value: settings.buttonLanguage,
						callback: updateFormValue,
						key: 'buttonLanguage',
					} }
				/>
			</SettingsBlock>
		</SettingsCard>
	);
};

const creditCardExamples = [
	{ value: '', label: __( 'Select', 'woocommerce-paypal-payments' ) },
	{
		value: 'mastercard',
		label: __( 'Mastercard', 'woocommerce-paypal-payments' ),
	},
	{ value: 'visa', label: __( 'Visa', 'woocommerce-paypal-payments' ) },
	{
		value: 'amex',
		label: __( 'American Express', 'woocommerce-paypal-payments' ),
	},
	{ value: 'jcb', label: __( 'JCB', 'woocommerce-paypal-payments' ) },
	{
		value: 'diners-club',
		label: __( 'Diners Club', 'woocommerce-paypal-payments' ),
	},
];

export default ExpertSettings;
