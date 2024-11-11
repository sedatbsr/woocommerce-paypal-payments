import { __ } from '@wordpress/i18n';
import SettingsBlock, {
	SETTINGS_BLOCK_STYLING_TYPE_PRIMARY,
	SETTINGS_BLOCK_STYLING_TYPE_SECONDARY,
	SETTINGS_BLOCK_STYLING_TYPE_TERTIARY,
	SETTINGS_BLOCK_TYPE_EMPTY,
	SETTINGS_BLOCK_TYPE_TOGGLE,
	SETTINGS_BLOCK_TYPE_TOGGLE_CONTENT,
} from '../../../../ReusableComponents/SettingsBlock';
import TitleBadge, {
	TITLE_BADGE_POSITIVE,
} from '../../../../ReusableComponents/TitleBadge';
import ConnectionInfo, {
	connectionStatusDataDefault,
} from '../../../../ReusableComponents/ConnectionInfo';
import { Button } from '@wordpress/components';

const Sandbox = ( { settings, updateFormValue } ) => {
	return (
		<SettingsBlock
			title={ __( 'Sandbox', 'woocommerce-paypal-payments' ) }
			description={ __(
				"Test your site in PayPal's Sandbox environment.<br /><strong>Note</strong>: No real payments/money movement occur in Sandbox mode. Do not ship orders made in this mode.",
				'woocommerce-paypal-payments'
			) }
			style={ SETTINGS_BLOCK_STYLING_TYPE_PRIMARY }
			actionProps={ {
				type: SETTINGS_BLOCK_TYPE_TOGGLE_CONTENT,
				callback: updateFormValue,
				key: 'payNowExperience',
				value: settings.payNowExperience,
			} }
		>
			<SettingsBlock
				title={ __(
					'Sandbox account credentials',
					'woocommerce-paypal-payments'
				) }
				description={ __(
					'Your account is connected to sandbox, no real charging takes place. To accept live payments, turn off sandbox mode and connect your live PayPal account.',
					'woocommerce-paypal-payments'
				) }
				tag={
					<TitleBadge
						type={ TITLE_BADGE_POSITIVE }
						text={ __(
							'Connected',
							'woocommerce-paypal-payments'
						) }
					/>
				}
				style={ SETTINGS_BLOCK_STYLING_TYPE_SECONDARY }
				actionProps={ {
					type: SETTINGS_BLOCK_TYPE_EMPTY,
					callback: updateFormValue,
					key: 'sandboxAccountCredentials',
					value: settings.sandboxAccountCredentials,
				} }
			>
				<div className="ppcp-r-settings-block__sandbox">
					<SettingsBlock
						title={ __(
							'Enable sandbox mode',
							'woocommerce-paypal-payments'
						) }
						style={ SETTINGS_BLOCK_STYLING_TYPE_TERTIARY }
						actionProps={ {
							type: SETTINGS_BLOCK_TYPE_TOGGLE,
							callback: updateFormValue,
							key: 'enableSandbox',
							value: settings.enableSandbox,
						} }
					/>
					<ConnectionInfo
						connectionStatusDataDefault={
							connectionStatusDataDefault
						}
					/>
					<Button variant="secondary">
						{ __(
							'Disconnect Sandbox',
							'woocommerce-paypal-payments'
						) }
					</Button>
				</div>
			</SettingsBlock>
		</SettingsBlock>
	);
};
export default Sandbox;
